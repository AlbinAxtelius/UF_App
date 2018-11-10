import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import fire from '../../config/config'

import TaskItem from './taskItem'

export default class TaskWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      tasks: []
    }

    this.db = fire.firestore();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.groupId != nextProps) {
      this.setState({
        groupId: nextProps.activeGroup,
      })
      this.getTasks(nextProps.activeGroup);
    }
  }

  getTasks = (groupId) => {
    if (groupId !== "") {
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
          this.setState({ tasks })
        }).catch(e => console.log(e))
    }
  }

  render() {
    let renderTasks = this.state.tasks.map(m => {
      return <TaskItem key={m.id} title={m.taskName} />
    })
    return (
      <View>
        <ScrollView >
          {renderTasks}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})