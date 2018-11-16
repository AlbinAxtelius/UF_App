import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import fire from '../../config/config'

import { connect } from 'react-redux';
import { setGroupId } from '../../actions/groupActions';


import Ionicons from '@expo/vector-icons/Ionicons';
import { MainBottomNav } from '../../config/tabs'

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      groups: [],
      refresh: true
    };
    this.db = fire.firestore();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={() => navigation.navigate('GroupInfo')}>
            <View style={{ marginRight: 18 }}>
              <Ionicons name="md-person-add" color="white" size={28} />
            </View>
          </TouchableNativeFeedback>
        </View>)
    }
  }

  componentDidMount = async () => {
    this.getGroups();

    await AsyncStorage.getItem('groupId', ((e, groupId) => {
      if (groupId) {
        this.setState({ groupId });
        this.props.setGroupId(groupId);
      }
      console.log(`${groupId} was set`)
    }))
  }

  getGroups = async () => {
    this.db
      .collection('Users')
      .doc(fire.auth().currentUser.uid)
      .get()
      .then(doc => {
        const data = doc.data();
        let groups = [];
        data.Groups.forEach(e => {
          groups.push({
            groupId: e.groupId,
            groupName: e.groupName
          })
        });
        this.setState({ groups });
      })
  }

  handleChange = async (groupId) => {
    this.setState({ groupId });
    await AsyncStorage.setItem('groupId', groupId)
      .catch(e => console.log(e))
    this.props.setGroupId(groupId);
  }

  render() {
    let renderGroups = this.state.groups.map(data => {
      return <Picker.Item key={data.groupId} label={data.groupName} value={data.groupId} />
    })
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.groupId}
          onValueChange={value => this.handleChange(value)}
          style={styles.picker}
        >
          {renderGroups}
        </Picker>
        <MainBottomNav activeGroup={this.state.groupId} />
      </View>
    )
  }
}

export default connect(null, { setGroupId })(Tasks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: {
    backgroundColor: "#76B397",
  }
})
