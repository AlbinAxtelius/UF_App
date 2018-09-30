import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const CustomCheck = (props) => {
  return (
    <TouchableOpacity onPress={props.handlePress} style={styles.checkView}>
      <Ionicons name="md-checkmark" size={24} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkView: {
    borderWidth: 1,
    borderColor: "gray",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CustomCheck;