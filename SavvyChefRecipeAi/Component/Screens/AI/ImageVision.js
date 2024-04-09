


import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Clarifai_API_KEY } from "@env"
import Edaman from './Edaman';
import { useNavigation } from '@react-navigation/native';

const ImageVision = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [labelShowModal, SetlabelShowModal] = useState(false);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
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

      const apiKey = Clarifai_API_KEY;
      const apiURL = 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs';

      const base64ImageData = await fetch(imageUri);
      const base64Image = await base64ImageData.blob();
      const base64ImageString = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(base64Image);
      });

      const requestData = {
        inputs: [
          {
            data: {
              image: {
                base64: base64ImageString.split(',')[1],
              },
            },
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const predictions = apiResponse.data.outputs[0].data.concepts;
      let maxScore = 0;
      let correctLabel = '';

      predictions.forEach(prediction => {
        if (prediction.value > maxScore) {
          maxScore = prediction.value;
          correctLabel = prediction.name;
        }
      });

      setLabels([correctLabel]);


      console.log('Correct Label:', correctLabel);
    } catch (error) {
      console.error('Error analyzing image: ', error);
      alert('Error analyzing image. Please try again later');
    } finally {
      setShowModal(false);
      SetlabelShowModal(true);
    }
  };





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







      <Modal
        visible={labelShowModal}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.labelsContainer}>
              {labels.map((label, index) => (
                <View>
                  <Text key={index} style={styles.labelText}>
                    The recognized ingredient is:
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 40, textAlign: "center" }}> {label}</Text>
                </View>
              ))}
            </View>

            {labels.length >= 1 ? (
              <View style={styles.recipeSearchButton}>
                <TouchableOpacity onPress={() => {
                  SetlabelShowModal(false);
                  navigation.navigate("Edaman" ,{
                    label:labels
                  });
                }}
                  style={styles.Modalbutton}>

                  <MaterialCommunityIcons name="magnify" size={28} color="#FFF" />
                  <Text style={styles.ModalbuttonText}>Search Recipe</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { SetlabelShowModal(false) }} style={[styles.Modalbutton, { margin: 20 }]}>
                  <MaterialCommunityIcons name="camera-retake-outline" size={28} color="#FFF" />
                  <Text style={styles.ModalbuttonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )
            }


          </View>
        </View>
      </Modal>



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
    fontSize: 20,
    marginVertical: 4,
    color: '#000',
    fontWeight: "bold"
  },
  modalContainer: {
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
  recipeSearchButton: {
    marginVertical: 40,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10

  },
  Modalbutton: {
    backgroundColor: '#EE7214',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 30,
    width: 200,
    alignItems: "center",
    justifyContent: 'center',
  },

  ModalbuttonText: {
    color: '#FFF',
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default ImageVision;

