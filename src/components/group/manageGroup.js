import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import fire from '../../config/config';

export default class ManageGroup extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();

    this.state = {
      groupInfo: {}
    };
  }

  componentWillMount = async () => {
    await AsyncStorage.getItem('groupId', (e, groupId) => {
      this.db
        .collection('Groups')
        .doc(groupId)
        .get()
        .then(data => {
          this.setState({ groupInfo: data.data() })
        })
    })
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
