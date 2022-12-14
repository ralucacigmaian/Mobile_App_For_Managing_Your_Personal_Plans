import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../utils/colors';
import { firebase } from '../firebase/config'

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const ref_input2 = useRef()

    const handleLogin = () => {
        firebase.
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            navigation.navigate('Home')
          }
        })
    
        return unsubscribe
      }, [])
      
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.container}>
                <View style={styles.header}>
                    <StatusBar/>
                    <Text style={styles.text1}>Plan your</Text>
                    <Text style={styles.text2}>Daily</Text>
                    <Text style={styles.text3}>Goals</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../utils/signinScreenImage.jpg')} style={styles.image}/>
                    </View>
                </View>
                <View style={styles.containerTextInput}>
                    <TextInput 
                            placeholder='Email'
                            textContentType='emailAddress'
                            placeholderTextColor={colors.lightGray3}
                            selectionColor='black'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.textInput}
                            autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input2.current.focus()}
                    />
                    <TextInput 
                        placeholder='Password'
                        textContentType='newPassword'
                        secureTextEntry={true}
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.textInput}
                        ref={ref_input2}
                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity 
                        onPress={handleLogin}
                        style={styles.button}
                        >
                        <Text style={styles.textButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.textFooter}>Sign Up</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Text style={styles.textFooter}>Forgot your password?</Text>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: wp('100%'),
        height: hp('100%')
    },
    header: {
        height: Platform.OS === 'android' ? hp('52.5%') : hp('49%')
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
        paddingVertical: Platform.OS === 'android' ? 20 : 40,
        alignItems: 'center',
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
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFooter: {
        color: colors.lightGray4,
        fontSize: 16,
        textDecorationLine: 'underline',
    }
})

export default SignInScreen;