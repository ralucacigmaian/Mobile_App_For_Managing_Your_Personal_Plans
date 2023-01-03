import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { firebase } from '../firebase/config'

const AddGoalScreen = ({navigation}) => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const data = [
        {key: '1', value: 'Family'},
        {key: '2', value: 'Friends'},
        {key: '3', value: 'Career'},
        {key: '4', value: 'Health'},
        {key: '5', value: 'Personal growth'},
    ]


    const [goal, setGoal] = useState({ 
        title: '',
        type: 'Daily', 
        reminder: 'No',
        date:'',
        time: '',
        category:'Personal growth',
        description:'',
        completed:0
      });

      const handleAddGoal = () => {
        if(goal.title === '' ) {
            Alert.alert('Please enter a title for your goal!')
        }
        else{
            if (goal.type === 'Unlimited')
                setGoal({...goal, date:'', time:''});
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals").push(goal);
            navigation.navigate('Home');
        }

        
        
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setGoal({...goal, date:fDate, time: tempDate.getHours()+":"+tempDate.getMinutes()});
        if (mode === 'date') {
            setText(fDate);
        }
        else {
            setText(fTime);
        }
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const renderDate = () => {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.containerPickDate}>
                    <Feather name="calendar" size={30} color={colors.lightGray4} />
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='compact'
                        onChange={onChange}
                        accentColor={colors.lightGray4}
                        themeVariant="light"
                        disabled={goal.type === 'Daily'? false : true}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.containerPickDate}>
                    <TouchableOpacity onPress={() => showMode('date')}>
                        <Feather name="calendar" size={30} color={colors.lightGray4} />
                    </TouchableOpacity>
                    <Text style={styles.textDateAndroid}>{text}</Text>
                    {show && (
                        <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='compact'
                        onChange={onChange}
                        disabled={goal.type === 'Daily'? false : true}
                    />
                    )}
                </View>
            )
        }
    }

    const renderTime = () => {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.containerPickDate}>
                    <Feather name="clock" size={30} color={colors.lightGray4} />
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={date}
                        is24Hour={true}
                        display='compact'
                        onChange={onChange}
                        accentColor={colors.lightGray4}
                        themeVariant="light"
                        disabled={goal.type === 'Daily'? false : true}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.containerPickDate}>
                    <TouchableOpacity onPress={() => showMode('time')}>
                        <Feather name="clock" size={30} color={colors.lightGray4} />
                    </TouchableOpacity>
                    <Text style={styles.textDateAndroid}>{text}</Text>
                    {show && (
                        <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='compact'
                        onChange={onChange}
                        disabled={goal.type === 'Daily'? false : true}
                    />
                    )}
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
                <StatusBar/>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.backButton} onPress={() => navigation.navigate('Home')}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.textNewGoal}>New Goal</Text>
                </View>
                <View style={styles.container}>
                    <TextInput 
                        placeholder='Title'
                        textContentType='none'
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                        autoFocus={true}
                        value={goal.title}
                        onChangeText={(text) => setGoal({...goal, title: text})}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textType}>Type</Text>
                    </View>
                </View>
                <View style={styles.containerSegmentedButton}>
                    <SegmentedControl
                        values={['Unlimited', 'Daily']}
                        selectedIndex={1}
                        tintColor={colors.red}
                        color={colors.lightGray4}
                        onChange={(event) => {
                            setGoal({...goal, type: event.nativeEvent.value});
                          }}
                    />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textReminder}>Reminder</Text>
                </View>
                <View style={styles.containerSegmentedButton}>
                    <SegmentedControl
                        values={['Yes', 'No']}
                        selectedIndex={1}
                        tintColor={colors.red}
                        color={colors.lightGray4}
                        onChange={(event) => {
                            setGoal({...goal, reminder: event.nativeEvent.value});
                          }}
                        enabled={goal.type==='Daily'?true:false}
                    />
                </View>
                <View style={styles.containerDatePicker}>
                    <Text style={styles.textDate}>Date</Text>
                    {renderDate()}
                    <Text style={styles.textDate}>Time</Text>
                    {renderTime()}
                </View>
                <View style={styles.containerCategory}>
                    <Text style={styles.textCategory}>Category</Text>
                    <SelectDropdown
                        data={data}
                        onSelect={(selectedItem, index) => {
                            setGoal({...goal, category: selectedItem.value});
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.value;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.value;
                        }}
                        defaultButtonText='Select Category'
                        buttonStyle={styles.dropdown}
                        buttonTextStyle={styles.textCategoryDropdown}
                        renderDropdownIcon={isOpened => {
                            return <Feather name="arrow-down" size={20} color={colors.lightGray4} />;
                        }}
                        dropdownStyle={styles.dropdownList}
                        rowTextStyle={styles.textCategoryDropdown}
                        search={true}
                        searchInputStyle={styles.dropdownList}
                        searchPlaceHolder='Search Category'
                        searchInputTxtColor={colors.lightGray4}
                        renderSearchInputLeftIcon={isSearched => {
                            return <EvilIcons name="search" size={24} color={colors.lightGray4} />;
                        }}
                    />
                </View>
                <View style={styles.containerDescription}>
                    <Text style={styles.textCategory}>Description</Text>
                    <AutoGrowingTextInput
                        style={styles.textInput}
                        placeholder='Optional'
                        selectionColor='black'
                        value={goal.description}
                        onChangeText={(text) => setGoal({...goal,description: text})}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleAddGoal()}>
                        <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerScreen: {
        height: hp('100%'),
        width: wp('100%'),
    },
    header: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        fontSize: 16,
        color: colors.red,
    },
    textNewGoal: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 0.737
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 343,
        fontSize: 16,
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray2,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 16
    },
    containerText: {
        alignSelf: 'flex-start',
        paddingHorizontal: 27,
    },
    textType: {
        fontSize: 16,
        color: colors.lightGray4,
    },
    textReminder: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    containerSegmentedButton: {
        paddingHorizontal: 35,
    },
    containerDatePicker: {
        alignSelf: 'flex-start',
        paddingHorizontal: 37,
    },
    textDate: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingTop: 20,
        paddingVertical: 10,
    },
    textDateAndroid: {
        fontSize: 23,
        color: colors.lightGray4,
    },
    containerPickDate: {
        flexDirection: 'row',
    },
    containerCategory: {
        paddingHorizontal: 37,
        paddingVertical: 20,
    },
    textCategory: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingVertical: 10,
    },
    dropdown: {
        height: 55,
        width: 343,
        fontSize: 16,
        backgroundColor: colors.lightGray,
        borderColor: colors.lightGray2,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 16
    },
    textCategoryDropdown: {
        fontSize: 16,
        color: colors.lightGray3,
    },
    dropdownList: {
        fontSize: 16,
        backgroundColor: colors.lightGray2,
        borderColor: colors.lightGray2,
        borderWidth: 1,
        borderRadius: 8,
        color: colors.lightGray4,
    },
    containerDescription: {
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        paddingLeft: 37
    },
    footer: {
        paddingVertical: 35,
        paddingLeft: 37,
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

export default AddGoalScreen;