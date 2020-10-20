import { DefaultTheme } from 'react-native-paper'

export default theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      surface: '#fff', 
      primary: '#63257F',
      accent: '#63257F',
      blurInput: '#ccc',
      selectionColor: '#63257F55',
    },
  };