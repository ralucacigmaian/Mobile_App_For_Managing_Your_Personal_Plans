import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../utils/colors';
import { EvilIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { firebase } from '../firebase/config'
const AddJournalEntryScreen = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [journalEntry, setJournalEntry] = useState({
        description:'',
        date:new Date().toDateString(),
        mood:0
    })

    const handleAddJournalEntry = () =>{
        if(journalEntry.description === '' ) {
            Alert.alert('Please write something in your journal!')
        }
        else{
            
            setJournalEntry({...journalEntry, date:new Date().toDateString()});
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/journals").push(journalEntry);
            navigation.navigate('Journaling');
        }
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
                <StatusBar />
                <View style={styles.header}>
                    <View style={styles.containerBackButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('Journaling')}>
                            <Text style={styles.backButton}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>Dear Diary...</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.containerTextInput}>
                        <TextInput 
                            placeholder='How are you today?'
                            textContentType='none'
                            placeholderTextColor={colors.lightGray3}
                            selectionColor='black'
                            style={styles.textInput}
                            autoFocus={true}
                            multiline={true}
                            numberOfLines={1}
                            value={journalEntry.description}
                            onChangeText={(text) => setJournalEntry({...journalEntry, description: text})}
                        />
                    </View>
                    <View style={styles.containerQuestion}>
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
                                        <Text style={styles.textModal}>Terapeutic journaling can be done by keeping a regular journal to write about events that bring up anger, grief, anxiety or joy that occur in daily life. Once you begin writing, write continously without stopping. Don't worry about spelling or grammar. If you run out of things to say, simply repeat what you have already written.</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <EvilIcons name="question" size={35} color={colors.lightGray4} />
                        </TouchableOpacity>
                        <Text style={styles.question}>What do I write in a journal?</Text>
                    </View>
                    <View style={styles.containerScroll}>
                        <View style={styles.textScroll}>
                            <Text style={styles.questionScroll}>What was your overall mood today?</Text>
                        </View>
                        <View style={styles.scroll}>
                            <View style={styles.scrollText}>
                                <Text style={styles.textDescription}>Bad</Text>
                                <Text style={styles.textDescription}>Ok</Text>
                                <Text style={styles.textDescription}>Good</Text>
                            </View>
                            <Slider
                                style={{width: 260, height: 40}}
                                minimumValue={0}
                                maximumValue={2}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={colors.lightGray4}
                                step={1}
                                value={journalEntry.mood}
                                onValueChange={(value) => setJournalEntry({...journalEntry, mood: value})}
                            />
                            
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress = {() => handleAddJournalEntry()}>
                        <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
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
    },
    backButton: {
        fontSize: 16,
        color: colors.red,
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.93
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    body: {
        paddingTop: 20
    },
    containerTextInput: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 427,
        width: 343,
        fontSize: 16,
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray2,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 16,
    },
    containerQuestion: {
        paddingLeft: 20,
        flexDirection: 'row'
    },
    question: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingTop: 5
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent
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
    containerScroll: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    questionScroll: {
        fontSize: 16,
        paddingTop: 30,
        color: colors.lightGray4
    },
    scrollText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 3
    },
    textDescription: {
        fontSize: 14,
        color: colors.lightGray4,
        fontWeight: '200',
        fontStyle: 'italic'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    button: {
        height: 50,
        width: 343,
        backgroundColor: colors.red,
        borderRadius: 100,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 141,
        paddingRight: 141,
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
})

export default AddJournalEntryScreen;