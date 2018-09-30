import React from 'react';
import { AuthStack } from './src/config/tabs';

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  render() {
    return (
      <AuthStack />
    );
  }
}