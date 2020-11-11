import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {createStackNavigator} from '@react-navigation/stack';
// import {Provider} from 'react-redux';
// import {store, persistor} from './src/redux/store';
// import {PersistGate} from 'redux-persist/integration/react';

// Import Screens
import Homepage from './src/screens/Home';
import Login from './src/screens/Login';
import Forgot from './src/screens/Forgot';
import SignUp from './src/screens/Signup';


export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Homepage />
      </SafeAreaProvider>
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
