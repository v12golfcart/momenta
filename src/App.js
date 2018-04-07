// libraries
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { StyleSheet, View, StatusBar } from 'react-native';

// redux
import reducers from './redux_reducers';

// components
import Router from './Router';
import ModalConductor from './ModalConductor';

// other
import { colors } from './themes';
import { FirebaseConfig } from '../env';

/* Components ==================================================================== */
type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    firebase.initializeApp(FirebaseConfig);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <Router />
          <ModalConductor />
        </View>
      </Provider>
    );
  }
}

/* Stylesheet ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});
