import {React, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../utils/colors';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { firebase } from '../firebase/config'
const AddGoalScreen = () => {
    const [goal, setGoal] = useState({ 
        title: 'My goal',
        type: 'Day', 
        date: '25/12/2022',
        time:'17:03pm',
        reminder:0, //0 or 1
        category:'idk',
        description: 'idk'
      });
    
    const handleAddGoal = () =>{
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/goals").push(goal);
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View>
                <StatusBar/>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.backButton}>Back</Text>
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
                    />
                    <Text style={styles.textDate}>Date</Text>
                    <Calendar
                    // Initially visible month. Default = now
                    initialDate={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                    console.log('selected day', day);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                    console.log('selected day', day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                    console.log('month changed', month);
                    }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={direction => <Arrow />}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter
                    renderHeader={date => {
                    /*Return JSX*/
                    }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                    theme={{
                        backgroundColor: '#black',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                      }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        paddingVertical: 20,
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
        alignSelf: 'left',
        paddingHorizontal: 27,
    },
    textType: {
        fontSize: 16,
        color: colors.lightGray4
    },
    containerSegmentedButton: {
        paddingHorizontal: 35,
    },
    textDate: {
        fontSize: 16,
        color: colors.lightGray4,
        paddingTop: 20,
    }
})

export default AddGoalScreen;