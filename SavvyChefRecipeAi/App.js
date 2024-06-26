import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, onSnapshot } from "firebase/firestore";
import { auth, onAuthStateChanged, db } from "./Firebase/Config";
import GlobalContext from './Component/Screens/Navigation/GlobalContext';
import { Publishable_key, GoogleVision_API_KEY } from '@env'
import { StripeProvider } from '@stripe/stripe-react-native';


// Importing screens for navigation
import WelcomeScreen from "./Component/Screens/SignUpAndLogin/WelcomeScreen";
import LoginScreen from "./Component/Screens/SignUpAndLogin/LoginScreen";
import SignUpScreen from "./Component/Screens/SignUpAndLogin/SignUpScreen";
import ResetPassword from "./Component/Screens/SignUpAndLogin/ResetPassword";
import ResetSuccess from './Component/Screens/SignUpAndLogin/ResetSuccess';
import DrawerNavigation from './Component/Screens/Navigation/DrawerNavigation';
import StripeApp from './PaymentGateway/PaymentScreen';



// Creating navigation stack and tab instances
const Stack = createNativeStackNavigator();


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

        firestoreRetrieve(currentUser.uid)
        setUser(currentUser);
        setUserID(currentUser.uid)


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
        const favorites = doc.data().favorites || {};

        // Update userData state with the new data
        setUserData({
          email: userDetails.Email || "",
          firstName: userDetails.FirstName || "",
          lastName: userDetails.LastName || "",
          contact: userDetails.Phone || "",
          profile: userDetails.ProfileImage || "",
          subscription: paymentDetails.SubscriptionStatus || "",
          dailyLimit: paymentDetails.DailyLimit || 0,
          favorite: favorites || "",
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

  console.log("pb ke", Publishable_key);
  return (

    <NavigationContainer>

      {auth.currentUser ? (
        <>
          <GlobalContext.Provider value={{ userData, user, userId, CameraPictureCapture, setCameraPictureCapture, resetGlobalContext }}>
            <StripeProvider
              publishableKey={Publishable_key}
              merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay

            >
              {/* <StripeApp /> */}
            </StripeProvider>

            <DrawerNavigation />
          </GlobalContext.Provider >

        </>
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


