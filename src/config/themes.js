export const themes = {
  theme1: {
    name: 'Warm Beige',
    key: 'theme1',
    bg: '#ddceb4',
    textColor: '#30210b',
    borderColor: '#30210b',
  },
  theme2: {
    name: 'Classic Retro Yellow',
    key: 'theme2',
    bg: '#fefcd0',
    textColor: 'black',
    borderColor: 'black',
  },
  theme3: {
    name: 'Clean White',
    key: 'theme3',
    bg: 'white',
    textColor: 'black',
    borderColor: 'black',
  },
  theme4: {
    name: 'Inverted Dark',
    key: 'theme4',
    bg: 'black',
    textColor: 'white',
    borderColor: 'white',
  },
  theme5: {
    name: 'Pure Contrast',
    key: 'theme5',
    bg: '#ffffff',
    textColor: '#000000',
    borderColor: '#000000',
  },
};

export const getTheme = (key) => {
  return themes[key] || themes.theme1;
};

export const getDefaultTheme = () => {
  const saved = localStorage.getItem('retroTheme');
  return saved && themes[saved] ? themes[saved] : themes.theme1;
};

