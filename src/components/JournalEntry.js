import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

const JournalEntry = ({key, journal}) => {

    
    const moodColorStyles = {
        backgroundColor: setMoodColor(journal.value.mood)
    };

    return (
        <View style={styles.container}>
            <View style={[styles.body,moodColorStyles]}>
                <View style={styles.editOptions}>
                    <TouchableOpacity>
                        <Entypo name="dots-three-vertical" size={17} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textInput}>{journal.value.description.slice(0,145)}{journal.value.description.length > 145 ? '...' : ''}</Text>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.textDate}>Added on {journal.value.date}.</Text>
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
    }
})

export default JournalEntry;