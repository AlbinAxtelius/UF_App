import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import { TextField } from "react-native-material-textfield";

import { Ionicons } from "@expo/vector-icons";
import fire from "../../config/config";
import globalstyles from "../../styles/globalstyle";

export class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      message: "",
      loading: false
    };
  }

  handleAccept = async () => {
    this.setState({ loading: true, message: "" });
    fetch(
      `https://us-central1-f-app-273d0.cloudfunctions.net/addUser?user=${
        this.state.email
      }&group=${this.props.groupId}&groupname=${this.props.groupName}`
    )
      .then(res => res.json())
      .then(result => {
        this.setState({ loading: false });
        if (result.message.message)
          this.setState({ message: result.message.message });
        else this.setState({ message: result.message });
        if (result.code === 200) this.props.handleClose();
      });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => this.props.handleClose()}
        visible={this.props.visible}
      >
        <View style={globalstyles.popupContainer}>
          <View style={globalstyles.popupHeader}>
            <TouchableNativeFeedback
              onPress={() => this.props.handleClose()}
              background={TouchableNativeFeedback.SelectableBackground()}
            >
              <View style={globalstyles.popupBack}>
                <Ionicons name="md-arrow-back" color="#156352" size={24} />
              </View>
            </TouchableNativeFeedback>
            <Text style={globalstyles.greenHeaderText}>Lägg till medlem</Text>
          </View>
          <View style={{ width: "80%" }}>
            <TextField
              label="E-postadress"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              tintColor="#156352"
            />
          </View>
          <View style={{ alignSelf: "flex-start", marginLeft: "2.5%" }}>
            <Text>{this.state.message}</Text>
          </View>
          {this.state.loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              onPress={() => this.handleAccept()}
              color="#156352"
              title="Lägg till"
            />
          )}
        </View>
      </Modal>
    );
  }
}

export default AddMember;
