import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import fire from "../../../config/config";
import globalstyles from "../../../styles/globalstyle";

import { connect } from "react-redux";
import { addTask } from "../../../actions/groupActions";
import { TextField } from "react-native-material-textfield";

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();

    this.state = {
      taskName: "",
      repMessage: null,
      repCode: null,
      visible: false,
      errorMsg: "",
      createDate: "",
      loading: false
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      visible: nextProps.visible
    });
  };

  handleAccept = async () => {
    this.setState({ loading: true });
    if (this.state.taskName === "") {
      this.setState({ errorMsg: "Måste ha ett namn", loading: false });
    } else {
      const task = {
        taskName: this.state.taskName,
        repCode: this.state.repCode,
        repMessage: this.state.repMessage,
        completed: false,
        createDate: Date.now()
      };

      this.db
        .collection("Groups")
        .doc(this.props.groupId)
        .collection("Tasks")
        .add(task)
        .then(() => {
          this.props.addTask(task);
          this.props.handleClose();
        });
    }
  };

  handleChange(repCode) {
    let repMessage;
    switch (repCode) {
      case 0:
        repMessage = null;
        break;
      case 1:
        repMessage = "Varje dag";
        break;
      case 2:
        repMessage = "Varje vecka";
        break;
      case 3:
        repMessage = "Varje månad";
        break;
    }
    this.setState({
      repCode: repCode,
      repMessage: repMessage
    });
  }

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
            <Text style={globalstyles.greenHeaderText}>Lägg till syssla</Text>
          </View>
          <View style={{ width: "80%" }}>
            <TextField
              tintColor="#156352"
              value={this.state.taskName}
              onChangeText={taskName => this.setState({ taskName })}
              label="Syssla"
              error={this.state.errorMsg}
            />
            <View>
              <Text style={{ color: "gray" }}>Repetera</Text>
              <Picker
                selectedValue={this.state.repCode}
                style={{ height: 50, width: 200 }}
                mode="dropdown"
                onValueChange={repCode => this.handleChange(repCode)}
              >
                <Picker.Item label="Aldrig" value={0} />
                <Picker.Item label="Varje dag" value={1} />
                <Picker.Item label="Varje vecka" value={2} />
                <Picker.Item label="Varje månad" value={3} />
              </Picker>
            </View>
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

export default connect(
  null,
  { addTask }
)(CreateTask);
