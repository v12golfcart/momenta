// libraries
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// redux
import reducers from './redux_reducers';

// components
import Router from './Router';
import ModalConductor from './ModalConductor';

// other
import { colors } from './themes';

/* Components ==================================================================== */
type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDWo66yzk1YQixYoz5F2VgN_YQhBXtWa3Q',
      authDomain: 'habitsapp-747d9.firebaseapp.com',
      databaseURL: 'https://habitsapp-747d9.firebaseio.com',
      projectId: 'habitsapp-747d9',
      storageBucket: 'habitsapp-747d9.appspot.com',
      messagingSenderId: '898707557542'      
    };
    firebase.initializeApp(config);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          <Router />
          <ModalConductor />
        </SafeAreaView>
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
