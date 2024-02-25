

import React from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, Image, View, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native'

const FirebaseStorage = () => {
    const firebasestora = async (image) => {

        if (!image) {
            console.error("No image selected");
            return;
        }
    
        const response = await fetch(image);
        const blob = await response.blob();
    
        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        }
    
        // Upload file and metadata to the object 'images/' with a timestamp
        const storageRef = ref(storage, 'images/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        setModalVisible(true);
                        settxt((progress / 100).toFixed(2));
                        setProgress((progress / 100).toFixed(2));
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
    
                    // ...
    
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    onUpload(downloadURL);
    
                });
            }
        );
    }
  return (
  <View></View>
  )
}

export default FirebaseStorage