import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableNativeFeedback,
  Modal
} from 'react-native'
import fire from '../../config/config'
import { connect } from 'react-redux'
import { getGroupId } from '../../actions/groupActions'
import Ionicons from '@expo/vector-icons/Ionicons';

import CreateTask from './createTask/createTask'
import TaskItem from './taskItem'

class TaskWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      tasks: [],
      refreshing: false,
      loading: true,
      cTask: false,
      prototype: false
    }

    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.props.getGroupId();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.newTask) {
      let tasks = this.state.tasks;

      tasks.unshift(nextProps.newTask);

      this.setState({ tasks });
    }

    if (nextProps.groupId)
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
          .orderBy("createDate", 'asc')
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

  prototype = async () => {
    this.setState({ prototype: true })

    let i = 10;

    const timer = setInterval(() => {
      i--;
      if (i == 0) {
        this.setState({ prototype: false })
        clearInterval(timer);
      }
    }, 1000);

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
            {!this.state.prototype ? <TaskItem handleSwipe={() => this.prototype()} title="Repeterande" repText="10 sekunder" /> :
              <View>
                <Text style={{fontSize: 24, textAlign:"center", marginTop: 20, color: "#1c1c1c"}}>Kommande</Text>
                <TaskItem title="Repeterande" checked={true} repText="10 sekunder"/>
              </View>}
          </ScrollView>}
        <TouchableNativeFeedback
          onPress={() => this.setState({ cTask: true })}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.addButton}>
            <Ionicons name="md-add" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        {this.state.cTask && <CreateTask groupId={this.state.groupId} visible={this.state.cTask} handleClose={() => this.setState({ cTask: false })} />}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  groupId: state.groups.groupId,
  newTask: state.groups.task
})

export default connect(mapStateToProps, { getGroupId })(TaskWrapper)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    backgroundColor: "#66392F",
    position: 'absolute',
    height: 60,
    width: 60,
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 30,
  }
})