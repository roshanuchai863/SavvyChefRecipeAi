import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword ,sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../../../Firebase/Config';
import GbStyle from '../../../Global/Styles';
import { useNavigation } from '@react-navigation/native';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* <LoginScreen email={email} lastName={lastName} phone={phone}/> */}

const LoginScreen = ( ) => {

const navigation = useNavigation();


  const [email, setEmail] = useState('roshancreative863@gmail.com');
  const [password, setPassword] = useState('Roshanmalla24@');
  const [secureText, setSecureText] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState('eye-off-outline');

     // Function to toggle the visibility of the password input field

  const togglePasswordVisibility = () => {
    if (passwordVisible === 'eye-off-outline' && password.length === 0) {
      Alert.alert('Warning!!', 'Your password field is empty');
      setPasswordVisible('eye-off-outline');
    } else if (passwordVisible === 'eye-off-outline') {
      setPasswordVisible('eye-outline');
      setSecureText(false);
    } else {
      setSecureText(true);
      setPasswordVisible('eye-off-outline');
    }
  };

  // Validates input fields before attempting to log in
  const validation = () => {
    // Check for empty fields and alert the user accordingly
    if (email.length === 0 && password.length === 0) {
      Alert.alert('Warning!!', 'Your email and password fields are empty');
      return false;
    } else if (email.length === 0) {
      Alert.alert('Warning!!', 'Your email field is empty');
      return false;
    } else if (password.length === 0) {
      Alert.alert('Warning!!', 'Your password field is empty');
      return false;
    }
    return true;
  };

  // // Handles the login process
  // const handleLogin = async () => {
  //   // Stops the login process if validation fails
  //   if (!validation()) return;

  //   try {
  //     // Attempts to sign in the user with Firebase authentication
  //     await signInWithEmailAndPassword(auth, email, password);


  //     // Navigates to the main app screen upon successful login
  //         } catch (error) {
  //     // Logs and alerts the user of any login errors

  //     console.error('Login failed', error);
  //     Alert.alert('Login Failed', error.message);
  //   }
  // };
  const handleLogin = async () => {
    if (!validation()) return;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;


        if (!user.emailVerified) {
            // User's email is not verified
            Alert.alert(
                "Email Not Verified",
                "Please verify your email to proceed. Check your inbox for the verification email.",
                [
                    {
                        text: "Resend Verification Email",
                        onPress: async () => {
                            try {
                                await sendEmailVerification(user);
                                Alert.alert("Verification Email Sent", "Check your email to verify your account.");
                            } catch (error) {
                                console.error("Error sending verification email", error);
                                Alert.alert("Error", "Failed to send verification email. Please try again later.");
                            }
                        }
                    },
                    { text: "OK" }
                ]
            );
            await auth.signOut(); // Ensure the user is logged out if not verified
            navigation.navigate('Login'); 
        } 
        
          else {
            // Check if the user document already has Payment and UserDetails
            const userDocRef = doc(db, 'Personal Details', user.uid);
            const userDocSnap = await getDoc(userDocRef);
      
            // Only set Payment and UserDetails if they don't exist
            if (!userDocSnap.exists() || !userDocSnap.data().Payment || !userDocSnap.data().UserDetails) {
              const userData = {
                Payment: {
                  SubscriptionStatus: 'Free',
                  SubscriptionDate: '',
                  DailyLimit: 20,
                },
                UserDetails: {
                  Email: email,
                  FirstName: await AsyncStorage.getItem("firstName"),
                  LastName: await AsyncStorage.getItem("lastName"),
                  Phone: await AsyncStorage.getItem("phone"),
                  ProfileImage: ""
                },
              };
      
              await setDoc(userDocRef, userData, { merge: true });
            }
  
      await AsyncStorage.removeItem("firstName")
      await AsyncStorage.removeItem("lastName")
      await AsyncStorage.removeItem("phone")
     
        }
    } catch (error) {
        console.error('Login failed', error);
        Alert.alert('Login Failed', error.message);
    }
};




  return (
    <ImageBackground source={GbStyle.LogInScreenBg} resizeMode='cover' blurRadius={3} style={styles.backgroundImage}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.MainContainer}>
              <View style={styles.headertextContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={28} color="white" />
                </TouchableOpacity>
                <Text style={GbStyle.mainTitle}>Login</Text>
                <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>
                  Login now to explore Food Recipe
                </Text>
              </View>

              <View style={styles.inputFieldContainer}>
                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Email</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="mail" size={28} color="white" />
                  <TextInput
                    value={email}
                    placeholder="Ex: abc@example.com"
                    placeholderTextColor="#ffffff"
                    onChangeText={setEmail}
                    style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]}
                  />
                </View>

                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Password</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="lock" size={28} color="white" />
                  <TextInput
                    value={password}
                    placeholder="........."
                    placeholderTextColor="#ffffff"
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons name={passwordVisible} size={28} color="white" style={{ marginLeft: -20 }} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                  <Text style={[GbStyle.NormalText, { width: "100%", textAlign: "left" }]}>
                    Forgot Password
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleLogin} style={GbStyle.solidButton}>
                  <Text style={GbStyle.ButtonColorAndFontSize}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={GbStyle.NormalText}>
                    Don't have an account?<Text style={{ color: "#FFB000", fontWeight: "bold" }}> Register</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
    margin: 3,
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
    borderRadius: 15,
    marginTop: 10,
  },
  inputFieldContainer: {
    marginTop: 10,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerNavigation: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 50,
  },
});

export default LoginScreen;
