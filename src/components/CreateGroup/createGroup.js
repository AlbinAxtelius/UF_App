import React, { Component } from 'react'
import { Text, View, TextInput, Button, AsyncStorage } from 'react-native'
import fire from '../../config/config';

export class CreateGroup extends Component {
  constructor(props) {
    super(props)

    this.db = fire.firestore();

    this.state = {
      groupName: ""
    }
  }

  handleCreate = () => {
    if (this.state.groupName !== "")
      this.db
        .collection('Groups')
        .add({
          groupName: this.state.groupName
        })
        .then(doc => {
          this.db
            .collection('Groups')
            .doc(doc.id)
            .collection('Members')
            .add({
              displayName: fire.auth().currentUser.displayName,
              userId: fire.auth().currentUser.uid
            })
          this.db
            .collection('Users')
            .doc(fire.auth().currentUser.uid)
            .collection('Groups')
            .add({
              groupName: this.state.groupName,
              groupId: doc.id
            })
          AsyncStorage.setItem('groupId', doc.id)
            .then(() => {
              this.props.navigation.navigate('Tasks')
            })
        })
  }

  render() {
    return (
      <View>
        <Text>Skapa ny grupp</Text>
        <TextInput
          placeholder="Gruppnamn"
          value={this.state.groupName}
          onChangeText={groupName => this.setState({ groupName })} />
        <Button
          title="Skapa grupp"
          onPress={() => this.handleCreate()} />
      </View>
    )
  }
}

export default CreateGroup