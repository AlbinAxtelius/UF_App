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
      email: ""
    }
  }

  handleAccept = async () => {
    fetch(`https://us-central1-f-app-273d0.cloudfunctions.net/addUser?user=${this.state.email}&group=${this.props.groupId}&groupname=${this.props.groupName}`)
    .then(res => {
      console.log(res);
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
          <Text>
            {this.props.groupId} {this.props.groupName}
          </Text>
            <TextInput
              underlineColorAndroid="#27AE60"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              style={styles.taskTitle} />
            <View style={{ alignSelf: 'flex-start', marginLeft: "2.5%" }}>
              <Text>{this.state.errorMsg}</Text>
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