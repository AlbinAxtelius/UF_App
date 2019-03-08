import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableNativeFeedback,
  StatusBar
} from "react-native";
import fire from "../../config/config";
import globalstyles from "../../styles/globalstyle";
import { Ionicons } from "@expo/vector-icons";
import { TextField } from "react-native-material-textfield";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false,
      error: ""
    };
  }

  handleSubmit = () => {
    fire
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => this.setState({ sent: true }))
      .catch(error => this.setState({ error: error.message }));
  };

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
          <Text style={globalstyles.greenHeaderText}>Glömt lösenord</Text>
        </View>
        {this.state.sent ? (
          <Text>
            Instruktioner skickade till{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.email}</Text> för
            att återställa lösenord
          </Text>
        ) : (
          <React.Fragment>
            <View style={{ width: "80%" }}>
              <TextField
                tintColor="#156352"
                label="E-postadress"
                error={this.state.error}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <Button
              title="Glömt lösenord"
              color="#156352"
              onPress={() => this.handleSubmit()}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
}

export default ForgotPassword;
