export const INSTRUMENTS_NAME_LIST = ['drums', 'guitar', 'piano'] as const;

export type INSTRUMENT_NAME = typeof INSTRUMENTS_NAME_LIST[number];

export const GENRE_NAME_LIST = [
  'Metal',
  'Rock',
  'Jazz',
  'Electro',
  'Pop',
  'Reggae',
] as const;

export type GENRE_NAME = typeof GENRE_NAME_LIST[number];

export type Token = {
  accessToken: string;
  refreshToken: string;
};
