import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from "./src/screens/HomeScreen";

const navigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
  Home:HomeScreen
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions : {
    title: 'My App',
    header: null
  }
});

export default createAppContainer(navigator);