import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native'
import fire from '../../config/config'
import Ionicons from '@expo/vector-icons/Ionicons'
import globalstyles from '../../styles/globalstyle';


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
        snap.forEach(doc => {
          console.log(doc.data())
          invites.push({
            groupName: doc.data().groupName,
            groupId: doc.data().groupId,
            inviteId: doc.id
          })
        })
        this.setState({ invites })
      })
  }

  acceptInvite = (groupId, inviteId, groupName, index) => {
    this.db
      .collection('Groups')
      .doc(groupId)
      .collection('Members')
      .add({
        displayName: fire.auth().currentUser.displayName,
        userId: fire.auth().currentUser.uid
      })
      .then(() => {
        this.db
          .collection('Users')
          .doc(fire.auth().currentUser.uid)
          .collection('Groups')
          .add({
            groupName: groupName,
            groupId: groupId
          })
      })
      .then(() => {
        this.db
          .collection('Users')
          .doc(fire.auth().currentUser.uid)
          .collection('Invites')
          .doc(inviteId)
          .delete()
          .then(() => {
            console.log("Invite accepted")
            let invites = this.state.invites;
            invites.splice(index, 1);
            this.setState({ invites });
          })
      })
  }

  declineInvite = (inviteId, index) => {
    this.db
      .collection('Users')
      .doc(fire.auth().currentUser.uid)
      .collection('Invites')
      .doc(inviteId)
      .delete()
      .then(() => {
        console.log("Invite declined")
        let invites = this.state.invites;
        invites.splice(index, 1);
        this.setState({ invites });
      })
  }

  render() {
    let renderInvites = this.state.invites.map((e, i) => (
      <View key={e.inviteId} style={styles.inviteView}>
        <View style={styles.inviteTextView}>
          <Text style={styles.inviteText}>{e.groupName}</Text>
        </View>
        <View style={styles.inviteButtonView}>
          <TouchableNativeFeedback
            onPress={() => this.acceptInvite(e.groupId, e.inviteId, e.groupName, i)}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View>
              <Ionicons name="md-checkmark" color="#156352" size={38} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => this.declineInvite(e.inviteId, i)}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View>
              <Ionicons name="md-close" color="#E74C3C" size={38} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    ))

    return (
      <View style={globalstyles.container}>
        <View style={globalstyles.header}>
          <Text style={globalstyles.headerText}>Inbjudningar</Text>
        </View>
        {renderInvites}
      </View>
    )
  }
}

export default Invites

const styles = StyleSheet.create({
  inviteView: {
    borderBottomWidth: .8,
    borderBottomColor: "#BDC3C7",
    width: "100%",
    height: 80,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inviteTextView: {
    flex: 3
  },
  inviteText: {
    fontSize: 20,
  },
  inviteButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})