import React, {useState} from 'react';
import { Pressable, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, Modal } from 'react-native';
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



const MyGoalsEntry = ({navigation, myGoal, deleted, setDeleted}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const categoryTextSize = {
        fontSize: myGoal.value.type === 'Personal growth' ? 8 : 10,
    };

    const categoryColorStyles = {
        backgroundColor: setCategoryColor(myGoal.value.category)
    };

    const typeColorStyles = {
        backgroundColor: myGoal.value.type === 'Unlimited'?'#7FBBB3':'#CE615A'
    };

const deleteMyGoal = () => {
    Alert.alert(
        "Delete goal?",
        "Are you sure you want to delete this goal?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals/"+myGoal.key).remove()
            setDeleted(!deleted)
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    //firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals/"+myGoal.key).remove()
    //setDeleted(!deleted)
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
                <View style={styles.containerActions}>
                    <View style={styles.details}>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                            style={styles.modal}
                        >
                            <View style={styles.containerModal}>
                                <View style={styles.containerContentModal}>
                                    <TouchableOpacity onPress={()=> setModalVisible(false)} activeOpacity={1}>
                                        {myGoal.value.reminder === "No" ? <Text>No reminder</Text> : <Text>Reminder</Text>}
                                        <Text>This goal is due in {myGoal.value.date} at {myGoal.value.time}</Text>
                                        {myGoal.value.description === "" ? null : <Text>Description: {myGoal.value.description}</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity style={styles.detailsContainer} onPress={() => setModalVisible(true)}>
                            <Text style={styles.categoryText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actions}>
                        <View style={styles.edit}>
                            <TouchableOpacity onPress = {() => {navigation.navigate('EditGoal', {myGoal:myGoal})}}>
                                <Ionicons name="create-outline" color={colors.lightGray4} size={20}></Ionicons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.delete}>
                            <TouchableOpacity onPress={() => {deleteMyGoal()}}>
                                <Ionicons name="trash-outline" color={colors.lightGray4} size={20}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        // top:32,
        left:10,
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
        fontSize: 10,
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
    containerDetails: {

    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
    containerContentModal: {
        backgroundColor: 'white',
        margin: 50,
        padding: 20,
        borderRadius: 8,
    },
    textModal: {
        fontSize: 16,
        color: colors.lightGray4
    },
    containerActions: {
        // borderWidth: 10,
        // borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 20,
    },
    actions: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    edit: {
        paddingRight: 10
    },
    details: {
        // borderWidth: 5,
        // borderColor: 'black',
        left: -210,
        paddingBottom: 5
    }
})

export default MyGoalsEntry;