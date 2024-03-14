import React, { useState } from 'react';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/Config';
import GbStyle from '../../../Global/Styles';
import TabNavigator from '../Navigation/TabNavigator';
import SettingStackScreen from '../Navigation/SettingStackScreen';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  
const navigation = useNavigation();


  const [email, setEmail] = useState('thakuriroshan863@gmail.com');
  const [password, setPassword] = useState('Roshanmalla24@@');
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

  // Handles the login process
  const handleLogin = async () => {
    // Stops the login process if validation fails
    if (!validation()) return;

    try {
      // Attempts to sign in the user with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login success');
      // Navigates to the main app screen upon successful login
          } catch (error) {
      // Logs and alerts the user of any login errors

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
