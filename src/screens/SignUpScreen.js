import React, {useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert, Button, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { firebase } from '../firebase/config'

const SignUpScreen = ({navigation}) => {
  const [user, setUser] = useState({ 
    displayName: '',
    email: '', 
    password: '',
    phoneNumber:'',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const registerUser = () => {
    //verifying inputs
    let ok = 1;
    let errorMessage = ''
    if (user.displayName === ''){ ok = 0; errorMessage = 'Please enter your name!'}
    if (user.phoneNumber === ''){ ok = 0; errorMessage = 'Please enter your phone number!'}
    if (user.confirmPassword === '') { ok = 0; errorMessage = 'Please enter confirm password!'}
    if (user.password != user.confirmPassword) {ok = 0; errorMessage = 'Password and confirm password do not match!'}
    if(user.email === '' && user.password === '') {
      ok = 0;
      Alert.alert('Enter details to sign up!')
    } 

    if (ok === 0){
      setError(errorMessage);
    }
    if (ok ===1){
      console.log(user);
      firebase
      .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            res.user.updateProfile({
              displayName: user.displayName,
              phoneNumber: user.phoneNumber
            })

            console.log('User registered successfully!')
                
            setUser({
              displayName: '',
              email: '', 
              password: '',
              phoneNumber:'',
              confirmPassword: ''
            })
            setError('');
            navigation.navigate('SignIn')
          })
          .catch(err => setError(err.message)) 
        console.log(error)     
    }
        
  }

  const ref_input2 = useRef()
  const ref_input3 = useRef()
  const ref_input4 = useRef()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView style={styles.containerScreen}>
                <StatusBar/>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <EvilIcons name="close" size={30} color="gray" onPress={() => navigation.navigate('SignIn')}/>
                    </TouchableOpacity>
                    <Text style={styles.textSignUp}>Sign Up</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
                        value={user.displayName}
                        onChangeText={(text) => setUser({...user, displayName: text})}
                        autoFocus={true}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input2.current.focus()}
                    />
                    <TextInput 
                        placeholder='Email'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                        value={user.email}
                        onChangeText={(text) => setUser({...user, email: text})}
                        ref={ref_input2}
                        autoFocus={false}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input3.current.focus()}
                    />
                    <TextInput 
                        placeholder='Phone Number'
                        textContentType='telephoneNumber'
                        keyboardType='phone-pad'
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                        value={user.phoneNumber}
                        onChangeText={(text) => setUser({...user, phoneNumber: text})}
                        ref={ref_input3}
                    />
                    <TextInput 
                        placeholder='Password'
                        textContentType='newPassword'
                        secureTextEntry={true}
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                        value={user.password}
                        onChangeText={(text) => setUser({...user, password: text})}
                        autoFocus={false}
                        returnKeyType="next"
                        onSubmitEditing={() => ref_input4.current.focus()}
                    />
                    <TextInput 
                        placeholder='Confirm password'
                        textContentType='newPassword'
                        secureTextEntry={true}
                        placeholderTextColor={colors.lightGray3}
                        selectionColor='black'
                        style={styles.textInput}
                        value={user.confirmPassword}
                        onChangeText={(text) => setUser({...user, confirmPassword: text})}
                        ref={ref_input4}
                    />
                      <Text style={styles.errorText}>{error}</Text>
                    <View style={styles.containerImage}>
                        <Image source={require('../utils/signupScreenImage.png')} style={styles.image}/>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={() => registerUser()} style={styles.button}>
                            <Text style={styles.textButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    containerScreen: {
        height: hp('100%'),
        width: wp('100%'),
    },
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
    errorText: {
        fontSize: 15,
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
        paddingVertical: Platform.OS === 'android' ? 20 : 40,
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
});

export default SignUpScreen;    