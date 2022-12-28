import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import { firebase } from '../firebase/config'
import {
  ref,
  onValue
} from 'firebase/database';
const HomeScreen = ({navigation}) => {
    const handleSignOut = () => {
      firebase
      .auth()
        .signOut()
        .then(() => {
          navigation.navigate("SignIn")
        })
        .catch(error => alert(error.message))
    }


    const [dailyGoals, setDailyGoals] = useState({});
  
    //get all daily goals from database
    useEffect(() => {
      var goalsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals")
        goalsRef.orderByChild("type").equalTo("Daily").on("child_added", function(snapshot) {
        const data = snapshot.val();
        let myDailyGoals = {...data};
        setDailyGoals(myDailyGoals);
     });
    }, []);
  
    console.log(dailyGoals);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
                <StatusBar />
                <View style={styles.header}>
                    <View>
                        <Text style={styles.textDaily}>Daily</Text>
                        <Text style={styles.textGoals}>Goals</Text>
                        <Text style={styles.userGreeting}>Hello, {firebase.auth().currentUser?.displayName}! <Ionicons name="sunny" size={24} color="black" /></Text>
                       
                    </View>
                </View>
       
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddGoal')}>
          <Text style={styles.buttonText}>New goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
        <Footer />
      </SafeAreaView>
    )
  }
  
  export default HomeScreen
  
  const styles = StyleSheet.create({
    containerScreen: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: wp('100%'),
      height: hp('100%'),
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  textDaily: {
      fontSize: 36,
      fontWeight: 'bold',
      left: 50% - 136/2 + 13.5,
      top: 0
  },
  textGoals: {
      fontSize: 48,
      fontWeight: 'bold',
      color: colors.red,
      left: 50% - 136/2 + 13.5,
      top: 0
  },
    userGreeting: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 31,
        top: 10,
    },
     button: {
        height: 50,
        width: 343,
        backgroundColor: colors.red,
        borderRadius: 100,
        padding: 15,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })