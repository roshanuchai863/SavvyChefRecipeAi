import React, { useState } from 'react';
import {
  Alert, ImageBackground, KeyboardAvoidingView, SafeAreaView,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../../Firebase/Config';
import GbStyle from '../../../Global/Styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('roshancreative863@gmail.com');
  const [password, setPassword] = useState('Roshanmalla24@');
  const [secureText, setSecureText] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState('eye-off-outline');
  const [alertVisible, setAlertVisible] = useState(false);

  // Toggle visibility of password
  const togglePasswordVisibility = () => {
    if (passwordVisible === 'eye-off-outline' && password.length === 0) {
      Alert.alert('Warning!!', 'Your password field is empty');
    } else {
      setPasswordVisible(prevState => prevState === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline');
      setSecureText(!secureText);
    }
  };

  // Validate email and password fields
  const validation = () => {
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

  // Handle login process
  const handleLogin = async () => {
    if (!validation()) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
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
        await auth.signOut();
        navigation.navigate('Login');
      } else {
        const userDocRef = doc(db, 'Personal Details', user.uid);
        const userDocSnap = await getDoc(userDocRef);

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

        await AsyncStorage.removeItem("firstName");
        await AsyncStorage.removeItem("lastName");
        await AsyncStorage.removeItem("phone");
      }
    } catch (error) {
      if (!alertVisible) {
        setAlertVisible(true);
        console.error('Login failed', error);

        if (error.message.includes("auth/invalid-credential")) {
          Alert.alert(
            'Login Failed',
            "Email and Password don't match",
            [{ text: 'OK', onPress: () => setAlertVisible(false) }]
          );
        } else if (error.message.includes("auth/too-many-requests")) {
          Alert.alert(
            'Warning: Too Many Attempts!',
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            [
              {
                text: 'Reset Password',
                onPress: () => {
                  navigation.navigate("ResetPassword");
                  setAlertVisible(false);
                },
              },
              {
                text: 'Cancel',
                onPress: () => setAlertVisible(false),
              },
            ]
          );
        }

        setAlertVisible(false);
      }
    }
  };

  // Render the login screen UI
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
                    onChangeText={setEmail}
                    placeholder="Ex: abc@example.com"
                    placeholderTextColor="#ffffff"
                    style={[GbStyle.inputText, { width: "90%", marginLeft: 10 }]}
                  />
                </View>

                <Text style={[GbStyle.NormalText, { textAlign: "left" }]}>Password</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name="lock" size={28} color="white" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    placeholder="........."
                    placeholderTextColor="#ffffff"
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

// Styles for the login screen
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
    alignItems: "center",
    justifyContent: "center",
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
