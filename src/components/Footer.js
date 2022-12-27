import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const Footer = () => {
    return (
        <View style={styles.containerFooter}>
            <View>
                <TouchableOpacity style={styles.container}>
                    <Feather name="home" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container}>
                    <Feather name="book-open" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>Journal</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container}>
                    <Octicons name="checklist" size={24} color={colors.lightGray4} />
                    <Text style={styles.text}>My Goals</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.container}>
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

export default Footer;