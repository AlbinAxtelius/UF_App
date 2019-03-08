import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  Button,
  Text,
  TouchableNativeFeedback
} from "react-native";
import fire from "../../config/config";
import { TextField } from "react-native-material-textfield";
import { Ionicons } from "@expo/vector-icons";
import globalstyles from "../../styles/globalstyle";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      errorMessage: "",
      loading: false
    };
  }

  handleSubmit() {
    if (this.state.displayName != "") {
      this.setState({ loading: true });
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(registerError => {
          let errorMessage = "";
          switch (registerError.code) {
            case "auth/invalid-email":
              errorMessage = { emailError: "Ogiltig email" };
              break;
            case "auth/wrong-password":
              errorMessage = { passwordError: "Fel lösenord" };
              break;
            default:
              errorMessage = { nameError: "Something went wrong" };
              break;
          }
          this.setState({
            passwordError: "",
            emailError: "",
            nameError: "",
            ...errorMessage,
            loading: false
          });
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
    } else {
      this.setState({
        loading: false,
        passwordError: "",
        emailError: "",
        nameError: "Användarnamn saknas"
      });
    }
  }

  render() {
    return (
      <View style={globalstyles.container}>
          <View style={globalstyles.popupHeader}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.goBack()}
              background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            >
              <View style={globalstyles.popupBack}>
                <Ionicons name="md-arrow-back" color="#156352" size={24} />
              </View>
            </TouchableNativeFeedback>
            <Text style={globalstyles.greenHeaderText}>Registrera</Text>
        </View>
        <View style={styles.inputView}>
          <TextField
            tintColor="#156352"
            label="Skärmnamn"
            error={this.state.nameError}
            onChangeText={displayName => this.setState({ displayName })}
          />
          <TextField
            tintColor="#156352"
            label="Email"
            keyboardType="email-address"
            error={this.state.emailError}
            onChangeText={email => this.setState({ email })}
          />
          <TextField
            secureTextEntry={true}
            tintColor="#156352"
            error={this.state.passwordError}
            label="Lösenord"
            onChangeText={password => this.setState({ password })}
          />

          <Text>{this.state.errorMessage}</Text>
        </View>
        {!this.state.loading && (
          <Button
            onPress={this.handleSubmit.bind(this)}
            // style={styles.loginButton}
            title="Skapa konto"
            color="#156352"
          />
        )}
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
    width: "80%",
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
