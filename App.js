import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import AddGoalScreen from './src/screens/AddGoalScreen';

const navigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
  AddGoal: AddGoalScreen,
}, {
  initialRouteName: 'AddGoal',
  defaultNavigationOptions : {
    title: 'My App',
    headerShown: false
  }
});

export default createAppContainer(navigator);