import React from 'react'
import { StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import Store from './src/Store/configureStore'
import Navigation from './src/Navigation/Navigation'

const App = () => {
  let persistor = persistStore(Store)

  return (
    <Provider store= {Store}>
      <StatusBar barStyle="dark-content" />
      <PersistGate persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
  );
};

export default App;
