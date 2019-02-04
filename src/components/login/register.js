import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  Button,
  Text
} from "react-native";
import fire from "../../config/config";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  handleSubmit() {
    if (this.state.displayName != "")
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(registerError => {
          let errorMessage = "";
          switch (registerError.code) {
            case "auth/invalid-email":
              errorMessage = "Ogiltig email";
              break;
            case "auth/wrong-password":
              errorMessage = "Fel lösenord";
              break;
            default:
              errorMessage = "Something went wrong";
              break;
          }
          this.setState({ errorMessage });
        })
        .then(user => {
          if (user)
            fire
              .auth()
              .currentUser.updateProfile({
                displayName: this.state.displayName
              })
              .then(() =>
                fire
                  .auth()
                  .signInWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                  )
              );
        });
    else {
      this.setState({ errorMessage: "Användarnamn saknas" });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            ref="name"
            underlineColorAndroid="#2DC874"
            style={styles.loginInput}
            placeholder="Skärmnamn"
            onChangeText={displayName => this.setState({ displayName })}
          />
          <View style={styles.hr} />
          <TextInput
            underlineColorAndroid="#2DC874"
            style={styles.loginInput}
            placeholder="Email"
            ref="email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            ref="password"
            secureTextEntry={true}
            underlineColorAndroid="#2DC874"
            style={styles.loginInput}
            placeholder="Lösenord"
            onChangeText={password => this.setState({ password })}
          />

          <Text>{this.state.errorMessage}</Text>
          <Button
            onPress={this.handleSubmit.bind(this)}
            style={styles.loginButton}
            title="Skapa konto"
            color="#2DC874"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  header: {
    width: "100%",
    backgroundColor: "#2DC874",
    height: 60,
    flexDirection: "row",
    alignItems: "center"
  },
  hr: {
    width: "200%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 20
  },
  h1: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    color: "white",
    flex: 1
  },
  ScrollView: {
    width: "100%"
  },
  inputView: {
    paddingTop: 20,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto"
  },
  loginInput: {
    width: "100%",
    borderBottomColor: "#E74C3C",
    fontSize: 20,
    padding: 5,
    marginBottom: 5
  },
  backButton: {
    height: 34,
    width: 34,
    marginLeft: 13,
    marginRight: 13
  },
  loginButton: {
    backgroundColor: "#2DC874",
    padding: 10,
    width: "50%",
    marginTop: 30,
    borderBottomColor: "#27AE60",
    borderBottomWidth: 5,
    alignSelf: "center"
  },
  loginText: {
    fontWeight: "bold",
    color: "black",
    width: "100%",
    textAlign: "center"
  }
});
