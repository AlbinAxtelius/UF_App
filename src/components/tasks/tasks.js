import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  Picker,
  Alert,
  RefreshControl,
  TouchableNativeFeedback
} from 'react-native'
import fire from '../../config/config'

import TaskItem from './taskItem'
import Ionicons from '@expo/vector-icons/Ionicons';


export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      loading: true,
      scrolling: false,
      selectGroup: false,
      groupId: "",
      groups: [],
      groupName: "",
      refreshing: false
    };
    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.checkGroupId();
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

  getGroupName = () => {
    this.db
      .collection('Groups')
      .doc(this.state.groupId)
      .get()
      .then(doc => {
        data = doc.data();
        this.setState({
          groupName: data.groupName
        })
      })
  };

  checkGroupId = async () => {
    await AsyncStorage
      .getItem('groupId')
      .then(groupId => {
        if (groupId) {
          this.setState({
            selectGroup: false,
            groupId: groupId
          });
          this.loadTasks();
          this.getGroupName();

        } else {
          this.db
            .collection('Users')
            .doc(fire.auth().currentUser.uid)
            .get()
            .then(doc => {
              const data = doc.data();
              data.Groups.map(data => {
                let oldGroups = this.state.groups;
                oldGroups.push(data);

                this.setState({
                  selectGroup: true,
                  groups: oldGroups
                })
              })
            })
        }
      })
  }

  loadTasks = async () => {
    this.setState({ tasks: [], loading: true })
    this.db
      .collection('Groups')
      .doc(this.state.groupId)
      .collection('Tasks')
      .where('completed', '==', false)
      .get()
      .then(snap => {
        snap.docs.forEach(doc => {
          data = doc.data();
          let oldTasks = this.state.tasks
          oldTasks.push({
            id: doc.id,
            title: data.taskName
          });
          this.setState({
            tasks: oldTasks,
            loading: false,
            refreshing: false
          })
        })
      })
  }

  handleSwipe = id => {
    this.db
      .collection('Groups')
      .doc(this.state.groupId)
      .collection('Tasks')
      .doc(id)
      .update({ completed: true })
      .then(() => {
        for (let i = 0; i < this.state.tasks.length; i++) {
          if (id === this.state.tasks[i].id) {
            const tasks = this.state.tasks;
            tasks.splice(i, 1);
            this.setState({
              tasks
            })
          }
        }
      })
  }


  handleGroupChange = async (groupId) => {
    console.log(groupId)
    await AsyncStorage.setItem('groupId', groupId)
      .then(() => {
        this.setState({ selectGroup: false })
        this.checkGroupId();
      })
  }

  render() {
    let renderGroups = this.state.groups.map(data => {
      return <Picker.Item key={data.groupId} label={data.groupName} value={data.groupId} />
    })
    let renderTasks = this.state.tasks.map(data => {
      return <TaskItem handleSwipe={() => this.handleSwipe(data.id)} key={data.id} title={data.title} />
    })
    return (
      <View style={styles.container}>
        {this.state.selectGroup &&
          <Modal
            animationType="fade"
            onRequestClose={() => Alert.alert("Välj grupp", "Du måste välja en grupp")}>
            <View style={styles.modal}>
              <Picker
                style={{ width: 200 }}
                mode="dialog"
                onValueChange={value => this.handleGroupChange(value)}>
                <Picker.Item label="Välj grupp" />
                {renderGroups}
              </Picker>
            </View>
          </Modal>
        }
        {this.state.loading ?
          <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#2980B9" /> :
          <ScrollView
            refreshControl={<RefreshControl
            style={{height: 0}}
              refreshing={this.state.refreshing}
              onRefresh={this.loadTasks} />}
          >
            <Text style={styles.groupName}>{this.state.groupName}</Text>
            {renderTasks}
          </ScrollView>}
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
