import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { DrawerItems } from 'react-navigation'

import fire from '../../config/config'

export default class Drawer extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height: "20%", backgroundColor:"#2980B9"}}></View>
        <DrawerItems style={{width: 100}} {...this.props} />
        <Button onPress={() => fire.auth().signOut()} style={{marginBottom: 20,}} title="Log out" />
      </View>
    )
  }
}