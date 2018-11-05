import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const CustomCheck = (props) => {
  return (
    <React.Fragment>
      {props.checked ?
        <TouchableOpacity onPress={props.handlePress} style={styles.checkViewChecked}>
          <Ionicons name="md-checkmark" size={24} color="white" />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={props.handlePress} style={styles.checkView}>
          <Ionicons name="md-checkmark" size={24} />
        </TouchableOpacity>}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  checkView: {
    borderWidth: .8,
    borderColor: "gray",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkViewChecked: {
    height: 40,
    backgroundColor: "#27AE60",
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CustomCheck;