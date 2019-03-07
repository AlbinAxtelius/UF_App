import React, { Component } from "react";
import { Text, View, Switch } from "react-native";
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

  componentDidUpdate = (prevprops) => {
    if (prevprops.groupId !== this.props.groupId && this.props.groupId !== "")
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
            console.log(this.state)
          }
          this.setState({ loading: false });
        }).catch(console.log);
  };

  handleNotificationSwitch = async notificationAccess => {
    this.setState({loading: true})
    console.log(notificationAccess)
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
        .then((doc) => {
          this.setState({ pushTokenId: doc.id ,notificationAccess: true, loading: false });
        });
    } else {
      console.log(this.props)

      fire
        .firestore()
        .collection("Groups")
        .doc(this.props.groupId)
        .collection("WillRecieveNotifications")
        .doc(this.state.pushTokenId)
        .delete()
        .then(() => this.setState({ notificationAccess: false, loading: false }));
    }
  };

  render() {
    return (
      <View>
        <Text>Push notifikationer</Text>
        <Switch
          value={this.state.notificationAccess}
          disabled={this.state.loading}
          onValueChange={notificationAccess =>
            this.handleNotificationSwitch(notificationAccess)
          }
        />
      </View>
    );
  }
}

export default NotificationSwitch;
