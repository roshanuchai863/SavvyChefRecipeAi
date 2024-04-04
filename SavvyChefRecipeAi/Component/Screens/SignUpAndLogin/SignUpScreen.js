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
  Platform
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../Firebase/Config';
import GbStyle from '../../../Global/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignUpScreen = ({ navigation }) => {

  // State hooks for managing user inputs and UI state
  // const [email, setEmail] = useState('roshancreative863@gmail.com');
  // const [password, setPassword] = useState('Roshanmalla24@');
  // const [confirmPassword, setConfirmPassword] = useState('Roshanmalla24@');
  // const [firstName, setFirstName] = useState('Roshan');
  // const [lastName, setLastName] = useState('Uchai');
  // const [phone, setPhone] = useState('0410927767');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Manage password visibility toggle
  const [secureText, setSecureText] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState('eye-off-outline');

  // Toggle the visibility of the password field
  const togglePasswordVisibility = () => {
    if (passwordVisible == 'eye-off-outline' && password.length == 0) {
      Alert.alert('Warning!!', 'Your password Field is empty');
      setPasswordVisible('eye-off-outline');
    } else if (passwordVisible == 'eye-off-outline') {
      setPasswordVisible('eye-outline');
      setSecureText(false);
    } else {
      setSecureText(true);
      setPasswordVisible('eye-off-outline');
    }
  };

  // Validate user input fields before submission
  const validateInputFields = () => {
    // Email validation (simple pattern; consider more complex regex for production)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      return false;
    }

    // First and Last Name validation
    if (firstName.trim().length < 3) {
      Alert.alert('Invalid Input', 'First name must be at least 3 characters long.');
      return false;
    }
    if (lastName.trim().length < 3) {
      Alert.alert('Invalid Input', 'Last name must be at least 3 characters long.');
      return false;
    }

    // Phone validation (basic check for 10 digits; adjust as needed)
    const phonevalidation = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/gm;

    if (!phonevalidation.test(phone)) {
      Alert.alert('Invalid Input', 'Phone number not correct');
      return false;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert('Invalid Input', 'Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Invalid Input', 'Passwords do not match.');
      return false;
    }

    // If all validations pass
    return true;
  };

  // Handle user sign-up using Firebase authentication

  const handleSignUp = async () => {
    if (!validateInputFields()) {
      // Stop the sign-up process if validation fails
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Sign out the user after account creation
      auth.signOut();
      await sendEmailVerification(userCredential.user);

      Alert.alert('Success', 'Verification email sent. Please check your inbox.');

      storeData(firstName, lastName, phone);

      // Navigate to the login screen or another appropriate screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign Up failed', error);
      Alert.alert('Error', error.message);
    }
  };



  const storeData = async (firstName, lastName, phone) => {
    try {
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('phone', phone);
    } catch (e) {
      Alert.alert("Error", "Could not store your personal data", e);
    }
  };
  

  return (
    <ImageBackground source={GbStyle.SignUpScreenBg} resizeMode='cover' blurRadius={3} style={styles.backgroundImage}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.MainContainer}>
              <View style={styles.headertextContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name='arrowleft' size={28} color='white' />
                </TouchableOpacity>

                <Text style={GbStyle.mainTitle}>Sign Up</Text>
                <Text style={[GbStyle.NormalText, { textAlign: 'left', width: '100%' }]}>
                  Create an account to access thousands of Food Recipes
                </Text>
              </View>

              <View style={styles.inputFieldContainer}>
                {/* Email */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>Email</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='mail' size={28} color='white' />
                  <TextInput
                    value={email}
                    placeholder='Ex: abc@example.com'
                    placeholderTextColor={'#ffffff'}
                    onChangeText={setEmail}
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                </View>

                {/* First Name */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>First Name</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='user' size={28} color='white' />
                  <TextInput
                    value={firstName}
                    placeholder='Ex. John'
                    placeholderTextColor={'#ffffff'}


                    onChangeText={setFirstName}
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                </View>

                {/* Last Name */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>Last Name</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='user' size={28} color='white' />
                  <TextInput
                    value={lastName}
                    placeholder='Ex. Doe'
                    placeholderTextColor={'#ffffff'}
                    onChangeText={setLastName}
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                </View>

                {/* Phone */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>Phone</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='phone' size={28} color='white' />
                  <TextInput
                    value={phone}
                    placeholder='0410000000'
                    placeholderTextColor={'#ffffff'}
                    onChangeText={setPhone}
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                </View>

                {/* Password */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>Password</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='lock' size={28} color='white' />
                  <TextInput
                    value={password}
                    placeholder='.........'
                    placeholderTextColor={'#ffffff'}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    autoComplete='off'
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons name={passwordVisible} size={28} color='white' style={{ marginLeft: -20 }} />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <Text style={[GbStyle.NormalText, { textAlign: 'left' }]}>Confirm Password</Text>
                <View style={styles.inputFieldcontainer}>
                  <AntDesign name='lock' size={28} color='white' />
                  <TextInput
                    value={confirmPassword}
                    placeholder='.........'
                    placeholderTextColor={'#ffffff'}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={secureText}
                    autoComplete='off'
                    style={[GbStyle.inputText, { width: '90%', marginLeft: 10 }]}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons name={passwordVisible} size={28} color='white' style={{ marginLeft: -20 }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleSignUp} style={GbStyle.solidButton}>
                  <Text style={GbStyle.ButtonColorAndFontSize}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerNavigation}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={GbStyle.NormalText}>
                    Already have an account?<Text style={{ color: '#FFB000', fontWeight: 'bold' }}> Login</Text>
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
    width: '100%',
    justifyContent: 'flex-start',
  },
  MainContainer: {
    width: '100%',
    padding: 30,
    margin: 3,
  },
  headertextContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  inputFieldcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderColor: GbStyle.colors.buttonColors.borderColor,
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  inputFieldContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    paddingBottom: 50,
  },
});

export default SignUpScreen;
