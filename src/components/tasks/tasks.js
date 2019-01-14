import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  AsyncStorage,
  StatusBar
} from "react-native";
import fire from "../../config/config";

import { connect } from "react-redux";
import { setGroupId } from "../../actions/groupActions";

import Ionicons from "@expo/vector-icons/Ionicons";
import { MainBottomNav } from "../../config/tabs";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      groups: [],
      refresh: true
    };
    this.db = fire.firestore();
  }

  componentDidMount = async () => {
    this.getGroups();

    await AsyncStorage.getItem("groupId", (e, groupId) => {
      if (groupId) {
        this.setState({ groupId });
        this.props.setGroupId(groupId);
        console.log(`${groupId} was set`);
      } else {
        this.handleChange(this.state.groups[0].groupId)
        console.log(`${this.state.groups[0].groupId} was set`);

      }
    });
  };

  getGroups = async () => {
    this.db
      .collection("Users")
      .doc(fire.auth().currentUser.uid)
      .collection("Groups")
      .get()
      .then(doc => {
        let groups = [];
        doc.forEach(e => {
          groups.push({
            groupId: e.data().groupId,
            groupName: e.data().groupName
          });
        });
        this.setState({ groups });
      });
  };

  handleChange = async groupId => {
    this.setState({ groupId });
    await AsyncStorage.setItem("groupId", groupId).catch(e => console.log(e));
    this.props.setGroupId(groupId);
  };

  render() {
    let renderGroups = this.state.groups.map(data => {
      return (
        <Picker.Item
          key={data.groupId}
          label={data.groupName}
          value={data.groupId}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Picker
            selectedValue={this.state.groupId}
            onValueChange={value => this.handleChange(value)}
            style={styles.picker}
          >
            {renderGroups}
          </Picker>
          <Ionicons name="md-arrow-dropdown" color="white" size={18} />
        </View>
        <MainBottomNav activeGroup={this.state.groupId} />
      </View>
    );
  }
}

export default connect(
  null,
  { setGroupId }
)(Tasks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: "#156352",
    borderTopWidth: StatusBar.currentHeight
  },
  header: {
    backgroundColor: "#156352",
    flexDirection: "row",
    alignItems: "center",
    elevation: 20
  },
  picker: {
    width: "50%",
    height: 60,
    color: "white",
    backgroundColor: "#156352"
  }
});
