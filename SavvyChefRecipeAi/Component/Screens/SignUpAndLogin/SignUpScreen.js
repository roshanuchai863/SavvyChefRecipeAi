import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../Firebase/Config"
import { doc, setDoc } from "firebase/firestore";
import GbStyle from "../../../Global/Styles"


const SignUpScreen = ({ navigation }) => {
  const [Email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmpassword, SetConfirmPassword] = useState("");
  const [userName, SetUsername] = useState("");
  const [secureText, SetSecureText] = useState(true);
  const [PasswordVisbile, setPasswordVisible] = useState("eye-off-outline");

  useEffect(() => {
    // Initialiser le formulaire
    SetEmail("");
    SetPassword("");
    SetConfirmPassword("");
    SetUsername("")

  }, []);
 


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



  const handleLogin = async () => {

    if (Email.length == 0 && password.length == 0 && userName.length == 0 && confirmpassword.length == 0) {
      Alert.alert("Warning!!", "Your All TextField are empty");
    }
    else if (Email.length == 0) {
      Alert.alert("Warning!!", "Your Email Field is empty");
    }
    else if (userName.length == 0) {
      Alert.alert("Warning!!", "Your Name Field is empty");
    }
    else if (password.length == 0) {
      Alert.alert("Warning!!", "Your  password Field is empty");
    }
    else if (confirmpassword.length == 0) {
      Alert.alert("Warning!!", "Your  Confirm password Field is empty");
    }

    else if (password != confirmpassword) {
      Alert.alert("Warning!!", "Your password did Matched");
    }

    else {

      createUserWithEmailAndPassword(auth, Email, password)
        .then((userCredential) => {
          // Signed In 
          console.log("login Success")
          const user = userCredential.user;
          console.log("login Success " + user.uid)

          setDoc(doc(db, "perosnal Details", user.uid), {
            name: userName,
            Email: Email,
            Subscription: "Free",
            ImageProfile: ""


          });


          navigation.navigate("welcomeScreen")
        })
        .catch((error) => {

          console.log("login failed", error)
          const errorCode = error.code;
          const errorMessage = error.message;


          if (errorMessage.includes("auth/invalid-email")) {
            Alert.alert("Warning!", "You have Invalid Email", errorMessage);
          }

          else if (errorMessage.includes("auth/weak-password")) {
            Alert.alert("Warning!", "Password should be at least 6 characters");
            return;
          }

          else if (errorMessage.includes("auth/email-already-in-use")) {
            Alert.alert("Warning!", "Your Email Already Exist");
          }

        });
    }
  }


  return (


    <ImageBackground source={GbStyle.SignUpScreenBg} resizeMode='cover' blurRadius={3.5} style={styles.backgroundImage}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>

            <View style={styles.MainContainer}>
              <View style={styles.headertextContainer}>

                <TouchableOpacity onPress={() => navigation.navigate("welcomeScreen")}>
                  <AntDesign name="arrowleft" size={28} color="white" />
                </TouchableOpacity>

                <Text style={GbStyle.mainTitle}>Register</Text>
                <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>Create an account to access thousands of Food Recipes</Text>
              </View>

              <View style={styles.inputFieldContainer}>

                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Email</Text>

                <View style={[styles.inputFieldcontainer]}>
                  <AntDesign name="mail" size={28} color="white" />
                  <TextInput value={Email} placeholder="Ex: abc@example.com" placeholderTextColor={"#ffffff"} onChangeText={SetEmail} style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

                </View>


                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Your Name</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="mail" size={28} color="white" />
                  <TextInput value={userName} placeholder="Ex. Roshan Uchai" placeholderTextColor={"#ffffff"} onChangeText={SetUsername} style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />
                </View>


                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Password</Text>

                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="lock" size={28} color="white" />
                  <TextInput value={password} placeholder="........." placeholderTextColor={"#ffffff"} onChangeText={SetPassword} secureTextEntry={secureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

                  <TouchableOpacity onPress={passwordVisible}>
                    <Ionicons name={PasswordVisbile} size={28} color="white" style={{marginLeft:-20}}/>
                  </TouchableOpacity>
                </View>

                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Confirm Password</Text>

                <View style={styles.inputFieldcontainer}>

                  <AntDesign name="lock" size={28} color="white" />

                  <TextInput value={confirmpassword} placeholder="........." placeholderTextColor={"#ffffff"} onChangeText={SetConfirmPassword} secureTextEntry={secureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]} />

                  <TouchableOpacity onPress={passwordVisible}>
                    <Ionicons name={PasswordVisbile} size={28} color="white" style={{marginLeft:-20}}/>
                  </TouchableOpacity>
                </View>

              </View>



              <View style={styles.btnContainer}>

                <TouchableOpacity onPress={handleLogin} style={GbStyle.solidButton}>
                  <Text style={GbStyle.ButtonColorAndFontSize} >Register</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.registerNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={GbStyle.NormalText}>Already have an account?<Text style={{color:"#FFB000", fontWeight:700}}> Login</Text></Text>
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

export default SignUpScreen