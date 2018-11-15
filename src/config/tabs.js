import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Login from '../components/login/login';
import Register from '../components/login/register';
import Tasks from '../components/tasks/tasks';
import AuthLoading from '../components/login/authLoading';
import CreateTask from '../components/tasks/createTask/createTask';
import Completed from '../components/tasks/completed/completed';
import Profiles from '../components/profiles/profiles';
import CreateProfile from '../components/profiles/createProfile';
import GroupInfo from '../components/group/manageGroup';
import TaskWrapper from '../components/tasks/taskWrapper';
import Drawer from '../components/menu/drawer';

export const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerTitleContainerStyle: {
      }
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  }
}
);

export const MainStack = createStackNavigator({
  Tasks: {
    screen: Tasks,
    navigationOptions: {
      title: "Tasks",
      headerStyle: {
        backgroundColor: '#156352',
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  CreateTask: {
    screen: CreateTask,
  },
})


export const MainBottomNav = createBottomTabNavigator({
  Home: {
    screen: (props) => <TaskWrapper {...props} />,
    navigationOptions: {
      drawerLabel: "Tasks",
      tabBarIcon: <Ionicons size={26} name="md-checkmark" color="black" />
    }
  },
  GroupInfo: {
    screen: GroupInfo,
    navigationOptions: {
      title: "Group",
      tabBarIcon: <Ionicons size={26} name="md-settings" color="black" />
    }
  },
}, {
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        flex: 1,
      },
      tabBarOptions : {
        activeTintColor : "red"
      }
    }
  });

export const AuthStack = createStackNavigator({
  Auth: LoginStack,
  App: MainStack,
  AuthLoading: AuthLoading
},
  {
    initialRouteName: "AuthLoading",
    headerMode: 'none',
  }
);