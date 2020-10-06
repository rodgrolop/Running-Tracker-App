import { StatusBar } from 'expo-status-bar'
import React from 'react';
import { enableScreens } from 'react-native-screens'

// Redux imports
import { Provider } from 'react-redux'
import configureStore from './src/redux/store'
import { initialiseApplication } from './src/redux/actions/application.actions'

// Components imports
import Navigation from './src/navigation'

enableScreens()

// Redux declarations
const store = configureStore()
store.dispatch(initialiseApplication())

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Navigation />
    </Provider>
  );
}