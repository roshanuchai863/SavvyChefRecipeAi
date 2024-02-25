import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import WelcomeScreen from "./Component/Screens/SignUpAndLogin/WelcomeScreen";
import LoginScreen from "./Component/Screens/SignUpAndLogin/LoginScreen";
import SignUpScreen from "./Component/Screens/SignUpAndLogin/SignUpScreen";
import ResetPassword from "./Component/Screens/SignUpAndLogin/ResetPassword";
import HomeScreen from "./Component/Screens/HomeScreen";
import ResetSuccess from './Component/Screens/SignUpAndLogin/ResetSuccess';
import ProfileScreen from './Component/Screens/User/ProfileScreen';
import EditProfile from './Component/Screens/User/EditProfile';
import ImageUpload from './Component/Screens/UploadImage';

// Import Firebase auth
import { auth, onAuthStateChanged } from "./Firebase/Config";

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          // Screens accessible when the user is logged in
          <>
            <Stack.Screen name="homeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="profileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="editProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="imageUpload" component={ImageUpload} options={{ headerShown: false }} />
            {/* Add more authenticated screens as needed */}
          </>
        ) : (
          // Screens accessible when no user is logged in
          <>
            <Stack.Screen name="welcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="loginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false }} />
            <Stack.Screen name="resetSuccess" component={ResetSuccess} options={{ headerShown: false }} />
            {/* Add more unauthenticated screens as needed */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
