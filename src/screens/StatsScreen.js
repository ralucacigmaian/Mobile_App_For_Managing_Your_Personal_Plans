import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import moment from 'moment'
import { firebase } from '../firebase/config'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  function* yLabel() {
    yield* ['Bad', 'Okay', 'Good'];
  }

const StatsScreen = ({navigation}) => {
    // Instantiate the iterator
    const yLabelIterator = yLabel();
    const [journal7Days, setJournal7Days] = useState([]);
    const [resultDates, setResultDates] = useState([])

    const getJournalLast7Days= () => {
        var resultDates = []
        const current = moment()
        let n=8
        while(n>0){
            resultDates.push(current.toDate().toDateString())
            current.subtract(1,"day")
            n--;
            
        }
        setResultDates(resultDates)
    
        var journalsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/journals")
        journalsRef.once("value", function(snapshot) {
          var journalsArray = []
          
          snapshot.forEach(function(item) {
            var itemVal = item.val();
            for(var i = 0; i<=7 ; i++)
                if(itemVal.date === resultDates[i])
                journalsArray.push({"key":item.key, "value":itemVal})      
          }); 
  
          setJournal7Days(journalsArray);
          
        });
    }

  const getLabelsSliced = () =>{
    var resultDates = []
    const current = moment()
    let n=8
    while(n>0){
        
        resultDates.push(current.toDate().toDateString().slice(0,3))
        current.subtract(1,"day")
        n--;
        
    }
    return resultDates.reverse()
  }

  const getJournalMoodLast7Days = () =>{
    var journalMoods = []
    for(var i = 7; i>=0; i--){
        let mood = 0;
        for(var j = 0; j < journal7Days.length; j++)
            if(journal7Days[j].value.date === resultDates[i])
                mood = journal7Days[j].value.mood
            
        journalMoods.push(mood)
    }
    return journalMoods
  }
  
   //get all daily goals from database
   useEffect(() => {
    const unsubscribe = navigation.addListener('didFocus', () => {
      console.log('In Navigation Add Listener Block');
      getJournalLast7Days();
    //return unsubscribe;
  })}, [navigation]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
            <StatusBar />
        <View style={styles.header}>
            <View style={{flexDirection:"row"}}>
           <Text style={{paddingTop:22,paddingRight:3, fontSize:24, fontWeight:"800"}}>
                Your
            </Text>
            <Text style={{ fontSize:48, fontWeight:"800", color:colors.red}}>
                Statistics
            </Text>
            </View>
            <View style={{paddingTop:10, alignItems:"center"}}>
                <Image source={require('../utils/statsScreenImage.jpg')}  style={styles.image} />
            </View>
            
        </View>
                <View style={styles.body}>
                <View>
        <Text style={styles.textDailyGoals}>Your mood over the last 7 days</Text>
      <LineChart
        data={{
          labels:  getLabelsSliced(),
          datasets: [
            {
              data: getJournalMoodLast7Days(),
            }
          ],
        }}
        segments={2}
        width={Dimensions.get("window").width-20} // from react-native
        height={200}
        formatYLabel={() => yLabelIterator.next().value}
        bezier
        chartConfig={{
            backgroundColor: "#CE615A",
            backgroundGradientFrom: "#CE615A",
            backgroundGradientTo: '#7d2729',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#755d5f"
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
      />
    </View>
                   
   
                </View>
            </KeyboardAwareScrollView>
            <Footer />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerScreen: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: wp('100%'),
        height: hp('100%'),
    },
    header: {
        paddingTop:44,
        alignItems:'center'
       
    },
    textDailyGoals:{
        fontSize: 16,
        fontWeight: 'bold',
        width: 250,
        height: 19,
        left: 10,
        top: 5,
      },
  
   
    containerImage: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    image: {
        height: 120,
        width: 160
    },
    body: {
        // borderColor: 'red',
        // borderWidth: 5,
    },
    containerButton: {
        alignItems: 'center'
    },
   
    
})

export default StatsScreen;