import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import Login from '../components/login/login';
import Register from '../components/login/register';
import Tasks from '../components/tasks/tasks';
import AuthLoading from '../components/login/authLoading';
import CreateTask from '../components/tasks/createTask/createTask';
import Completed from '../components/tasks/completed/completed';

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
    },
  },
});

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

export const LoggedInDrawer = createDrawerNavigator({
  Tasks: {
    screen: TaskStack
  },
  Completed: {
    screen: Completed
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