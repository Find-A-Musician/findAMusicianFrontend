export const INSTRUMENTS_NAME_LIST = ['drums', 'guitar', 'piano'] as const;

export type INSTRUMENT_NAME = typeof INSTRUMENTS_NAME_LIST[number];

export type Instruments = {
  id: string;
  name: INSTRUMENT_NAME;
}[];

export type Instrument = {
  id: string;
  name: string;
};

export const GENRE_NAME_LIST = [
  'Metal',
  'Rock',
  'Jazz',
  'Electro',
  'Pop',
  'Reggae',
] as const;

export type GENRE_NAME = typeof GENRE_NAME_LIST[number];

export type Genres = {
  id: string;
  name: GENRE_NAME;
}[];

export type Genre = {
  id: string;
  name: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type Profil = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  phone?: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  promotion: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  location: 'Douai' | 'Lille';
  instruments: Instruments;
  genres: Genres;
};
