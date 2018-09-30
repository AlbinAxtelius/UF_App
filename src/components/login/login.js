import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight } from 'react-native';
import { Redirect, Link } from 'react-router-native';
import fire from '../../config/config';

var image = require('../../images/logo.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false
    }
  }

  handleLogin() {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() =>
      this.setState({
        redirect: true
      })
    ).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={image} style={{ height: 100, width: 100, position: "absolute", top: 150 }} ></Image>
        <TextInput
          underlineColorAndroid="#2DC874"
          placeholder="Email"
          style={styles.loginInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType="email-address">
        </TextInput>
        <TextInput
          underlineColorAndroid="#2DC874"
          placeholder="Lösenord"
          style={styles.loginInput}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}>
        </TextInput>
        <TouchableHighlight onPress={this.handleLogin.bind(this)} style={styles.loginButton}>
          <Text style={styles.loginText}>Logga in</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.registerText}>Registrera</Text>
        </TouchableHighlight>
        {this.state.redirect ? <Redirect to="/Home" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: "#2DC874",
    padding: 10,
    width: "50%",
    marginTop: 30,
    borderBottomColor: "#27AE60",
    borderBottomWidth: 5,
  },
  loginText: {
    fontWeight: 'bold',
    color: "white",
    width: "100%",
    textAlign: 'center',
  },
  registerText: {
    color: "#7F8C8D",
  },
  loginInput: {
    marginLeft: 10,
    width: "100%",
    borderBottomColor: "#E74C3C",
    fontSize: 20,
    padding: 5,
    marginBottom: 5,
  }
});