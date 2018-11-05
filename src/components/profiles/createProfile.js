import React, { Component } from 'react'
import { Text, View, CheckBox, TextInput, StyleSheet,Button } from 'react-native'
import fire from '../../config/config';

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProfile: {},
      name: "",
      admin: false,
      pin: ""

    }
  }

  createProfile() {
    fire.database().ref().child(`/Profiles/${fire.auth().currentUser.uid}`).push(this.state);
    this.props.navigation.navigate("Profiles");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.profileName}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder="Profil namn">
        </TextInput>
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
        <Button onPress={this.createProfile.bind(this)} title="Create profile" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white"
  },
  adminView: {
    width: "95%",
  },
  profileName: {
    width: "95%",
    marginTop: 16,
    fontSize: 40,
    padding: 5,
  }
})