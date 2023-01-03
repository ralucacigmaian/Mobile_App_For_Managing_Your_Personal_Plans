import React, {useState} from 'react';
import { Pressable, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase/config'
import { checkPluginState } from 'react-native-reanimated/lib/reanimated2/core';
import { colors } from '../utils/colors';


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



const MyGoalsEntry = ({key, myGoal, deleted, setDeleted}) => {
    
    const categoryColorStyles = {
        backgroundColor: setCategoryColor(myGoal.value.category)
    };

    const typeColorStyles = {
        backgroundColor: myGoal.value.type === 'Unlimited'?'#7FBBB3':'#CE615A'
    };

const deleteMyGoal = () => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals/"+myGoal.key).remove()
    setDeleted(!deleted)
}
   
return(
    <View style={styles.container}>
         <View style={styles.body}>
                <View style={styles.containerTitleText}>
                    <Text style={styles.goalTitle}>{myGoal.value.title}</Text>
                </View>
                <View style={[styles.categoryContainer, categoryColorStyles]}>
                    <Text style={styles.categoryText}>{myGoal.value.category.toUpperCase()}</Text>
                </View>
                <View style={[styles.typeContainer, typeColorStyles]}>
                    <Text style={styles.categoryText}>{myGoal.value.type.toUpperCase()}</Text>
                </View>
                <View style={{paddingRight:1200, flexDirection:"row"}}>
                <TouchableOpacity style={styles.detailsContainer}>
                    <Text style={styles.categoryText}>Details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editButton}>
                <Ionicons name="create-outline"></Ionicons>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => {deleteMyGoal()}}>
                    <Ionicons name="trash-outline"></Ionicons>
                </TouchableOpacity>
            </View>     
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

    body:{
        width: 349,
        height: 112,
        backgroundColor: "#FFFFFF",
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        shadowOpacity: 3,
        shadowRadius: 10,
        // elevation: 15,
        // shadowColor: 'rgba(100, 100, 111, 0.5)',
        shadowColor: colors.lightGray3,
        borderRadius:10,
    },
    containerTitleText:{
        paddingLeft:18,
    },
    goalTitle:{
        paddingTop:8,
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
    typeContainer:{
        width:64,
        height: 16,
        left: 280,
        top:5,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"blue",
        borderRadius:100,
    },
    detailsContainer:{
        width:64,
        height: 16,
        backgroundColor:'#CE615A',
        top:32,
        left:16,
        alignItems: "center",
        justifyContent:"center",
        borderRadius:100,
    },
    editButton:{
        width:24,
        height: 24,
        top:28,
        left:220,
        alignItems: "center",
        justifyContent:"center",
    },
    deleteButton:{
        width:24,
        height: 24,
        top:28,
        left:230,
        alignItems: "center",
        justifyContent:"center",
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

export default MyGoalsEntry;