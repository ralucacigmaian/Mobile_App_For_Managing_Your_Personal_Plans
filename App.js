import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';

const navigator = createStackNavigator({
  SignUp: SignUpScreen,
}, {
  initialRouteName: 'SignUp',
  defaultNavigationOptions : {
    title: 'My App',
    header: null
  }
});

export default createAppContainer(navigator);