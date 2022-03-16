export const customTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ef4444',
    primary: '#ef4444',
  },
});

export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected && 'white',
  }),
};
