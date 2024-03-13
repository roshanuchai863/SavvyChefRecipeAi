import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Alert, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../Firebase/Config';

// ResetPassword component allows users to reset their password via email

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  // Function to handle the password reset process
  const handlePasswordReset = async () => {
    if (email.length === 0) {    // Check if the email field is empty

      Alert.alert("Warning!!", "Your Email Field is empty");
      return;
    }

    // Attempt to send a password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent successfully.");

        // Navigate back to the welcome screen upon success
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        // Handle errors and show them to the user

        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <ImageBackground source={GbStyle.forgotPasswordBg} resizeMode='cover' blurRadius={3} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.MainContainer}>
            <View style={styles.headertextContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                <AntDesign name="arrowleft" size={28} color="white" />
              </TouchableOpacity>
              <Text style={[GbStyle.mainTitle, { textAlign: "left", width: '100%', fontSize: 35 }]}>Forgot Password?</Text>
              <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>Recover your Password if you have forgot the password!</Text>
            </View>

            <View style={styles.inputFieldContainer}>
              <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Email</Text>
              <View style={styles.inputFieldcontainer}>
                <AntDesign name="mail" size={28} color="white" />
                <TextInput
                  value={email}
                  placeholder="Ex: abc@example.com"
                  placeholderTextColor={"#ffffff"}
                  onChangeText={setEmail}
                  style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]}
                />
              </View>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handlePasswordReset} style={GbStyle.solidButton}>
                <Text style={GbStyle.ButtonColorAndFontSize}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
});

export default ResetPassword;
