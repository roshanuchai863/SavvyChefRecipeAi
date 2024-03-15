import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../HomeScreen";
import SettingScreen from '../User/SettingScreen';
import { Image } from 'react-native';
import GbStyle from "../../../Global/Styles"
import SaveFavorite from '../User/SaveFavorite';
import Edaman from '../AI/Edaman';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {

            iconSource = GbStyle.HomeIcon;

          } else if (route.name === 'Profile') {
            iconSource = GbStyle.chatBotIcon;
          } else if (route.name === 'Save') {
            iconSource = GbStyle.GroceriesIcon;
          }
          else if (route.name === 'Setting') {

            iconSource = GbStyle.SettingIcon;
          }
          else if (route.name === 'Edaman') {

            iconSource = GbStyle.CookBookIcon;

          }



          return <Image source={iconSource} style={{ width: 30, height: 30 }} resizeMode="contain" />;
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
      initialRouteName='Edaman'

    >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Edaman" component={Edaman} />
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