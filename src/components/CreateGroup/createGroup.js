import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableNativeFeedback
} from "react-native";
import { Button } from "react-native-material-ui";
import { Ionicons } from "@expo/vector-icons";
import fire from "../../config/config";
import globalstyles from "../../styles/globalstyle";
import {TextField} from "react-native-material-textfield";

export class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.db = fire.firestore();

    this.state = {
      groupName: ""
    };
  }

  handleCreate = () => {
    if (this.state.groupName !== "")
      this.db
        .collection("Groups")
        .add({
          groupName: this.state.groupName
        })
        .then(doc => {
          this.db
            .collection("Groups")
            .doc(doc.id)
            .collection("Members")
            .add({
              displayName: fire.auth().currentUser.displayName,
              userId: fire.auth().currentUser.uid
            });
          this.db
            .collection("Users")
            .doc(fire.auth().currentUser.uid)
            .collection("Groups")
            .add({
              groupName: this.state.groupName,
              groupId: doc.id
            });
          AsyncStorage.setItem("groupId", doc.id).then(() => {
            this.props.navigation.navigate("Tasks");
          });
        });
  };

  render() {
    return (
      <View style={globalstyles.container}>
        <View style={globalstyles.header}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Ionicons name="md-menu" size={26} style={globalstyles.openMenu} />
          </TouchableNativeFeedback>
          <Text style={globalstyles.headerText}>Skapa ny grupp</Text>
        </View>
        <View style={{width: "90%" }}>
          <TextField
            label="Gruppnamn"
            tintColor="#156352"
            fontSize={18}
            value={this.state.groupName}
            onChangeText={groupName => this.setState({ groupName })}
          />
          <View style={{alignSelf: 'center', width: "50%" }}>
            <Button
              text="Skapa grupp"
              accent
              raised
              disabled={this.state.groupName.length === 0}
              onPress={() => this.handleCreate()}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CreateGroup;
