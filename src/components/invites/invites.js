import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native'
import fire from '../../config/config'
import Ionicons from '@expo/vector-icons/Ionicons';


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
          invites.push(doc.data())
        })
        this.setState({ invites })
      })
  }

  acceptInvite = () => {

  }

  declineInvite = () => {

  }

  render() {
    let renderInvites = this.state.invites.map((e,i) => (
      <View key={i} style={styles.inviteView}>
        <View style={styles.inviteTextView}>
          <Text style={styles.inviteText}>{e.groupName}</Text>
        </View>
        <View style={styles.inviteButtonView}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View>
              <Ionicons name="md-checkmark" color="#156352" size={38} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Inbjudningar</Text>
        </View>
        {renderInvites}
      </View>
    )
  }
}

export default Invites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: "#156352",
    borderTopWidth: StatusBar.currentHeight
  },
  header: {
    backgroundColor: "#156352",
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 20,
    height: 60
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginLeft: 20,
    flex: 1
  },
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