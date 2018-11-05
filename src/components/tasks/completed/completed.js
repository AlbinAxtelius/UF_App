import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, ListView, TouchableHighlight } from 'react-native'
import fire from '../../../config/config'
import { Ionicons } from '@expo/vector-icons';

import TaskItem from '../taskItem'

export default class Completed extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      tasks: [],
    };
    this.firebase = fire.database().ref().child(`/Tasks/${fire.auth().currentUser.uid}`);

  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.openDrawer()} style={{ marginLeft: 24, }}>
          <Ionicons name="md-menu" size={24} color="black" />
        </TouchableHighlight>
      )
    }
  }

  componentWillMount() {
    this.firebase.child(`/Completed`).on('child_added', snap => {
      let oldTasks = this.state.tasks;
      oldTasks.push({
        id: snap.key,
        taskName: snap.val().taskName,
      })
      this.setState({ tasks: oldTasks })
    })
  }

  componentWillUnmount() {
    this.firebase.child("/Completed").off();
  }

  handleSwipeComplete(id) {
    this.firebase.child(`/Completed/${id}`).once('value', snap => {
      this.firebase.child(`/Active/${id}`).set(snap.val());
      this.firebase.child(`/Completed/${id}`).remove();
    })

    var removeIndex = this.state.tasks.map(function (item) { return item.id; }).indexOf(id);

    let oldTasks = this.state.tasks;
    oldTasks.splice(removeIndex, 1);

    this.setState({
      tasks: oldTasks
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.tasks.length > 0 ?
            <ListView
              enableEmptySections={true}
              dataSource={this.ds.cloneWithRows(this.state.tasks)}
              renderRow={rowData => <TaskItem completed checked={true} handleSwipe={() => this.handleSwipeComplete(rowData.id)} taskData={rowData} />} />
            : <Text style={styles.noTasksText}>Nothing to see here</Text>}
        </ScrollView>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    borderTopWidth: StatusBar.currentHeight,
    borderTopColor: "#2ECC71",
    height: 90,
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: "#2ECC71"
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
  }
})
