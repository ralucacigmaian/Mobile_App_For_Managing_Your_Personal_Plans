import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';

const SignInScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                <StatusBar/>
                <Text style={styles.text1}>Plan your</Text>
                <Text style={styles.text2}>Daily</Text>
                <Text style={styles.text3}>Goals</Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../utils/signinScreenImage.jpg')} style={styles.image}/>
                </View>
                <View style={styles.containerTextInput}>
                    <TextInput 
                            placeholder='Name'
                            textContentType='name'
                            placeholderTextColor={colors.lightGray3}
                            selectionColor='black'
                            style={styles.textInput}
                    />
                    <TextInput 
                        placeholder='Password'
                        textContentType='newPassword'
                        secureTextEntry={true}
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.textFooter}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textFooter}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    text3: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.red,
    },
    imageContainer: {
        paddingTop: 30,
    },
    image: {
        height: 258,
        width: 407,
    },
    containerTextInput: {
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
    containerButton: {
        paddingVertical: 40,
        alignItems: 'center'
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 25
    },
    textFooter: {
        color: colors.lightGray4,
        fontSize: 16,
        textDecorationLine: 'underline',
    }
})

export default SignInScreen;