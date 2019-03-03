import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import fire from "../../config/config";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false
    };
  }

  handleSubmit = () => {
    fire
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => this.setState({ sent: true }));
  };

  render() {
    return (
      <View>
        <Text>Glömt lösenord</Text>
        {this.state.sent ? (
          <Text>
            Instruktioner skickade till{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.email}</Text> för
            att återställa lösenord
          </Text>
        ) : (
          <View>
            <TextInput onChangeText={email => this.setState({ email })} />
            <Button
              title="Glömt lösenord"
              onPress={() => this.handleSubmit()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default ForgotPassword;
