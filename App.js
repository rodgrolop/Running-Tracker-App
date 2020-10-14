import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from './src/theme'

// Redux imports
import { Provider } from 'react-redux'
import configureStore from './src/redux/store'
import { initialiseApplication } from './src/redux/actions/application.actions'

// Components imports
import Navigation from './src/navigation'

// TODO check if it goes here or in navigation stack
enableScreens()

// Redux declarations
const store = configureStore()
store.dispatch(initialiseApplication())

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}