import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles"

import { auth } from '../../../Firebase/Config';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Platform } from 'react-native';

const ResetPassword = ({ navigation }) => {
  const [Email, SetEmail] = useState("");

  const validation = async () => {

    if (Email.length == 0) {
      Alert.alert("Warning!!", "Your Email Field is empty");
    }
    else {
      const auth = getAuth();
      sendPasswordResetEmail(auth, Email)
        .then(() => {
           
          navigation.navigate("resetSuccess");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

  }



  return (


    <ImageBackground source={GbStyle.forgotPasswordBg} resizeMode='cover' blurRadius={3} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.MainContainer}>
            <View style={styles.headertextContainer}>

              <TouchableOpacity onPress={() => navigation.navigate("welcomeScreen")}>
                <AntDesign name="arrowleft" size={28} color="white" />
              </TouchableOpacity>

              <Text style={[GbStyle.mainTitle, { textAlign: "left", width:'100%' , fontSize: 35 }]}>Forgot Password?</Text>
              <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>Recover your Password if you have forgot the password!</Text>
            </View>

            <View style={styles.inputFieldContainer}>

              <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Email</Text>

              <View style={[styles.inputFieldcontainer]}>
                <AntDesign name="mail" size={28} color="white" />
                <TextInput value={Email} placeholder="Ex: abc@example.com" placeholderTextColor={"#ffffff"} onChangeText={SetEmail} style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

              </View>
            </View>

            <View style={styles.btnContainer}>

              <TouchableOpacity onPress={validation} style={GbStyle.solidButton}>
                <Text style={GbStyle.ButtonColorAndFontSize} >Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView></ImageBackground>


  )

}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-start',
  },

  MainContainer: {
    width: "100%",
    padding: 30,
    margin: 3
  },

  headertextContainer: {
    width: "100%",
    alignItems: "flex-start",

  },

  inputFieldcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: GbStyle.colors.buttonColors.borderColor,
    borderWidth: 1,
    padding: 15,
    borderRadius: 15
  },

  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 10,
    flexWrap: "wrap",


  },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20


  },

  registerNavigation: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 0,
    paddingBottom: 50

  },



})


export default ResetPassword