import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Redux imports
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
import { initialiseApplication } from './src/redux/actions/application.actions'

// Components imports
import VersionTag from './src/components/other/VersionTag'

// Redux declarations
const store = configureStore();
store.dispatch(initialiseApplication())

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <VersionTag />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
