import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
} from 'react-native'
import fire from '../../config/config'

import Ionicons from '@expo/vector-icons/Ionicons';
import TaskWrapper from './taskWrapper';


export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      groups: []
    };
    this.db = fire.firestore();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={() => navigation.navigate('CreateTask')}>
          <View style={{ backgroundColor: "white", marginRight: 18 }}>
            <Ionicons name="md-add" size={28} />
          </View>
        </TouchableNativeFeedback>)
    }
  }

  componentDidMount = () => {
    this.getGroups();
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

  handleChange = groupId => {
    this.setState({ groupId })
  }

  render() {
    let renderGroups = this.state.groups.map(data => {
      return <Picker.Item key={data.groupId} label={data.groupName} value={data.groupId} />
    })
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.groupId}
          onValueChange={value => this.handleChange(value)}>
          {renderGroups}
        </Picker>
        <TaskWrapper activeGroup={this.state.groupId} />
        {/* {this.state.loading ?
          <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#2980B9" /> :
          <React.Fragment>
            <GroupView checkGroupId={() => this.refresh()} groupId={this.state.groupId} />
            <ScrollView
              refreshControl={<RefreshControl
                style={{ height: 0 }}
                refreshing={this.state.refreshing}
                onRefresh={this.loadTasks} />}
            >
              <Text style={styles.groupName}>{this.state.groupName}</Text>
              {renderTasks}
            </ScrollView>
          </React.Fragment>} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
  },
  groupName: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#2C3E50",
    color: "white",
    borderBottomColor: "black",
    borderBottomWidth: .5,
  }
})
