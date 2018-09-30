import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, ScrollView, Image, Button } from 'react-native';
import { Link } from 'react-router-native';
import fire from '../../config/config';

const backIcon = require('../../images/icons/baseline_arrow_back_white_48.png');

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forname: "",
      surname: "",
      email: "",
      password: "",
    };
  }

  handleSubmit() {
    let accepted = false;

    if (this.refs.email.value === this.refs.emailCon.value)
      accepted = true
    if (this.refs.password.value === this.refs.emailCon.value)
      accepted = true

    if (accepted) {
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(() => {
          
        })
        .then(() =>
          fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password))
        .then(() =>
          fire.auth().currentUser.updateProfile({
            displayName: this.state.displayName
          })
        )
    } else {
      console.log("ee")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.inputView}>
            <TextInput
              underlineColorAndroid="#2DC874"
              style={styles.loginInput}
              placeholder="Email"
              ref="email"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}>
            </TextInput>
            <TextInput
              ref="emailCon"
              underlineColorAndroid="#2DC874"
              style={styles.loginInput}
              keyboardType="email-address"
              placeholder="Repetera Email">
            </TextInput>
            <TextInput
              ref="password"
              secureTextEntry={true}
              underlineColorAndroid="#2DC874"
              style={styles.loginInput}
              placeholder="Lösenord"
              onChangeText={password => this.setState({ password })}>
            </TextInput>
            <TextInput
              ref="passwordCon"
              secureTextEntry={true}
              underlineColorAndroid="#2DC874"
              style={styles.loginInput}
              placeholder="Repetera lösenord">
            </TextInput>
            <View style={styles.hr}></View>
            <TextInput
              ref="name"
              underlineColorAndroid="#2DC874"
              style={styles.loginInput}
              placeholder="Fullt namn"
              onChangeText={name => this.setState({ name })}>
            </TextInput>
            <Button onPress={this.handleSubmit.bind(this)} style={styles.loginButton} title="Skapa hushåll" color="#2DC874" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: StatusBar.currentHeight,
    borderTopColor: "#27AE60",
  },
  header: {
    width: "100%",
    backgroundColor: "#2DC874",
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hr: {
    width: "200%",
    alignSelf: 'center',
    height: 1,
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 20,
  },
  h1: {
    width: "100%",
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    flex: 1
  },
  ScrollView: {
    width: "100%",
  },
  inputView: {
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginInput: {
    width: "100%",
    borderBottomColor: "#E74C3C",
    fontSize: 20,
    padding: 5,
    marginBottom: 5,
  },
  backButton: {
    height: 34,
    width: 34,
    marginLeft: 13,
    marginRight: 13,
  },
  loginButton: {
    backgroundColor: "#2DC874",
    padding: 10,
    width: "50%",
    marginTop: 30,
    borderBottomColor: "#27AE60",
    borderBottomWidth: 5,
    alignSelf: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    color: "black",
    width: "100%",
    textAlign: 'center',
  },
});
