import React, { Component } from 'react'
import { Text, View, StyleSheet, CheckBox, Image } from 'react-native'
import Swipeable from 'react-native-swipeable'
import CustomCheck from './customCheck'

var checkIcon = require('../../images/icons/baseline_done_white_48.png');

export default TaskItem = (props) => {
  return (
    <Swipeable onLeftActionRelease={props.handleSwipe} leftContent={leftContent} >
      <View style={styles.taskContainer}>
        <CustomCheck checked={true} handlePress={props.handleSwipe} />
        <Text style={styles.taskText}>{props.taskData.taskName}</Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#95A5A6",
    width: "100%",
    height: 80,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  taskText: {
    fontSize: 20,
    marginLeft: 10,
    flex: 1
  },
  checkView: {
    backgroundColor: '#2ECC71',
    height: 80, 
    width: "100%",
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  checkImage: {
    height: 50,
    width: 50,
    marginRight: 20,
  }
})

const leftContent = <View style={styles.checkView}><Image style={styles.checkImage} source={checkIcon} ></Image></View>
