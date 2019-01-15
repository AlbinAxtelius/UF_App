import React, { Component } from 'react'
import { Text, View, TextInput, Button, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ marginLeft: 20, color: "white", fontWeight: "bold", fontSize: 20, flex: 1 }}>Skapa ny grupp</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: "#156352",
    borderTopWidth: StatusBar.currentHeight,
  },
  addTaskView: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    padding: 20,
    backgroundColor: "#E74C3C",
    borderRadius: 30,
    elevation: 4,
  },
  addTaskText: {
    color: "white",
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 30
  },
  header: {
    backgroundColor: "#156352",
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    elevation: 20
  },
})

export default CreateGroup