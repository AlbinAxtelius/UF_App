import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator} from 'react-navigation'
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

export const TaskStack = createStackNavigator({
  Tasks: {
    screen: Tasks,
    navigationOptions: {
      title: "Tasks",
    }
  },
  CreateTask: {
    screen: CreateTask,

  }
})

export const CompletedStack = createStackNavigator({
  Completed: {
    screen: Completed,
    navigationOptions: {
      title: "Completed",
      headerTitleStyle: {
        flex: 1,
      }
    }
  }
})

export const ProfileStack = createStackNavigator({
  Profiles: {
    screen: Profiles,
    navigationOptions: {
      title: "Profiles"
    }
  },
  CreateProfile: {
    screen: CreateProfile
  }
})

export const LoggedInDrawer = createBottomTabNavigator({
  Tasks: {
    screen: TaskStack,
    navigationOptions: {
      drawerLabel: "Tasks",
      tabBarIcon: <Ionicons size={26} name="md-checkmark-circle-outline" color="black" />
    }
  },
  Completed: {
    screen: CompletedStack,
    
    navigationOptions: {
      drawerLabel: "Completed",
      tabBarIcon: <Ionicons size={26} name="md-done-all" color="black" />
    }
  },
  Profiles: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: "Switch profile",
    }
  }
}, {
    contentComponent: Drawer,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        flex: 1,
      }
    }
  });

export const AuthStack = createStackNavigator({
  Auth: LoginStack,
  App: LoggedInDrawer,
  AuthLoading: AuthLoading
},
  {
    initialRouteName: "AuthLoading",
    headerMode: 'none',
  }
);