import React, { useState } from 'react';
import GenreLabel from './genreLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Genres } from '../types/api';
import LoaderSpinner from './loaderSpinner';
import useOnClickOutside from '../hooks/useOnClickOutside';

export default function SelectGenre({
  selectedGenre,
  setSelectedGenre,
  genres,
}: {
  selectedGenre: Genres;
  setSelectedGenre: (arg: Genres) => void;
  genres: Genres | undefined;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div className=" w-full h-12 relative cursor-pointer" ref={ref}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        tabIndex={1}
        className="border-2 border-gray-300 focus:border-red-800 w-full h-full rounded-2xl relative flex items-center justify-start px-4 overflow-hidden"
      >
        {selectedGenre.map(({ id, name }) => (
          <GenreLabel key={id} genre={name} />
        ))}
        <FontAwesomeIcon
          className="absolute text-xl right-4 text-gray-500 "
          icon={faChevronDown}
        />
      </div>
      {isOpen && (
        <div className="shadow-complete w-full top-12 left-0 rounded-2xl flex flex-col justify-start items-center absolute overflow-hidden">
          {genres ? (
            genres.map(({ id, name }) => {
              const isSelected =
                selectedGenre.map(({ id }) => id).indexOf(id) !== -1;

              return (
                <span
                  key={id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedGenre(
                        selectedGenre.filter(
                          ({ id: filterID }) => filterID !== id,
                        ),
                      );
                    } else {
                      setSelectedGenre(selectedGenre.concat({ id, name }));
                    }
                  }}
                  className={`py-2 flex justify-center items-center w-full  ${
                    isSelected ? 'bg-red-200 ' : 'hover:bg-red-100'
                  }`}
                >
                  <GenreLabel genre={name} />
                </span>
              );
            })
          ) : (
            <span className="m-4">
              <LoaderSpinner size="sm" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
