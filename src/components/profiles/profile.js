import React, { Component } from 'react'
import { View, StyleSheet, Button, Text, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import fire from '../../config/config'
import globalstyles from '../../styles/globalstyle'

export default class Profile extends Component {
  constructor() {
    super();

    this.db = fire.firestore();

    this.state = {
      userName: ""
    }
  }

  render() {
    return (
      <View style={globalstyles.container}>
        <View style={globalstyles.header}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Ionicons name="md-menu" size={26} style={globalstyles.openMenu} />
          </TouchableNativeFeedback>
          <Text style={globalstyles.headerText}>Profil</Text>
        </View>
        <Text style={{fontSize: 16, margin: 20}}>{fire.auth().currentUser.displayName}</Text>
        <Button title="Logga ut" color="red" onPress={() => {
          fire.auth().signOut();
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  displayname: {
    fontSize: 16,
    margin: 20
  }

})
