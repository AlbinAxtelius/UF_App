import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import fire from "../../config/config";
import { TextField } from "react-native-material-textfield";

import logo from "../../../logo.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      signingIn: false
    };
  }

  handleLogin() {
    this.setState({ signingIn: true });
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(loginError => {
        let errorMessage;
        switch (loginError.code) {
          case "auth/invalid-email":
            errorMessage = { emailError: "Ogiltig email" };
            break;
          case "auth/wrong-password":
            errorMessage = { passwordError: "Fel lösenord" };
            break;
          default:
            errorMessage = { emailError: "Something went wrong" };
            break;
        }

        this.setState({
          passwordError: "",
          emailError: "",
          ...errorMessage,
          signingIn: false
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: "center", paddingTop: 100, backgroundColor: "#156352", width: "100%", elevation: 2}}>
          <Image
            source={logo}
            style={{ height: 150, width: 150 }}
          />
          <Text style={styles.titleText}>Sysselsatt</Text>
        </View>
        <View style={{ width: "80%" }}>
          <TextField
            label="E-postadress"
            value={this.state.email}
            tintColor="#156352"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            error={this.state.emailError}
          />
          <TextField
            label="Lösenord"
            value={this.state.password}
            secureTextEntry={true}
            tintColor="#156352"
            onChangeText={password => this.setState({ password })}
            error={this.state.passwordError}
          />
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("passwordReset")}
          >
            <Text style={styles.linkText}>Glömt lösenord?</Text>
          </TouchableHighlight>
        </View>

        {!this.state.signingIn && (
          <Button
            onPress={this.handleLogin.bind(this)}
            title="Logga in"
            style={styles.loginButton}
            color="#156352"
          />
        )}
        <TouchableHighlight
          style={{ marginTop: "auto", marginBottom: 48 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>Registrera</Text>
        </TouchableHighlight>
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
  titleText: {
    fontSize: 38,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 5,
    color: "#fff",
    
  },
  loginButton: {
    backgroundColor: "#156352",
    width: 300
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
    width: "100%",
    textAlign: "center"
  },
  linkText: {
    color: "#156352",
    textAlign: "left"
  },
  registerText: {
    fontSize: 40
  },
  loginInput: {
    marginLeft: 10,
    width: "90%",
    fontSize: 24,
    padding: 5,
    marginBottom: 5
  }
});
