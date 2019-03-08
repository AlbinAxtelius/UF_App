import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableNativeFeedback,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Avatar, ListItem } from "react-native-material-ui";
import fire from "../../config/config";
import { connect } from "react-redux";
import { getGroupId } from "../../actions/groupActions";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddMember from "./addMember";
import NotificationSwitch from "./notificationSwitch";

class ManageGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: "",
      members: [],
      groupId: "",
      loading: true,
      addingMember: false
    };

    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.setState({
      groupId: this.props.groupId
    });
    this.getGroupInfo(this.props.groupId);
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.groupId != nextProps.groupId || this.state.groupId === "") {
      this.setState({
        groupId: nextProps.groupId,
        members: []
      });
      this.getGroupInfo(nextProps.groupId);
    } else {
      this.getGroupInfo(this.state.groupId);
    }
  };

  getGroupInfo = groupId => {
    if (groupId !== "") {
      if (groupId !== undefined) {
        this.setState({ loading: true });

        this.db
          .collection("Groups")
          .doc(groupId)
          .get()
          .then(doc => {
            const data = doc.data();
            this.setState({
              groupName: data.groupName
            });

            this.db
              .collection("Groups")
              .doc(groupId)
              .collection("Members")
              .get()
              .then(doc => {
                let members = [];
                doc.forEach(document => {
                  let data = document.data();
                  members.push({
                    displayName: data.displayName,
                    userId: data.userId
                  });
                });
                this.setState({
                  members: members,
                  loading: false
                });
              });
          });
      }
    }
  };

  render() {
    let renderUsers = this.state.members.map(m => {
      return (
        <ListItem
          key={m.userId}
          leftElement={
            <Avatar
              icon="person"
              style={{ container: { backgroundColor: "#C0392B" } }}
            />
          }
          centerElement={{
            primaryText: m.displayName
          }}
        />
      );
    });
    return (
      <View style={styles.groupView}>
        <ScrollView
          style={styles.members}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.getGroupInfo(this.state.groupId)}
              refreshing={this.state.loading}
            />
          }
        >
          <NotificationSwitch groupId={this.state.groupId} />
          <Text style={{ fontSize: 24, color: "#1c1c1c" }}>Medlemmar:</Text>
          {!this.state.loading ? <View>{renderUsers}</View> : null}
        </ScrollView>
        <TouchableNativeFeedback
          onPress={() => this.setState({ addingMember: true })}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.addButton}>
            <Ionicons name="md-person-add" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        {this.state.addingMember && (
          <AddMember
            groupId={this.state.groupId}
            groupName={this.state.groupName}
            visible={this.state.addingMember}
            handleClose={() => this.setState({ addingMember: false })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  groupId: state.groups.groupId
});

export default connect(
  mapStateToProps,
  { getGroupId }
)(ManageGroup);

const styles = StyleSheet.create({
  groupView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  members: {
    width: "90%"
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
