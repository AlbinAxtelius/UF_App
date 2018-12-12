import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import fire from '../../config/config'


export class Invites extends Component {
  constructor() {
    super();

    this.db = fire.firestore();

    this.state = {
      invites: []
    }
  }

  componentWillMount = () => {
    this.db
      .collection('Users')
      .doc(fire.auth().currentUser.uid)
      .collection('Invites')
      .get()
      .then(snap => {
        let invites = []
        console.log(snap.data());

        snap.docs.forEach(e => {
          invites.push({
            groupName: e.data().groupName,
            groupId: e.data().groupId
          })
        })
        this.setState({ invites })
      })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.Invites}
          renderItem={({ e }) => (
            <Text key={e.groupId}>{e.groupName}</Text>
          )}
        />
      </View>
    )
  }
}

export default Invites