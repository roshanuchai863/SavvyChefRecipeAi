import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GbStyle from "./Global/Styles";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import SettingScreen from './Component/Screens/User/SettingScreen';
// Import Firebase auth
import { auth, onAuthStateChanged, db } from "./Firebase/Config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState("");
  const [subscription, SetSubscription] = useState("");
  const [dailyLimit, SetDailyLimit] = useState("");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        firestoreRetrieve();
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const firestoreRetrieve = async () => {
  
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const docRef = doc(db, "Personal Details", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userDetails = docSnap.data().UserDetails || {};
        const paymentDetails = docSnap.data().Payment || {};

        // Consolidate user data for easier management
        const userData = {
          email: userDetails.Email || "",
          firstName: userDetails.FirstName || "",
          lastName: userDetails.LastName || "",
          contact: userDetails.Phone || "",
          profile: userDetails.ProfileImage || "",
          subscription: paymentDetails.SubscriptionStatus || "",
          dailyLimit: paymentDetails.DailyLimit || "",
        };

        // Update AsyncStorage with user data
        await Promise.all(Object.keys(userData).map(key =>
          AsyncStorage.setItem(key, userData[key])
        ));

      } else {
        console.log("No such document!");
        setError('No such document!');
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError(err.message);
    }
  };


  return (
    <NavigationContainer>

      {currentUser ? (

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconSource;

              if (route.name === 'Home') {

                iconSource = GbStyle.HomeIcon;

              } else if (route.name === 'Profile') {
                iconSource = GbStyle.chatBotIcon;
              } else if (route.name === 'Edit Profile') {
                iconSource = GbStyle.GroceriesIcon;
              }
              else if (route.name === 'Setting') {

                iconSource = GbStyle.SettingIcon;
              }

              // You can return any component that you like here!
              return <Image source={iconSource} style={{ width: size, height: size }} resizeMode="contain" />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Edit Profile" component={EditProfile} options={{ headerShown: false }} />
          <Tab.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />

        </Tab.Navigator>
      ) : (
        // Screens accessible when no user is logged in
        <Stack.Navigator>
          <Stack.Screen name="welcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="loginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="signUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="resetSuccess" component={ResetSuccess} options={{ headerShown: false }} />

        </Stack.Navigator>
      )}

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