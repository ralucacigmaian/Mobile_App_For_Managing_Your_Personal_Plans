import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { withNavigation } from 'react-navigation';

const Footer = ({navigation}) => {

    return (
        <View style={styles.containerFooter}>
            <View>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Home')}>
                    <Feather name="home" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Journaling')}>
                    <Feather name="book-open" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>Journal</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('MyGoals')}>
                    <Octicons name="checklist" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>My Goals</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Stats')}>
                    <AntDesign name="barschart" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>Statistics</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: colors.lightGray4
    }
})

export default withNavigation(Footer);