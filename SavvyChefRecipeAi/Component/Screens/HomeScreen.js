import React, { useState, useEffect ,useContext} from 'react';
import { Button, Image, View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import GbStyle from "../../Global/Styles"
import ImageUpload from './UploadImage';

import GlobalContext from "./Navigation/GlobalContext";

const Home = ({ navigation }) =>{

  const { userData, setCameraPictureCapture, CameraPictureCapture } = useContext(GlobalContext);

  const [image, setImage] = useState(GbStyle.panfry);
  const [modalVisible, setModalVisible] = useState(false);

  // Navigate to camera for picture capture
  function CameraCaptionNavigation() {
    setModalVisible(false)
    navigation.navigate('Camera');
  }
  const handleImageUpload = (url) => {
    setCameraPictureCapture(url);
    setModalVisible(false);
    navigation.navigate('Image');
  };


  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        
          <View style={styles.centeredView}>
            <View style={{ height: "35%", width: "80%", marginLeft: 50, marginBottom: 20 }}>
              <Image
                source={image}
                resizeMode="contain"
                style={[
                  styles.defaultImageStyle
                ]}
              />
            </View>
            <View style={{ width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 0 }}>
              <Text style={[GbStyle.mainTitle, { fontSize: 31, color: "#000000", textAlign: 'center', marginBottom: 10, }]}>Discover Recipes
              </Text>
              <Text style={[GbStyle.NormalText, { color: "#000000", textAlign: "justify", marginBottom: 20, width: "100%", lineHeight: 26 }]}>
                Ready to find your next favorite recipe? Upload an image of a food item or ingredient,
                and let us guide you to delicious recipes.
              </Text>
            </View>


            <View style={styles.btnContainer}>
              <TouchableOpacity style={GbStyle.solidButton}  onPress={() => navigation.navigate("")}>
                <Text style={GbStyle.ButtonColorAndFontSize}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <ImageUpload isVisible={modalVisible} onClose={() => setModalVisible(false)} onUpload={handleImageUpload} onCameraCapture={CameraCaptionNavigation} /> */}

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,

  }, centeredView: {
    flexGrow:1,
    width: "100%",
    height:"auto",
  
    
  },

  defaultImageStyle: {
    height: "100%",
    width: "100%",
    padding: 10
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },


})

export default Home;
