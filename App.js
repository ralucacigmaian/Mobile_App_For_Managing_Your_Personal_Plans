import { useEffect} from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from "./src/screens/HomeScreen";
import AddGoalScreen from "./src/screens/AddGoalScreen";
import MyGoalsScreen from "./src/screens/MyGoalsScreen";
import JournalingScreen from "./src/screens/JournalingScreen";
import AddJournalEntryScreen from "./src/screens/AddJournalEntryScreen";
import EditGoalScreen from "./src/screens/EditGoalScreen";
import CameraScreen from "./src/screens/CameraScreen";
import * as Notifications from "expo-notifications";
import StatsScreen from './src/screens/StatsScreen';


const navigator = createStackNavigator({
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
  Home:HomeScreen,
  AddGoal: AddGoalScreen,
  MyGoals: MyGoalsScreen,
  Journaling: JournalingScreen,
  AddJournalEntry: AddJournalEntryScreen,
  EditGoal: EditGoalScreen,
  Camera: CameraScreen,
  Stats: StatsScreen
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions : {
    title: 'My App',
    headerShown: false
  }
});


export default createAppContainer(navigator);