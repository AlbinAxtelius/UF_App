import React, { Component } from 'react'
import { View, FlatList, StyleSheet, TouchableHighlight, Button, Text, AsyncStorage } from 'react-native'
import fire from '../../config/config'
import ProfileCard from './profileCard'

export default class Profiles extends Component {
  constructor() {
    super();

    this.firebase = fire.database().ref().child(`/Profiles/${fire.auth().currentUser.uid}`);

    this.state = {
      profiles: [{key:1}]
    }
  }

  componentDidMount = () => {

    this.firebase.on('child_added', snap => {
      let oldProfiles = this.state.profiles;
      oldProfiles.push({
        key: snap.key,
        profileName: snap.val().name
      })
      this.setState({ profiles: oldProfiles })
    });

    AsyncStorage.setItem('profileId', null);

  }


  handleSelect(key) {
    AsyncStorage.setItem('id', key.toString());
    this.props.navigation.navigate('Tasks');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.profiles}
          renderItem={({ item }) => <ProfileCard
            handleSelect={() => this.handleSelect(item.key)}
            userData={item} />}
          numColumns={2}
        />
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#C0392B"}
          style={styles.addTaskView}
          onPress={() => { this.props.navigation.navigate('CreateProfile') }}>
          <Text style={styles.addTaskText}>+</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addTaskView: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    padding: 20,
    backgroundColor: "#E74C3C",
    borderRadius: 30,
    elevation: 4,
  },
  addTaskText: {
    color: "white",
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 30
  }
})