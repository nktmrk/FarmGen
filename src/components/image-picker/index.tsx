import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

import { storage } from '../../config/firebase';
import { ERROR } from '../../styles/colors';

const FarmImage = ({style, setValues, values, error}: any) => {
    const [percent, setPercent] = useState(0);

    useEffect( () => {
        if (Platform.OS !== "web") {
            requestPersmission();
        }
    }, [])

    const requestPersmission = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    }

    const selectImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.cancelled) {
            uploadImageAsync(result.uri);
        }
    }

    const uploadImageAsync = async (uri: string) => {
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

        let r = (Math.random() + 1).toString(36).substring(7);
        const storageRef = ref(storage, `files/${r}.png`);
        // const storageRef = ref(storage, `files/1234.png}`)
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setValues({...values, imgUrl: url });
                });
            }
        ); 
    }

    return (
        <View style={style}>
            <Button 
                mode="contained" 
                onPress={selectImageFromGallery}>
                Pick Image from Gallery
            </Button>
            {percent > 0 && <Text>{percent}% done</Text>}
            {values.imgUrl != '' && <Image style={styles.farmImg} source={{uri: values.imgUrl}} />}
            {error && <Text style={styles.errorMsg}>
                {error}
            </Text>}
        </View>        
    )
}

const styles = StyleSheet.create({
    farmImg: {
        width: 100,
        height: 100,
    },
    errorMsg: {
      color: ERROR,
      marginTop: 10,
      alignSelf: 'center',
      fontSize: 16,
    },
});
  

export default FarmImage;