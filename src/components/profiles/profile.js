import React, { Component } from 'react'
import { View, FlatList, StyleSheet, TouchableHighlight, Button, Text, StatusBar } from 'react-native'
import fire from '../../config/config'

export default class Profile extends Component {
  constructor() {
    super();

    this.db = fire.firestore();

    this.state = {
      userName: ""
    }
  }

  componentWillMount = () => {
    this.db
      .collection('Users')
      .doc(fire.auth().currentUser.uid)
      .get()
      .then(data => {
        this.setState({
          userName: data.data().displayName
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ paddingLeft: 20, color: "white", fontWeight: "bold", fontSize: 24, flex: 1 }}>Profil</Text>
        </View>
        <Text>{this.state.userName}</Text>
        <Button title="Logga ut" color="red" onPress={() => fire.auth().signOut()}/>
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