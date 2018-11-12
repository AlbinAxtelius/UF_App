import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import fire from '../../config/config';

export default class ManageGroup extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();

    this.state = {
      groupInfo: {},
      members: []
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: params.title
    }
  }

  componentWillMount = async () => {
    await AsyncStorage.getItem('groupId', (e, groupId) => {
      this.db
        .collection('Groups')
        .doc(groupId)
        .get()
        .then(doc => {
          const data = doc.data();
          let members = []
          data.Members.forEach(m => {
            members.push({
              id: m.userId,
              displayName: m.displayName
            })
          })
          this.setState({
            members: members
          })
          this.props.navigation.setParams({
            title: data.groupName
          })
        })
    })
  }

  render() {
    let renderUsers = this.state.members.map(m => {
      return <Text key={m.id}>{m.displayName}</Text>
    })
    return (
      <View style={styles.groupView}>
        <View style={styles.members}>
          <Text>Users:</Text>
          {renderUsers}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  members: {
    width: "90%",
  }
})