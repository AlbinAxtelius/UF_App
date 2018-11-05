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
  Alert
} from 'react-native'
import fire from '../../config/config'
import { Ionicons } from '@expo/vector-icons';

import TaskItem from './taskItem'


export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      loading: true,
      scrolling: false,
      selectGroup: false,
      groupId: "",
      groups: []
    };
    this.db = fire.firestore();
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

  componentWillMount = () => {
    this.checkGroupId();
  }

  checkGroupId = async () => {
    await AsyncStorage.getItem('groupId').then(groupId => {
      if (groupId) {
        this.setState({
          selectGroup: false,
          groupId: groupId
        });
        this.loadTasks();
      } else {
        this.db.collection('Users').doc(fire.auth().currentUser.uid)
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
    this.db.collection('Groups').doc(this.state.groupId)
      .get()
      .then(doc => {
        const data = doc.data();
        data.Tasks.map(data => {
          let oldTasks = this.state.tasks;
          oldTasks.push(data);
          this.setState({
            tasks: oldTasks,
            loading: false
          })
        })
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
      return <Text key={data.taskId}>{data.taskName}</Text>
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
          <ScrollView>
            {renderTasks}
          </ScrollView>}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#C0392B"}
          style={styles.addTaskView}
          onPress={() => { this.props.navigation.navigate('CreateTask') }}>
          <Text style={styles.addTaskText}>+</Text>
        </TouchableHighlight>
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
