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
import { connect } from 'react-redux'
import { getGroupId } from '../../actions/groupActions'

import TaskItem from './taskItem'

class TaskWrapper extends Component {
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

  componentDidMount = () => {
    this.props.getGroupId();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.groupId != nextProps.groupId) {
      this.setState({
        groupId: nextProps.groupId,
      })
      this.getTasks(nextProps.groupId);
    } else {
      this.getTasks(this.state.groupId);
    }
  }

  getTasks = (groupId) => {
    if (groupId !== "") {
      if (groupId !== undefined) {
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

const mapStateToProps = state => ({
  groupId: state.groups.groupId
})

export default connect(mapStateToProps, { getGroupId })(TaskWrapper)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})