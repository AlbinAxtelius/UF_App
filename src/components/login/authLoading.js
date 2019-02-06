import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet , Image} from 'react-native'
import fire from '../../../src/config/config';

export default class AuthLoading extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#156352" />
        <Text style={styles.loadingText}>Starting</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  loadingText: {
    marginTop: 5,
  }
})