import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import Swipeable from 'react-native-swipeable'
import CustomCheck from './customCheck'
import Ionicons from '@expo/vector-icons/Ionicons';

export default TaskItem = (props) => {
  let leftContent = props.completed ?
    <View style={styles.checkView}><Ionicons name="md-close" size={40} color="white" style={styles.checkImage} /></View> :
    <View style={styles.checkView}><Ionicons name="md-checkmark" size={40} color="white" style={styles.checkImage} /></View>


  return (
    <Swipeable
      onLeftActionRelease={props.handleSwipe}
      leftContent={leftContent} >
      <View style={styles.taskContainer}>
        <CustomCheck checked={props.checked} handlePress={props.handleSwipe} />
        <View stlye={styles.taskTextView}>
          <Text style={styles.taskText}>{props.title}</Text>
          <Text style={styles.repText}>{ props.repText ? `Repetera: ${props.repText}` : "Repetera inte"}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    borderBottomWidth: .8,
    borderBottomColor: "#BDC3C7",
    width: "100%",
    height: 80,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  taskText: {
    marginLeft: 20,
    fontSize: 20,
    flex: 1
  },
  checkView: {
    backgroundColor: '#2ECC71',
    height: 80,
    width: "100%",
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: "absolute"
  },
  checkImage: {
    marginRight: 20,
  },
  taskTextView: {
    flex: 1
  },
  repText: {
    marginLeft: 20,
    fontSize: 10,
    color: "#7F8C8D"
  }
})


