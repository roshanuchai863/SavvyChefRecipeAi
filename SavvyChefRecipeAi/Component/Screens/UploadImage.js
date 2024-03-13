import React, { useState, useEffect } from 'react';
import { Button, Image, Modal, View, Platform, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../../Firebase/Config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
import GbStyle from "../../Global/Styles"



function ImageUpload({ isVisible, onClose, onUpload , onCameraCapture}) {



    const [image, setImage] = useState(GbStyle.UploadFileIcon);
    const [text, settxt] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDefaultImage, setIsDefaultImage] = useState(true);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {

            setImage(result.assets[0].uri);

            console.log("Image Url..", image)
            setIsDefaultImage(false);

            onUpload(result.assets[0].uri);

            console.warn("setdefua", isDefaultImage)
        }

    };
    useEffect(() => {

        console.log("Current isDefaultImage state: ", isDefaultImage);
    }, [isDefaultImage]);

   


    return (
        <View>
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={onClose}
                >

                    <View style={styles.centeredView}>


                        <View style={{ width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {/* <Image source={GbStyle.UploadFileIcon} resizeMode='contain' style={styles.uploadFileIcon} />  */}
                            <Text style={[GbStyle.mainTitle, { fontSize: 25, color: "#000000" }]}>Upload Your Image Here</Text>
                            <Text style={[GbStyle.NormalText, { color: "#000000", flexWrap: "wrap" }]}>Browse your files to select an image, or take a new picture using your camera.</Text>

                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", borderWidth: 4, borderColor: "#EE7214", padding: 5, margin: 5, height: "30%", width: "74%", }}>
                            <Image
                                source={typeof image === 'string' ? { uri: image } : image}
                                resizeMode="cover"
                                style={[
                                    isDefaultImage ? styles.defaultImageStyle : styles.newImageStyle 
                                ]}
                            />
                        </View>



                        <View style={styles.uploadIcons}>

                            <TouchableOpacity onPress={pickImage}>
                                <View style={styles.UploadInerIcons}>
                                    <View style={{ borderWidth: 2, width: 90, height: 90, justifyContent: 'center', alignItems: "center", borderRadius: 50, borderColor: "#EE7214" }}>
                                        <Image source={GbStyle.UploadImageIcon} resizeMode='cover' style={styles.ImageUploadIcon} />
                                    </View>
                                    <Text style={[GbStyle.mainTitle, { fontSize: 16, color: "#000000" }]}>Browse File</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onCameraCapture}>
                                <View style={styles.UploadInerIcons}>
                                    <View style={{ borderWidth: 2, width: 90, height: 90, justifyContent: 'center', alignItems: "center", borderRadius: 50, borderColor: "#EE7214" }}>
                                        <Image source={GbStyle.dualCameraicon} resizeMode='contain' style={styles.ImageUploadIcon} />
                                    </View>
                                    <Text style={[GbStyle.mainTitle, { fontSize: 16, color: "#000000" }]}>Take Photo</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={pickImage}>
                                <View style={styles.UploadInerIcons}>
                                    <View style={{ borderWidth: 2, width: 90, height: 90, justifyContent: 'center', alignItems: "center", borderRadius: 50, borderColor: "#EE7214" }}>
                                        <Image source={GbStyle.DeleteBinIcon} resizeMode='contain' style={styles.ImageUploadIcon} />
                                    </View>
                                    <Text style={[GbStyle.mainTitle, { fontSize: 16, color: "#000000" }]}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Button title="Close" onPress={onClose} />


                    </View>
                </Modal>
            </ScrollView>

        </View>


    );
}


const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        borderWidth: 2,
        backgroundColor: "#fff",
        paddingTop: 60
    },

    uploadFileIcon: {
        width: "100%",
        height: "100%"
    },

    ImageUploadIcon: {
        width: 50,
        height: 50,

    },
    defaultImageStyle: {
        // Default image style
        height: "50%",
        width: "50%",
padding:100

    },
    newImageStyle: {
        // New image style after selection
        height: "100%",
        width: "100%",
        padding: 1

    },


    uploadIcons: {

        flexDirection: "row",
        width: "85%",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 20,


    },

    UploadInerIcons: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
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