import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Header extends Component {
  render() {
    return (
        <Text style={styles.h1}>{this.props.title}</Text>
    )
  }
}

const styles = StyleSheet.create({
  h1: {
    width: "100%",
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: "#2DC874",
    color: 'white',
    padding: 10,
  },
})