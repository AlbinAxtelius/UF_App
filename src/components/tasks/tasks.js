import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Picker,
  TouchableNativeFeedback,
  AsyncStorage,
  StatusBar,
  Text,
  Button
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
      loading: true
    };
    this.db = fire.firestore();
  }

  componentDidMount = async () => {
    this.getGroups();
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
        AsyncStorage.getItem("groupId", (e, groupId) => {
          if (groupId) {
            this.setState({ groupId: groupId, loading: false });
            this.props.setGroupId(groupId);
            console.log(`${groupId} was set`);
          } else {
            if (groups.length > 0) {
              this.setState({ groupId: groups[0].groupId, loading: false });
              this.props.setGroupId(groups[0].groupId);
              console.log(`${groups[0].groupId} was set`);
            } else {
              this.setState({ loading: false });
            }
          }
        });
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
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Ionicons name="md-menu" size={26} style={globalstyles.openMenu} />
          </TouchableNativeFeedback>

          <Picker
            selectedValue={this.state.groupId}
            onValueChange={value => this.handleChange(value)}
            style={styles.picker}
          >
            {renderGroups}
          </Picker>
          <Ionicons name="md-arrow-dropdown" color="white" size={24} />
        </View>
        {this.state.groups.length === 0 && !this.state.loading ? (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ width: "80%", marginVertical: 20 }}>
              <Text
                style={{ fontSize: 24, color: "#7F8C8D", textAlign: "center" }}
              >
                Du är inte med i en grupp, bli inbjuden eller skapa en ny grupp
                nedan.
              </Text>
            </View>
            <Button
              color={"#C0392B"}
              title="Skapa grupp"
              onPress={() => this.props.navigation.navigate("Skapa grupp")}
            />
          </View>
        ) : (
          <MainBottomNav activeGroup={this.state.groupId} />
        )}
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
    elevation: 20,
    height: 60
  },
  picker: {
    width: "50%",
    height: 60,
    color: "white",
    backgroundColor: "#156352"
  }
});
