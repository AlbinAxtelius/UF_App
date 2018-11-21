import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Picker,
  TouchableNativeFeedback
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import fire from '../../../config/config';

export default class CreateTask extends Component {
  constructor(props) {
    super(props)

    this.db = fire.firestore();

    this.state = {
      taskName: "",
      repMessage: null,
      repCode: null,
      visible: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      visible: nextProps.visible
    })
  }

  handleAccept = async () => {

    this.db
      .collection('Groups')
      .doc(this.props.groupId)
      .collection('Tasks')
      .add({
        taskName: this.state.taskName,
        repCode: this.state.repCode,
        repMessage: this.state.repMessage,
        completed: false
      })
      .then(() => {
        this.props.handleClose();
      })
  }

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
    })
  }

  render() {
    return (
      <Modal
        onRequestClose={() => this.props.handleClose()}
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <Button onPress={() => this.handleAccept()} title="close" />
          <TextInput
            underlineColorAndroid="#27AE60"
            value={this.state.taskName}
            onChangeText={taskName => this.setState({ taskName })}
            placeholder="Task name"
            style={styles.taskTitle} />
          <View style={{ alignSelf: 'flex-start', marginLeft: "2.5%" }}>
            <Text style={{ color: "gray" }}>Repetera</Text>
            <Picker
              selectedValue={this.state.repCode}
              style={{ height: 50, width: 200, }}
              mode="dropdown"
              onValueChange={(repCode) => this.handleChange(repCode)}>
              <Picker.Item label="Aldrig" value={0} />
              <Picker.Item label="Varje dag" value={1} />
              <Picker.Item label="Varje vecka" value={2} />
              <Picker.Item label="Varje månad" value={3} />
            </Picker>
          </View>
        </View >
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  taskTitle: {
    width: "95%",
    marginTop: 16,
    fontSize: 40,
    padding: 5,
  }
})