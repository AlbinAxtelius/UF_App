import React, { Component } from 'react'
import { Text, View, Picker, StyleSheet, AsyncStorage } from 'react-native'
import fire from '../../config/config'

export default class GroupView extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();

    this.state = {
      groups: [],
      groupId: props.groupId
    }
  }

  componentDidMount = () => {
    this.getGroups();
    this.getGroupName();
  }

  getGroups = async () => {
    this.db
      .collection('Users')
      .doc(fire.auth().currentUser.uid)
      .get()
      .then(doc => {
        const data = doc.data();
        data.Groups.map(data => {
          let oldGroups = this.state.groups;
          oldGroups.push(data);

          this.setState({
            groups: oldGroups
          })
        })
      })
  }

  getGroupName = () => {
    this.db
      .collection('Groups')
      .doc(this.state.groupId)
      .get()
      .then(doc => {
        data = doc.data();
        this.setState({
          groupName: data.groupName
        })
      })
  };

  handleGroupChange = async (groupId) => {
    console.log(groupId)
    this.setState({
      groupId
    })
    await AsyncStorage.setItem('groupId', groupId)
      .then(() => this.props.checkGroupId)
  }

  render() {
    return (
      <View style={styles.groupPickerView}>
        <Picker
          style={styles.groupPicker}
          selectedValue={this.state.groupId}
          mode="dropdown"
          onValueChange={value => this.handleGroupChange(value)}>
          {renderGroups}
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  groupPickerView: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2C3E50",
  },
  groupPicker: {
    color: "white",
  }
}) 