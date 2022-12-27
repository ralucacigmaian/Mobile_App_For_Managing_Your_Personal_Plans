import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import JournalEntry from '../components/JournalEntry';
import Footer from '../components/Footer';

const JournalingScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
                <StatusBar />
                <View style={styles.header}>
                    <View style={styles.containerText}>
                        <Text style={styles.textDear}>Dear</Text>
                        <Text style={styles.textDiary}>Diary</Text>
                    </View>
                    <View style={styles.containerImage}>
                        <Image source={require('../utils/journalingScreenImage.jpg')} style={styles.image}/>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>How are you today?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerJournalEntry}>
                        <Text style={styles.textJournalEntry}>Past journal entries</Text>
                        <JournalEntry />
                        <JournalEntry />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textDear: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    textDiary: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.red
    },
    containerImage: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    image: {
        height: 145,
        width: 238
    },
    body: {
        paddingTop: 50,
    },
    containerButton: {
        alignItems: 'center'
    },
    button: {
        height: 50,
        width: 343,
        backgroundColor: colors.red,
        borderRadius: 100,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 95,
        paddingRight: 95,
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    containerJournalEntry: {
        paddingTop: 50,
        // paddingLeft: 37,
    },
    textJournalEntry: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default JournalingScreen;