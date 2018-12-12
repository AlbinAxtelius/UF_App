import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet
} from 'react-native'
import fire from '../../config/config';

export class AddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      message: "",
      loading: false
    }
  }

  handleAccept = async () => {
    this.setState({ loading: true, message: "" })
    fetch(`https://us-central1-f-app-273d0.cloudfunctions.net/addUser?user=${this.state.email}&group=${this.props.groupId}&groupname=${this.props.groupName}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.message.message)
          this.setState({ message: result.message.message });
        else
          this.setState({ message: result.message });
        if (result.code === 200)
          this.props.handleClose();
      })
  }
  render() {
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => this.props.handleClose()}
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <TextInput
            underlineColorAndroid="#27AE60"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            style={styles.taskTitle} />
          <View style={{ alignSelf: 'flex-start', marginLeft: "2.5%" }}>
            <Text>{this.state.message}</Text>
          </View>
          <Button onPress={() => this.handleAccept()} title="Lägg till" />
        </View >
      </Modal>
    )
  }
}

export default AddMember

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