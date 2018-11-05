import React, { Component } from 'react'
import { Text, View, TouchableHighlight, TextInput, StyleSheet, Picker } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import fire from '../../../config/config';

export default class CreateTask extends Component {
  constructor(props) {
    super(props)

    this.firebase = fire.database().ref().child(`/Tasks/${fire.auth().currentUser.uid}`);

    this.state = {
      taskName: "",
      repMessage: null,
      repCode: null
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create task",
      headerRight: (
        <TouchableHighlight onPress={navigation.getParam('handleAccept')} style={{ marginRight: 24, }}>
          <Ionicons name="md-checkmark" size={24} color="black" />
        </TouchableHighlight>
      ),
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.goBack()} style={{ marginLeft: 24, }}>
          <Ionicons name="md-close" size={24} color="black" />
        </TouchableHighlight>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleAccept: this.handleAccept.bind(this) })
  }

  handleAccept() {
    this.firebase.child("/Active").push(this.state);
    this.props.navigation.navigate("Tasks");
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
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid="#27AE60"
          value={this.state.taskName}
          onChangeText={taskName => this.setState({ taskName })}
          placeholder="Task name"
          style={styles.taskTitle} />
        <View style={{ alignSelf: 'flex-start', marginLeft: "2.5%" }}>
          <Text style={{ color: "gray" }}>Repetera</Text>
          <Picker
            selectedValue={this.state.repeatable}
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