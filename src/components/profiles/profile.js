import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableNativeFeedback
} from "react-native";
import { Avatar } from "react-native-material-ui";
import { Ionicons } from "@expo/vector-icons";
import fire from "../../config/config";
import globalstyles from "../../styles/globalstyle";

export default class Profile extends Component {
  constructor() {
    super();

    this.db = fire.firestore();

    this.state = {
      username: ""
    };
  }

  componentWillMount = () => {
    this.setState({
      username: fire.auth().currentUser.displayName
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
          <Text style={globalstyles.headerText}>Profil</Text>
        </View>
        <View>
          <View style={{ height: 100, margin: 24 }}>
            <Avatar
              text={this.state.username.substring(0, 1)}
              size={100}
              style={{
                content: { fontSize: 40 },
                container: { backgroundColor: "#C0392B" }
              }}
            />
          </View>
          <Text style={{ fontSize: 32, textAlign: "center" }}>
            {this.state.username}
          </Text>
        </View>
        <View style={{ marginTop: "auto", marginBottom: 48 }}>
          <Button
            title="Logga ut"
            color="#C0392B"
            onPress={() => {
              fire.auth().signOut();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayname: {
    fontSize: 16,
    margin: 20
  }
});
