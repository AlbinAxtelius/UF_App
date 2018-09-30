import React, { Component } from 'react'
import { Text, View, CheckBox, TextInput, StyleSheet } from 'react-native'

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.userData.uid,
      newProfile: {},
      name: "",
      admin: false,
      pin: ""

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile name</Text>
        <TextInput
          style={styles.loginInput}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder="Profil namn">
        </TextInput>
        <Text>Admin</Text>
        <View style={styles.adminView}>
          <CheckBox value={this.state.admin} onValueChange={admin => this.setState({ admin })}></CheckBox>
          {this.state.admin &&
            <TextInput
              keyboardType="numeric"
              placeholder="Admin pin"
              value={this.state.pin}
              onChangeText={pin => this.setState({ pin })}>
            </TextInput>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  adminView: {
    width: "100%",
    flexDirection: 'row',
  },
  loginInput: {
    marginLeft: 10,
    width: "100%",
    borderBottomColor: "#E74C3C",
    fontSize: 20,
    padding: 5,
    marginBottom: 5,
  }
})