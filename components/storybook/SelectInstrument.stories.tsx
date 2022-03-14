import SelectInsttrument from '../SelectInstrument';
import { Meta } from '@storybook/react';
import { INSTRUMENTS_NAME_LIST } from '../../types/api';
import { Instrument } from '../../types';
import { useState } from 'react';

export default {
  title: 'Form/SelectInstrument',
  component: SelectInsttrument,
} as Meta;

export const InstrumentSelect = () => {
  const instrumentsList: Instrument[] = INSTRUMENTS_NAME_LIST.map(
    (item, index) => {
      return { id: `instrument-${index}`, name: item };
    },
  );

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument[]>(
    instrumentsList.slice(0, 2),
  );

  return (
    <div className="w-full flex justify-around">
      <div className="w-1/3">
        <SelectInsttrument
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          instruments={instrumentsList}
        />
      </div>
      <p className="w-20">{JSON.stringify(selectedInstrument)}</p>
    </div>
  );
};

export const Loading = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument[]>(
    [],
  );

  return (
    <div className="w-full">
      <div className="w-1/3">
        <SelectInsttrument
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          instruments={undefined}
        />
      </div>
    </div>
  );
};
