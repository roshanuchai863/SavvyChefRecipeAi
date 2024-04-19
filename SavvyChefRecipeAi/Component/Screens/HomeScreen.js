import React, { useEffect, useState , useContext,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';  
import GbStyle from "../../Global/Styles";
import ImageUpload from './UploadImage';
import GlobalContext from './Navigation/GlobalContext';






const HomeScreen = ({ navigation }) => {
  const { userData, setCameraPictureCapture, CameraPictureCapture } = useContext(GlobalContext);

  return (
    <ImageBackground source={GbStyle.HomeBgImage} style={styles.MainContainer} blurRadius={4}>
      <SafeAreaView style={{ flex: 1 }} >
        <View style={styles.ContentContainer}>
        

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#EE7214' }]}
              onPress={() => navigation.navigate('imageVision')}
            >
              <Icon name="robot" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Ask AI with Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#EE7214' }]}
              onPress={() => navigation.navigate('Edaman')}
            >
              <Icon name="search" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Search by Name</Text>
            </TouchableOpacity>

          
          </View>
        </View>


      </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  ContentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
   
  },
  description: {
    textAlign: 'center',
    fontSize: 19,
    color: '#fff',
    paddingHorizontal: 10,
    marginBottom: 30,
    lineHeight: 26,
    fontWeight: "700"

  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: 50,
    paddingTop: 5
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HomeScreen;