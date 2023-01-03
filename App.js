import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from "./src/screens/HomeScreen";
import AddGoalScreen from "./src/screens/AddGoalScreen";
import MyGoalsScreen from "./src/screens/MyGoalsScreen";
import JournalingScreen from "./src/screens/JournalingScreen";
import AddJournalEntryScreen from "./src/screens/AddJournalEntryScreen";

const navigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
  Home:HomeScreen,
  AddGoal: AddGoalScreen,
  MyGoals: MyGoalsScreen,
  Journaling: JournalingScreen,
  AddJournalEntry: AddJournalEntryScreen,
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions : {
    title: 'My App',
    headerShown: false
  }
});

export default createAppContainer(navigator);