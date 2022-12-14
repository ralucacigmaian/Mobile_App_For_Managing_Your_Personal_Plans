import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native';
import { firebase } from '../firebase/config'
import { colors } from '../utils/colors';
import { Entypo } from '@expo/vector-icons';

const setMoodColor = (mood) =>{             //get different colours depending on category
    if (mood === 0)
        return '#CE615A'
    //if (categoryName === 'Fun')
        //return '#506970'
    if (mood === 1)
        return '#FFCF8D'
    if (mood === 2)
    return '#7FBBB3'
    
}

const JournalEntry = ({journal}) => {

    
    const moodColorStyles = {
        backgroundColor: setMoodColor(journal.value.mood)
    };

    const [modalVisible, setModalVisible] = useState(false);


    const [imageUrl, setImageUrl] = useState(undefined);

    useEffect(() => {
        firebase.storage()
        .ref('users/' + firebase.auth().currentUser.uid).child("journal"+journal.value.date+".jpg") //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            setImageUrl(url);
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }, []);


    return (
        <View style={styles.container}>
            <View style={[styles.body,moodColorStyles]}>
                <View style={styles.editOptions}>
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
                                    <Text style={styles.textModal}>Your photo of the day!</Text>
                                </TouchableOpacity>
                                {imageUrl!==undefined?<Image style={{height: 200, width: 200}} source={{uri: imageUrl}} />:<View></View>}
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Entypo name="dots-three-vertical" size={17} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textInput}>{journal.value.description.slice(0,145)}{journal.value.description.length > 145 ? '...' : ''}</Text>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.textDate}>Added on {journal.value.date}</Text>
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
        shadowColor: colors.lightGray3,
        shadowRadius: 10,
        shadowOpacity: 3,
    },
    body: {
        height: 131,
        width: 334,
        backgroundColor: colors.teal,
        borderRadius: 10,
    },
    editOptions: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 5,
        paddingRight: 1
    },
    containerText: {
        paddingHorizontal: 10
    },
    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    containerDate: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingRight: 5,
        flex: 1
    },
    textDate: {
        fontSize: 15,
        fontWeight: '200',
        color: 'white'
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textModal: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingBottom: 10
    },
})

export default JournalEntry;