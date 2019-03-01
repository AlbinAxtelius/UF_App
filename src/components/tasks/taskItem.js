import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Button
} from "react-native";
import Swipeable from "react-native-swipeable";
import CustomCheck from "./customCheck";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSize: new Animated.Value(0)
    };
  }

  componentDidMount = () => {
    Animated.timing(this.state.itemSize, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
      delay: 0
    }).start();
  };

  render() {
    let { itemSize } = this.state;

    let leftContent = this.props.completed ? (
      <View style={styles.checkView}>
        <Ionicons
          name="md-close"
          size={40}
          color="white"
          style={styles.checkImage}
        />
      </View>
    ) : (
      <View style={styles.checkView}>
        <Ionicons
          name="md-checkmark"
          size={40}
          color="white"
          style={styles.checkImage}
        />
      </View>
    );

    return (
      <Animated.View style={{ transform: [{ scale: itemSize }] }}>
        <Swipeable
          onLeftActionRelease={this.props.handleSwipe}
          leftContent={leftContent}
        >
          <View style={styles.taskContainer}>
            <CustomCheck
              checked={this.props.checked}
              handlePress={this.props.handleSwipe}
            />
            <View style={styles.taskTextView}>
              <Text style={styles.taskText}>{this.props.title}</Text>
              <Text style={styles.repText}>
                {this.props.repText ? `Repetera: ${this.props.repText}` : null}
              </Text>
            </View>
          </View>
        </Swipeable>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#BDC3C7",
    width: "100%",
    height: 80,
    paddingLeft: 20,
    alignItems: "center",
    flexDirection: "row"
  },
  taskText: {
    marginLeft: 20,
    lineHeight: 80,
    fontSize: 20,
    flex: 1
  },
  checkView: {
    backgroundColor: "#2ECC71",
    height: 80,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute"
  },
  checkImage: {
    marginRight: 20
  },
  taskTextView: {
    flex: 1
  },
  repText: {
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 10,
    color: "#7F8C8D"
  }
});
