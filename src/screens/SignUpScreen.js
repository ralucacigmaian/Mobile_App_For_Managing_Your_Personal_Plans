import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
// import TextInput from "react-native-text-input-interactive";
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const SignUpScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View>
                <StatusBar/>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <EvilIcons name="close" size={30} color="gray"/>
                    </TouchableOpacity>
                    <Text style={styles.textSignUp}>Sign Up</Text>
                    <TouchableOpacity>
                        <Text style={styles.textSignIn}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TextInput 
                        placeholder='Name'
                        textContentType='name'
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                    />
                    <TextInput 
                        placeholder='Email'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                    />
                    <TextInput 
                        placeholder='Phone Number'
                        textContentType='telephoneNumber'
                        keyboardType='phone-pad'
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
                    <TextInput 
                        placeholder='Confirm password'
                        textContentType='newPassword'
                        secureTextEntry={true}
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                    />
                    <View style={styles.containerImage}>
                        <Image source={require('../utils/signupScreenImage.png')} style={styles.image}/>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.textPassword}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    textSignUp: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textSignIn: {
        fontSize: 19,
        color: colors.red,
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
    containerImage: {
        paddingVertical: 40,
    },
    image: {
        width: 213,
        height: 152,
    },
    containerButton: {
        paddingVertical: 40,
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
    textPassword: {
        color: colors.lightGray4,
        fontSize: 16,
        textDecorationLine: 'underline'
    }
});

export default SignUpScreen;    