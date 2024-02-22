import React, { useState, useEffect } from 'react';
import { Button, Image, Modal, View, Platform, TouchableOpacity, Pressable, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../../Firebase/Config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
import EditProfile from './User/EditProfile';

function ImageUpload({ isVisible, onClose, onUpload }) {
    const [image, setImage] = useState(null);
    const [text, settxt] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const firebasestora = async () => {
        // <View style={styles.centeredView}>
        //     <Modal
        //         animationType="slide"
        //         transparent={true}
        //         visible={modalVisible}
        //         onRequestClose={() => {
        //             Alert.alert('Modal has been closed.');
        //             setModalVisible(!modalVisible);
        //         }}>
        //         <View style={styles.centeredView}>
        //             <View style={styles.modalView}>
        //                 <Progress.Pie progress={(text)} size={200} />
        //                 <Pressable
        //                     style={[styles.button, styles.buttonClose]}
        //                     onPress={() => setModalVisible(!modalVisible)}>
        //                     <Text style={styles.textStyle}>Hide Modal</Text>
        //                 </Pressable>
        //             </View>
        //         </View>
        //     </Modal>
        // </View>

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

        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={onClose}
            >
                <View style={styles.centeredView}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={styles.imageView} />}
                    <Button title="Upload Image" onPress={firebasestora} />
                    <View>
                        <Progress.Circle size={150} showsText={true} progress={progress} />
                    </View>
                    <Button title="Close" onPress={onClose} /> 
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    imageView: {
        width: "80%",
        height: "30%",
        margin: 20,
        borderColor: "red",
        borderWidth: 4,
        backgroundColor: "red"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,


    },
    modalView: {
        margin: 20,
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',

        width: "100%",
        height: "100%",

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 50
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})

export default ImageUpload;