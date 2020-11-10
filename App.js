import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {createStackNavigator} from '@react-navigation/stack';
// import {Provider} from 'react-redux';
// import {store, persistor} from './src/redux/store';
// import {PersistGate} from 'redux-persist/integration/react';

// Import Screens
import Login from './src/screens/Login';
import Logo from './src/assets/blanja.png';

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      <>
        <Login />
      </>
      //   </PersistGate>
      // </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
});
