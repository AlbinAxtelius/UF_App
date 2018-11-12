import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import fire from '../../config/config'

import Ionicons from '@expo/vector-icons/Ionicons';
import TaskWrapper from './taskWrapper';


export default class Tasks extends Component {
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
            <View style={{ backgroundColor: "white", marginRight: 18 }}>
              <Ionicons name="md-information-circle" size={28} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={() => navigation.navigate('GroupInfo')}>
            <View style={{ backgroundColor: "white", marginRight: 18 }}>
              <Ionicons name="md-person-add" size={28} />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={() => navigation.navigate('CreateTask')}>
            <View style={{ backgroundColor: "white", marginRight: 18 }}>
              <Ionicons name="md-add" size={28} />
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
  }

  refresh = () => {
    console.log("hej")
    this.child.getTasks(this.state.groupId);
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
        <TaskWrapper onRef={ref => (this.child = ref)} activeGroup={this.state.groupId} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: {
    backgroundColor: "#1ABC9C",
  }
})
