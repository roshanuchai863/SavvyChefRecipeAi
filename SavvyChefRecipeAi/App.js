import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, onSnapshot } from "firebase/firestore";
import { auth, onAuthStateChanged, db } from "./Firebase/Config";
import GlobalContext from './Component/Screens/Navigation/GlobalContext';
import  GbStyle from "./Global/Styles";
import {Image} from "react-native"

// Importing screens for navigation
import WelcomeScreen from "./Component/Screens/SignUpAndLogin/WelcomeScreen";
import LoginScreen from "./Component/Screens/SignUpAndLogin/LoginScreen";
import SignUpScreen from "./Component/Screens/SignUpAndLogin/SignUpScreen";
import ResetPassword from "./Component/Screens/SignUpAndLogin/ResetPassword";
import HomeScreen from "./Component/Screens/HomeScreen";
import ResetSuccess from './Component/Screens/SignUpAndLogin/ResetSuccess';
import ProfileScreen from './Component/Screens/User/ProfileScreen';
import EditProfile from './Component/Screens/User/EditProfile';
import ImageUpload from './Component/Screens/UploadImage';
import SettingScreen from './Component/Screens/User/SettingScreen';
import CameraCapture from './Component/Screens/Camera/CameraCapture';
import TabNavigator from './Component/Screens/Navigation/TabNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStackScreen from './Component/Screens/Navigation/SettingStackScreen';
import DrawerNavigation from './Component/Screens/Navigation/DrawerNavigation';




// Creating navigation stack and tab instances
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()


export default function App() {

  // State hooks for managing global user data and authentication state
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const [userId, setUserID] = useState(null);
  const [CameraPictureCapture, setCameraPictureCapture] = useState(null)


  // Authentication state listener to manage user sign-in state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {

        // User is signed in, fetch user details from Firestore
        console.log("User is signed in:", currentUser);
        firestoreRetrieve(currentUser.uid)
        setUser(currentUser);
        setUserID(currentUser.uid)

        console.log("User id is :", userId);

      }
      else {

        // User is signed out, reset state
        setUser(null);
        setUserID(null);
      }
    });
    console.log("userData profile is ", userData.profile)

    return () => unsubscribe();
  }, []);


  // Function to fetch user details from Firestore and update local state
  const firestoreRetrieve = (uid) => {
    if (!uid) {
      console.log("User not logged in");
      return;
    }

    const docRef = doc(db, "Personal Details", uid);

    // Set up a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const userDetails = doc.data().UserDetails || {};
        const paymentDetails = doc.data().Payment || {};

        // Update userData state with the new data
        setUserData({
          email: userDetails.Email || "",
          firstName: userDetails.FirstName || "",
          lastName: userDetails.LastName || "",
          contact: userDetails.Phone || "",
          profile: userDetails.ProfileImage || "",
          subscription: paymentDetails.SubscriptionStatus || "",
          dailyLimit: paymentDetails.DailyLimit || "",
        });
      } else {
        console.log("No such document!");
        setError('No such document!');
      }
    }, (err) => {
      console.error("Error fetching document:", err);
      setError(err.message);
    });

    // Return the unsubscribe function to clean up the listener when the component unmounts or the user ID changes
    return unsubscribe;
  };


  // This example resets all state
  const resetGlobalContext = () => {
    setUserData({});
    setUser(null);
    setUserID(null);
    setCameraPictureCapture(null);
  };


  return (

    <NavigationContainer>

      {/* If user is signed in, provide user data through global context and render the main app stack */}
      {auth.currentUser ? (
        <GlobalContext.Provider value={{ userData, user, userId, CameraPictureCapture, setCameraPictureCapture, resetGlobalContext }}>
         <DrawerNavigation />
        </GlobalContext.Provider >

      ) : (

        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="ResetSuccess" component={ResetSuccess} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}

    </NavigationContainer>

  );
}


