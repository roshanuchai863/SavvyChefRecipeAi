import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { GoogleVision_API_KEY } from "@env"

import { Secret_key, pk, } from '@env'


const ImageVision = () => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }

      console.log(result);
    } catch (error) {
      console.error('Error picking Image: ', error);
    }
  };


  const analyzeImage = async () => {

    setShowModal(true);
    try {
      if (!imageUri) {
        alert('Please select an image first!!!');
        return;
      }

      // replace your google cloud vision api key with your actual API key
      const apiKey = GoogleVision_API_KEY;
      // const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      const apiURL = `POST https://vision.googleapis.com/v1/images:annotate=${apiKey}`;

      // read the image file from local URI and convert it to base64
      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
      console.log("google vision:", apiResponse.data.responses[0]);

    } catch (error) {
      console.error('Error analyzing image: ', error);
      alert('Error analyzing image. Please try again later');
    }
    finally{
      setShowModal(false);
    }

  };



  console.log("Publishable_keyOm", pk)
  console.log("Publishable_keyOm", Secret_key)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>What's in your image?</Text>
      </View>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons name="image-plus" size={100} color="#cccccc" />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <MaterialCommunityIcons name="camera" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Choose an image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={analyzeImage} style={styles.button}>
          <MaterialCommunityIcons name="magnify" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Analyze Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.labelText}>
            {label.description}
          </Text>
        ))}
      </View>


      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>Identifying Image...</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderWidth: 2,
    borderColor: '#eeeeee',
    borderRadius: 20,
    marginVertical: 30,
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#EE7214',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  labelsContainer: {
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
},
modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default ImageVision;