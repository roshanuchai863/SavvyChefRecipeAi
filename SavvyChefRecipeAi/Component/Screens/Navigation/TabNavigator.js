import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../HomeScreen";
import ProfileScreen from '../User/ProfileScreen';
import SettingScreen from '../User/SettingScreen';
import EditProfile from '../User/EditProfile';
import { Image } from 'react-native';
import GbStyle from "../../../Global/Styles"
import SaveFavorite from '../User/SaveFavorite';
import { initializeApp } from 'firebase/app';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {

            iconSource = GbStyle.MainHomeIcon;

          } else if (route.name === 'Profile') {
            iconSource = GbStyle.chatBotIcon;
          } else if (route.name === 'Save') {
            iconSource = GbStyle.GroceriesIcon;
          }
          else if (route.name === 'Setting') {

            iconSource = GbStyle.SettingIcon;
          }



          return <Image source={iconSource} style={{ width: 25, height: 30 }} resizeMode="contain" />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 75,
          paddingBottom: 15,
          paddingTop: 5,
        },


      })

      }
    
    >


      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Save" component={SaveFavorite} />


      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Open the drawer
            navigation.openDrawer();
          },
        })}
      />

    </Tab.Navigator>
  );
}
export default TabNavigator