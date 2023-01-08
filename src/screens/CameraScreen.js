import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { firebase } from '../firebase/config';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function CameraScreen({navigation}) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
        uploadImageAsync(photo.uri)
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        navigation.navigate('AddJournalEntry')
      });
    };


    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
    
        const ref = firebase.storage().ref('users/' + firebase.auth().currentUser.uid).child("journal"+new Date().toDateString());
        const snapshot = await ref.put(blob);
        blob.close();
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.text}>Your photo of the day!</Text>
        </View>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.actions}>
          <TouchableOpacity onPress={sharePic}>
            <Feather name="share" size={30} color="black" />
          </TouchableOpacity>
          {hasMediaLibraryPermission ? 
          <TouchableOpacity onPress={savePhoto}>
            <Ionicons name="ios-save-outline" size={32} color="black" />
          </TouchableOpacity>:
          undefined}
          <TouchableOpacity onPress={() => setPhoto(undefined)}>
            <MaterialCommunityIcons name="camera-retake-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}  type={type}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AddJournalEntry')} style={styles.backButton}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <View style={styles.flipCamera}>
          <TouchableOpacity onPress={() => {setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);}}>
            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.takePhoto}>
          <View style={styles.camera}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', paddingTop: 15}} onPress={takePic}>
              <Feather name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'center',
    flex: 1,
    width: widthPercentageToDP('95%'),
    borderRadius: 15
  },
  header: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // borderWidth: 5,
    // borderColor: 'red',
    backgroundColor: colors.transparent,
    height: 100
  },
  backButton: {
    paddingLeft: 10,
    paddingTop: 5
  },
  footer: {
    backgroundColor: colors.transparent,
    height: 100,
    flexDirection: 'row'
  },
  flipCamera: {
    paddingLeft: 10,
    paddingTop: 30,
    // borderWidth: 5,
    // borderColor: 'red',
    width: 60
  },
  takePhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 5,
    // borderColor: 'red',
    flex: 0.8,
    paddingTop: 20,
  },
  camera: {
    width: 70,
    height: 70,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: 'white',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  text: {
    fontSize: 20,
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  }
});