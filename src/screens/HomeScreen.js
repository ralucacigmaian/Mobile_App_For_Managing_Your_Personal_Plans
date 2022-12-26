import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils/colors';
import { firebase } from '../firebase/config'

const HomeScreen = ({navigation}) => {
    const handleSignOut = () => {
      firebase
      .auth()
        .signOut()
        .then(() => {
          navigation.navigate("SignIn")
        })
        .catch(error => alert(error.message))
    }
  
    return (
      <View style={styles.container}>
        <Text>Email: {firebase.auth().currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddGoal')}>
          <Text style={styles.buttonText}>Add goal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  export default HomeScreen
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
        height: 50,
        width: 343,
        backgroundColor: colors.red,
        borderRadius: 100,
        padding: 15,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })