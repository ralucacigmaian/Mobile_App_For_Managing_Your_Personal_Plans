import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import { firebase } from '../firebase/config'
import MyGoalsEntry from '../components/MyGoalsEntry';


const MyGoalsScreen = ({navigation}) => {

    const [myGoals, setMyGoals] = useState([]);
    const [deleted ,setDeleted] = useState(false)
    const getMyGoals = () => {
     
     
      var goalsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals")
      goalsRef.once("value", function(snapshot) {
        var myGoalsArray = []
        
        snapshot.forEach(function(item) {
          var itemVal = item.val();
            myGoalsArray.push({"key":item.key,"value":itemVal})      
        }); 

        setMyGoals(myGoalsArray);
        
      });
    }

    
    

    //get all daily goals from database
    useEffect(() => {
      const unsubscribe = navigation.addListener('didFocus', () => {
        console.log('In Navigation Add Listener Block');
        getMyGoals();
      //return unsubscribe;
    })}, [navigation]);

    useEffect(()=>{
        getMyGoals();
    }, [deleted])

    return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <KeyboardAwareScrollView>
        <StatusBar />
        <View style={styles.header}>
            <View style={{flexDirection:"row"}}>
           <Text style={{paddingTop:22,paddingRight:3, fontSize:24, fontWeight:"800"}}>
                My
            </Text>
            <Text style={{ fontSize:48, fontWeight:"800", color:colors.red}}>
                Goals 
            </Text>
            </View>
            <View style={{paddingTop:10, alignItems:"center"}}>
                <Image source={require('../utils/mydailygoalsScreenImage.jpg')}  style={styles.image} />
            </View>
            
        </View>
        <View>
        {myGoals.map((item)=>{
                        return(<MyGoalsEntry key={item.key} myGoal={item} deleted={deleted} setDeleted={setDeleted}/>)
                    })}
        </View>
        </KeyboardAwareScrollView>
        <Footer></Footer>
    </SafeAreaView>)
}



const styles = StyleSheet.create({
    header: {
        paddingTop:44,
        alignItems:'center'
       
    },
image:{
    width: 202,
    height: 132,
}

});

export default MyGoalsScreen;