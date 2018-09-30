import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, ListView, TouchableHighlight } from 'react-native'
import fire from '../../config/config'
import { Ionicons } from '@expo/vector-icons';

import TaskItem from './taskItem'


export default class Tasks extends Component {
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
      title: "Create task",
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.openDrawer()} style={{ marginLeft: 24, }}>
          <Ionicons name="md-menu" size={24} color="black" />
        </TouchableHighlight>
      )
    }
  }

  componentWillMount() {
    this.firebase.child(`/Active`).on('child_added', snap => {
      let oldTasks = this.state.tasks;
      oldTasks.push({
        id: snap.key,
        taskName: snap.val().taskName,
      })
      this.setState({ tasks: oldTasks })
    })
  }

  handleSwipeComplete(id) {
    this.firebase.child(`/Active/${id}`).once('value', snap => {
      this.firebase.child(`/Completed/${id}`).set(snap.val());
      this.firebase.child(`/Active/${id}`).remove();
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
              renderRow={rowData => <TaskItem handleSwipe={() => this.handleSwipeComplete(rowData.id)} taskData={rowData} />} />
            : <Text style={styles.noTasksText}>All done :)</Text>}
        </ScrollView>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#C0392B"}
          style={styles.addTaskView}
          onPress={() => { this.props.navigation.navigate('CreateTask') }}>
          <Text style={styles.addTaskText}>+</Text>
        </TouchableHighlight>
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
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 48,
    fontWeight: 'bold',
  }
})
