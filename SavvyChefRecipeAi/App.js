import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from "./Component/Screens/SignUpAndLogin/WelcomeScreen"
import LoginScreen from "./Component/Screens/SignUpAndLogin/LoginScreen";
import SignUpScreen from "./Component/Screens/SignUpAndLogin/SignUpScreen";
import ResetPassword from "./Component/Screens/SignUpAndLogin/ResetPassword";
import HomeScreen from "./Component/Screens/HomeScreen";




const Stack = createNativeStackNavigator();


export default function App() {
  return (
<NavigationContainer>

<Stack.Navigator initialRouteName='loginScreen'>
  <Stack.Screen name='welcomeScreen' component={WelcomeScreen}  options={{headerShown:false}}/>
  <Stack.Screen name='loginScreen' component={LoginScreen} options={{headerShown:false}}/>
  <Stack.Screen name='signUpScreen' component={SignUpScreen} options={{headerShown:false}}/>
  <Stack.Screen name='resetPassword' component={ResetPassword} options={{headerShown:false}}/>
  <Stack.Screen name='homeScreen' component={HomeScreen} options={{headerShown:false}}/>

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