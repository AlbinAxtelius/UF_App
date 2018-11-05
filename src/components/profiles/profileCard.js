import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'

export default class ProfileCard extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.Card} onPress={this.props.handleSelect}>
        <View style={{ height: Dimensions.get('window').width * .5 }}></View>
        <View style={styles.CardText}>
          <Text>{this.props.userData.profileName}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    maxWidth: "50%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray"
  },
  CardText: {
    borderTopWidth: 1,
    borderColor: "gray",
    padding: 5,
    height: 48,
  }
});