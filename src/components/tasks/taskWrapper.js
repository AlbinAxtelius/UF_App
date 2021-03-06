import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableNativeFeedback
} from "react-native";
import fire from "../../config/config";
import { connect } from "react-redux";
import { getGroupId } from "../../actions/groupActions";
import Ionicons from "@expo/vector-icons/Ionicons";


import CreateTask from "./createTask/createTask";
import TaskItem from "./taskItem";

class TaskWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      tasks: [],
      refreshing: false,
      loading: true,
      cTask: false
    };

    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.props.getGroupId();
  };

  componentWillMount = () => {
    this.getTasks(this.props.groupId);
    console.log(this.state)
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.newTask) {
      let tasks = this.state.tasks;
      tasks.unshift(nextProps.newTask);
      this.setState({ tasks });
    }

    if (nextProps.groupId)
      if (this.state.groupId != nextProps.groupId) {
        this.setState({
          groupId: nextProps.groupId
        });
        this.getTasks(nextProps.groupId);
      } else {
        this.getTasks(this.state.groupId);
      }
  };

  getTasks = groupId => {
    if (groupId !== "") {
      if (groupId !== undefined) {
        this.setState({ loading: true });
        this.db
          .collection("Groups")
          .doc(groupId)
          .collection("Tasks")
          .orderBy("createDate", "asc")
          .where("completed", "==", false)
          .get()
          .then(col => {
            let tasks = [];
            col.docs.forEach(doc => {
              tasks.push({
                id: doc.id,
                taskName: doc.data().taskName,
                repCode: doc.data().repCode,
                repText: doc.data().repMessage
              });
            });
            this.setState({ tasks: tasks, loading: false });
          })
          .catch(e => console.log(e));
      }
    }
  };

  finishTask = (taskId, repCode) => {
    console.log(repCode);
    this.db
      .collection("Groups")
      .doc(this.state.groupId)
      .collection("Tasks")
      .doc(taskId)
      .update({ completed: true });

    if (repCode >= 1) {
      console.log(repCode);
      let now = new Date().getTime(),
        time;
      const dayInMillisecs = 86400;

      switch (repCode) {
        case 1:
          time = now + dayInMillisecs;
          break;
        case 2:
          time = now + dayInMillisecs * 7;
          break;
        case 3:
          time = now + dayInMillisecs * 28;
          break;
      }

      this.db.collection("Repeating").add({
        dueDate: time,
        groupId: this.state.groupId,
        taskId: taskId
      });
    }

    let tasks = this.state.tasks;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1);
      }
    }
    this.setState({ tasks });
  };

  render() {
    let renderTasks = this.state.tasks.map(m => {
      return (
        <TaskItem
          handleSwipe={() => this.finishTask(m.id, m.repCode)}
          key={m.id}
          title={m.taskName}
          repText={m.repText}
        />
      );
    });
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              style={{ height: 0 }}
              refreshing={this.state.loading}
              onRefresh={() => this.getTasks(this.state.groupId)}
            />
          }
        >
          {!this.state.loading ? <View>{ renderTasks }</View> : null}
        </ScrollView>
        <TouchableNativeFeedback
          onPress={() => this.setState({ cTask: true })}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.addButton}>
            <Ionicons name="md-add" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        {this.state.cTask && (
          <CreateTask
            groupId={this.state.groupId}
            visible={this.state.cTask}
            handleClose={() => this.setState({ cTask: false })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  groupId: state.groups.groupId,
  newTask: state.groups.task
});

export default connect(
  mapStateToProps,
  { getGroupId }
)(TaskWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    backgroundColor: "#C0392B",
    position: "absolute",
    height: 60,
    width: 60,
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderRadius: 30
  }
});
