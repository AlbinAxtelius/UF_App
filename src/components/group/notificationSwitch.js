import React, { Component } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import { Notifications, Permissions } from "expo";
import fire from "../../config/config";

export class NotificationSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pushTokenId: "",
      loading: true,
      notificationAccess: false
    };
  }

  componentDidUpdate = prevprops => {
    if (prevprops.groupId !== this.props.groupId && this.props.groupId !== "") {
      this.setState({
        notificationAccess: false
      });
      fire
        .firestore()
        .collection("Groups")
        .doc(this.props.groupId)
        .collection("WillRecieveNotifications")
        .where("userId", "==", fire.auth().currentUser.uid)
        .get()
        .then(pushTokenIdDoc => {
          if (pushTokenIdDoc.docs[0]) {
            this.setState({
              pushTokenId: pushTokenIdDoc.docs[0].id,
              notificationAccess: true
            });
            console.log(this.state);
          }
          this.setState({ loading: false });
        })
        .catch(console.log);
    }
  };

  handleNotificationSwitch = async notificationAccess => {
    this.setState({ loading: true });
    console.log(notificationAccess);
    if (notificationAccess) {
      const { status } = await Permissions.getAsync("notifications");
      let newStatus = status;
      if (status !== "granted") {
        const { status } = await Permissions.askAsync("notifications");
        newStatus = status;
        if (newStatus !== "granted") return;
      }

      const token = await Notifications.getExpoPushTokenAsync();

      fire
        .firestore()
        .collection("Groups")
        .doc(this.props.groupId)
        .collection("WillRecieveNotifications")
        .add({
          expoNotificationToken: token,
          userId: fire.auth().currentUser.uid
        })
        .then(doc => {
          this.setState({
            pushTokenId: doc.id,
            notificationAccess: true,
            loading: false
          });
        });
    } else {
      console.log(this.props);

      fire
        .firestore()
        .collection("Groups")
        .doc(this.props.groupId)
        .collection("WillRecieveNotifications")
        .doc(this.state.pushTokenId)
        .delete()
        .then(() =>
          this.setState({ notificationAccess: false, loading: false })
        );
    }
  };

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Push notifikationer</Text>
          <Switch
            value={this.state.notificationAccess}
            disabled={this.state.loading}
            onValueChange={notificationAccess =>
              this.handleNotificationSwitch(notificationAccess)
            }
          />
        </View>
        <View style={{ height: 1, width: "80%", backgroundColor: "#1c1c1c" }} />
      </View>
    );
  }
}

export default NotificationSwitch;

const styles = StyleSheet.create({
  switchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50
  },
  switchText: {
    fontSize: 24
  }
});
