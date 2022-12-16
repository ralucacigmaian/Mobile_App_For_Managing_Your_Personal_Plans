import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';

const navigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions : {
    title: 'My App',
    header: null
  }
});

export default createAppContainer(navigator);