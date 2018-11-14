import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import fire from '../../config/config'

import TaskItem from './taskItem'

export default class TaskWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      tasks: [],
      refreshing: false,
      loading: true
    }

    this.db = fire.firestore();
  }

   componentWillReceiveProps = (nextProps) => {
    if (this.state.groupId != nextProps.activeGroup) {
      this.setState({
        groupId: nextProps.activeGroup,
      })
      this.getTasks(nextProps.activeGroup);
    } else {
      this.getTasks(this.state.groupId);
    }
  }

  getTasks = (groupId) => {
    if (groupId !== "") {
      this.setState({ loading: true })
      this.db
        .collection('Groups')
        .doc(groupId)
        .collection('Tasks')
        .where('completed', '==', false)
        .get()
        .then(col => {
          let tasks = [];
          col.docs.forEach(doc => {
            tasks.push({
              id: doc.id,
              taskName: doc.data().taskName
            })
          })
          this.setState({ tasks: tasks, loading: false })
        }).catch(e => console.log(e))
    }
  }

  finishTask = taskId => {
    this.db
      .collection('Groups')
      .doc(this.state.groupId)
      .collection('Tasks')
      .doc(taskId)
      .update({ completed: true });

    let tasks = this.state.tasks;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1);
      }
    }
    this.setState({ tasks });
  }

  render() {
    let renderTasks = this.state.tasks.map(m => {
      return <TaskItem handleSwipe={() => this.finishTask(m.id)} key={m.id} title={m.taskName} />
    })
    return (
      <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator size="large" /> :
          <ScrollView
            refreshControl={<RefreshControl
              style={{ height: 0 }}
              refreshing={this.state.refreshing}
              onRefresh={() => this.getTasks(this.state.groupId)} />}>
            {renderTasks}
          </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})