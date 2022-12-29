import React, {useState} from 'react';
import { Pressable, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase/config'


const setCategoryColor = (categoryName) =>{             //get different colours depending on category
    if (categoryName === 'Family')
        return '#FFCF8D'
    //if (categoryName === 'Fun')
        //return '#506970'
    if (categoryName === 'Career')
        return '#E7D6CC'
    if (categoryName === 'Friends')
    return '#F4C4FB'
    if (categoryName === 'Health')
    return '#3583EF'
    if (categoryName === 'Personal growth')
    return '#8B5FBF'
    
}

function MyCheckbox({ onChange, checked }) {                                    //checkbox helping function
    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onChange}>
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </Pressable>
    );
  }

const DailyGoalEntry = ({key,dailyGoal, completed, setCompleted}) => {
    const categoryColorStyles = {
        backgroundColor: setCategoryColor(dailyGoal.value.category)
    };

    const [checked, setChecked] = useState(false);
    const handleCheck = () =>{
        if (checked === false) //goal is completed
        {
            firebase.database()
                .ref('users/' + firebase.auth().currentUser.uid + "/goals/"+dailyGoal.key)
                    .update({completed:1})
            setCompleted(completed+1);
        }
        else
        {
            firebase.database()
                .ref('users/' + firebase.auth().currentUser.uid + "/goals/"+dailyGoal.key)
                    .update({completed:0})
            setCompleted(completed-1);
        }
        setChecked(!checked)
    }
return(
    <View style={styles.container}>
         <View style={styles.body}>
                <View style={styles.containerTitleText}>
                    <Text style={styles.goalTitle}>{dailyGoal.value.title}</Text>
                </View>
                <View style={[styles.categoryContainer, categoryColorStyles]}>
                    <Text style={styles.categoryText}>{dailyGoal.value.category.toUpperCase()}</Text>
                </View>
            <View style={{paddingLeft:10, flexDirection:"row"}}>
                <MyCheckbox onChange={() => handleCheck()} checked={checked} />
                    {checked?
                        <View style={styles.doneContainer}>
                            <Text style={styles.checkboxLabel}>DONE</Text>
                        </View>
                            : 
                        <View style={styles.completeContainer}>
                            <Text style={styles.checkboxLabel}>COMPLETE GOAL</Text>
                        </View>
                    }
            </View>     
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },

    body:{
        width: 349,
        height: 66,
        backgroundColor: "#FFFFFF",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: 'rgba(100, 100, 111, 0.5)',
        borderRadius:5,
    },
    containerTitleText:{
        paddingLeft:18,
    },
    goalTitle:{
        fontSize:14,
        fontWeight: 'bold',
        color: '#7D7D7D'
        
    },
    categoryContainer:{
        width:64,
        height: 16,
        left: 280,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"blue",
        borderRadius:100,
    },
    categoryText:{
        fontSize:10,
        color:"white",
        fontWeight:"bold"
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CE615A',
        backgroundColor: 'transparent',
      },
      checkboxChecked: {
        backgroundColor: '#CE615A',
      },
      checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight:"bold",
        color:"white"
      },
      doneContainer:{
        width:64,
        height: 22,
        left:10,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"#7FBBB3",
        borderRadius:100,
    },
    completeContainer:{
        width:146,
        height: 22,
        left:10,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"#FFCF8D",
        borderRadius:100,
    },
})

export default DailyGoalEntry;