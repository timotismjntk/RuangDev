import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

// Import Screens
import Root from './src/screens/Root';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <RootSiblingParent>
              <Root />
            </RootSiblingParent>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
