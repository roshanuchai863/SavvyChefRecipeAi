import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase/Config"
import { doc, setDoc } from "firebase/firestore";
import GbStyle from "../../../Global/Styles"


const LoginScreen = ({ navigation }) => {
  const [Email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [secureText, SetSecureText] = useState(true);
  const [PasswordVisbile, setPasswordVisible] = useState("eye-off-outline");

  const passwordVisible = () => {

    if (PasswordVisbile == "eye-off-outline" && password.length == 0) {
      Alert.alert("Warning!!", "Your password Field is empty");
      setPasswordVisible("eye-off-outline")
    }

    else if (PasswordVisbile == "eye-off-outline") {
      setPasswordVisible("eye-outline")
      SetSecureText(false);

    }
    else {
      SetSecureText(true);
      setPasswordVisible("eye-off-outline")
    }
  }

  const validation = () => {

    if (Email.length == 0 && password.length == 0) {
      Alert.alert("Warning!!", "Your Email and password Field are empty");
    }
    else if (Email.length == 0) {
      Alert.alert("Warning!!", "Your Email Field is empty");
    }
    else if (password.length == 0) {
      Alert.alert("Warning!!", "Your  password Field is empty");
    }


  }

  const handleLogin = async () => {
    validation();

    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("login Success")
        const user = userCredential.user;
        navigation.navigate("homeScreen")
      })
      .catch((error) => {

        console.log("login failed", error)

        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }




  return (



    <ImageBackground source={GbStyle.LogInScreenBg} resizeMode='cover' blurRadius={3} style={styles.backgroundImage}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>

            <View style={styles.MainContainer}>
              <View style={styles.headertextContainer}>

                <TouchableOpacity onPress={() => navigation.navigate("welcomeScreen")}>
                  <AntDesign name="arrowleft" size={28} color="white" />
                </TouchableOpacity>

                <Text style={GbStyle.mainTitle}>Login</Text>
                <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>Login now to explore Food Recipe</Text>
              </View>

              <View style={styles.inputFieldContainer}>

                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Email</Text>

                <View style={[styles.inputFieldcontainer]}>
                  <AntDesign name="mail" size={28} color="white" />
                  <TextInput value={Email} placeholder="Ex: abc@example.com" placeholderTextColor={"#ffffff"} onChangeText={SetEmail} style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

                </View>


                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Password</Text>

                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="lock" size={28} color="white" />
                  <TextInput value={password} placeholder="........." placeholderTextColor={"#ffffff"} onChangeText={SetPassword} secureTextEntry={secureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

                  <TouchableOpacity onPress={passwordVisible}>
                    <Ionicons name={PasswordVisbile} size={28} color="white" style={{ marginLeft: -20 }} />
                  </TouchableOpacity>
                </View>



                <View >
                  <TouchableOpacity onPress={() => navigation.navigate("resetPassword")}>
                    <Text style={[GbStyle.NormalText, { width: "100%", textAlign: "left" }]}> Forgot Password </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.btnContainer}>

                <TouchableOpacity onPress={handleLogin} style={GbStyle.solidButton}>
                  <Text style={GbStyle.ButtonColorAndFontSize} >Login</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.registerNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate("signUpScreen")}>
                  <Text style={GbStyle.NormalText}>Don't have an account?<Text style={{ color: "#FFB000", fontWeight: 700 }}> Register</Text></Text>
                </TouchableOpacity>
              </View>

            </View>

          </ScrollView>
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

export default LoginScreen