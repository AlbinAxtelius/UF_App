import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Login from "../components/login/login";
import Register from "../components/login/register";
import Tasks from "../components/tasks/tasks";
import AuthLoading from "../components/login/authLoading";
import CreateTask from "../components/tasks/createTask/createTask";
import GroupInfo from "../components/group/manageGroup";
import TaskWrapper from "../components/tasks/taskWrapper";
import Profile from "../components/profiles/profile";
import Invites from "../components/invites/invites";
import CreateGroup from "../components/CreateGroup/createGroup";
import ForgotPassword from "../components/login/forgotPassword";

export const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login",

        headerTitleContainerStyle: {}
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: "Register"
      }
    },
    passwordReset: {
      screen: ForgotPassword
    }
  },
  { headerMode: "none" }
);

export const MainStack = createStackNavigator(
  {
    Tasks: {
      screen: Tasks,
      navigationOptions: {
        title: "Sysslor",
        headerStyle: {
          backgroundColor: "#156352"
        },
        headerTitleStyle: {
          color: "white"
        }
      }
    },
    CreateTask: {
      screen: CreateTask
    }
  },
  {
    headerMode: "none"
  }
);

export const MainBottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: TaskWrapper,
      navigationOptions: {
        drawerLabel: "Tasks",
        tabBarIcon: <Ionicons size={26} name="md-checkmark" color="black" />,
        title: "Sysslor"
      }
    },
    GroupInfo: {
      screen: GroupInfo,
      navigationOptions: {
        title: "Grupp",
        tabBarIcon: <Ionicons size={26} name="md-contacts" color="black" />
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63",
      itemsContainerStyle: {
        flex: 1
      }
    }
  }
);

export const MainDrawer = createDrawerNavigator(
  {
    Sysslor: MainStack,
    Profil: Profile,
    Inbjudningar: Invites,
    "Skapa grupp": CreateGroup
  },
  {
    contentOptions: {
      activeTintColor: "#156352",
      labelStyle: {
        width: "100%"
      }
    }
  }
);

export const AuthStack = createSwitchNavigator(
  {
    Auth: LoginStack,
    App: MainDrawer,
    AuthLoading: AuthLoading
  },
  {
    initialRouteName: "AuthLoading",
    headerMode: "none"
  }
);
