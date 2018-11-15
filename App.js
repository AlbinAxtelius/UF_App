import React from 'react';
import { AuthStack } from './src/config/tabs';
import { Provider } from 'react-redux';

import store from './store'

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  render() {
    return (
      <Provider store={store}>
        <AuthStack />
      </Provider>
    );
  }
}