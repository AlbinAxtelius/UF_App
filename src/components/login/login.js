import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Dimensions} from 'react-native';
import fire from '../../config/config';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginError: "",
      signingIn: false
    }
  }

  handleLogin() {
    this.setState({ signingIn: true })
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(loginError => {
        let errorMessage = "";

        switch (loginError.code) {
          case "auth/invalid-email":
            errorMessage = "Ogiltig email";
            break;
          case "auth/wrong-password":
            errorMessage = "Fel lösenord";
            break;
          default:
            errorMessage = "Something went wrong"
            break;
        }

        this.setState({ loginError: errorMessage, signingIn: false });
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Sysselsatt</Text>
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
        {!this.state.signingIn && <Button onPress={this.handleLogin.bind(this)} title="Logga in" style={styles.loginButton} color="#2DC874" />}
        <Text style={{ color: "#E74C3C" }}>{this.state.loginError}</Text>
        <TouchableHighlight style={{ marginTop: "auto", marginBottom: 48 }} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.registerText}>Registrera</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48,
    fontWeight: "bold",
    width: "100%",
    textAlign: 'center',
    marginBottom: 50
  },
  loginButton: {
    backgroundColor: "#2DC874",
    width: 100,
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
    width: "90%",
    fontSize: 24,
    padding: 5,
    marginBottom: 5,
  }
});