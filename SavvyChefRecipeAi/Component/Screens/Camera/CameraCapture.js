import React, { useState, useEffect, useRef, useContext } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import CameraButton from "./CameraButton";
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';

import GlobalContext from "../Navigation/GlobalContext";

export default function CameraCapture({ navigation }) {
    const { setCameraPictureCapture } = useContext(GlobalContext);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
            await MediaLibrary.requestPermissionsAsync();
        })();
    }, []);

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const data = await cameraRef.current.takePictureAsync();
            setImage(data.uri);
        }
    };

    const saveImage = async () => {
        if (image) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                
                navigation.navigate('editProfile', setCameraPictureCapture(asset.uri));

            } catch (error) {
                console.error("Error saving image:", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {!image ? (
                <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
                    <View style={styles.cameraControls}>
                        <CameraButton icon="camera-reverse-outline" onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} iconSet="Ionicons" />
                        <CameraButton icon="flash" color={flash === Camera.Constants.FlashMode.off ? '#EE7214' : '#ffffff'} onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)} iconSet="MaterialCommunityIcons" />
                        <CameraButton icon="camera" onPress={takePicture} iconSet="Entypo" />
                    </View>
                </Camera>
            ) : (
                <Image source={{ uri: image }} style={styles.camera} />
            )}

            <View style={styles.bottomControls}>
                {image && (
                    <View style={styles.iconRetakeAndSave}>
                        <CameraButton icon="camera-reverse-outline" onPress={() => setImage(null)} iconSet="Ionicons" />
                        <CameraButton icon="check" onPress={saveImage} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        justifyContent: "center",
        margin: 10,
    },
    camera: {
        flex: 3,
        borderRadius: 20,
    },
    cameraControls: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingBottom: 20,
        borderWidth: 2,

    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: "center",
        margin:10,
        
    },
    iconRetakeAndSave: {
        flexDirection: "row",
        width:"50%",
        justifyContent:"space-around"
    },
});