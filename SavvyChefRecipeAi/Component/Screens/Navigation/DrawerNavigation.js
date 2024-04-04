import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from './../Navigation/GlobalContext';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesome5 } from '@expo/vector-icons';
// Update your DrawerNavigator to use the CustomDrawerContent
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from './SettingScreen';
import ProfileScreen from '../User/ProfileScreen';
import EditProfile from '../User/EditProfile';
import SettingStackScreen from './SettingStackScreen';
import RecipeDetails from '../AI/RecipeDetails ';
import SaveFavoriteView from '../User/SaveFavoriteView';
import PaymentScreen from '../../../PaymentGateway/PaymentScreen';
import ImageVision from '../AI/ImageVision';



const Drawer = createDrawerNavigator();



function DrawerNavigation() {
    const { userData, setCameraPictureCapture, cameraPictureCapture, } = useContext(GlobalContext);



    function rightHeader() {
        return <View style={styles.profileContainer}>
            <FontAwesome5 name="coins" size={29} color="#000" style={styles.coinIcon} />
            <Text style={styles.userDailyLimit}>{userData.dailyLimit}</Text>
        </View>
    }

   


    return (
        <Drawer.Navigator screenOptions={({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'white',
            },
            // headerleft call the toggle of handburger and onpen drawer
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
                    <Icon name="bars" size={20} color="#000" />
                </TouchableOpacity>
            ),

            headerRight: () => (

                <View style={styles.profileContainer}>
                    <FontAwesome5 name="coins" size={29} color="#000" style={styles.coinIcon} />
                    <Text style={styles.userDailyLimit}>{userData.dailyLimit}</Text>
                </View>

            ),
        })} drawerContent={(props) => <SettingScreen {...props} />}

           

        >

            <Drawer.Screen name="Home" component={SettingStackScreen} options={{
                title: '',
                headerStyle: {
                    backgroundColor: '#fff',

                },


                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
                        <Text style={{ fontSize: 25, justifyContent: "center", marginStart: 10, fontWeight: "bold" }}>Hello, {userData.firstName}</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => (

                    rightHeader()

                ),
            }}

            />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignContent: 'center'
                },
            }} />



            <Drawer.Screen name="editProfile" component={EditProfile} options={{
                title: 'Edit Profile',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }} />
            <Drawer.Screen name="RecipeDetails" component={RecipeDetails} options={{
                title: 'Recipe Details',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }} />
            <Drawer.Screen name="saveFavoriteView" component={SaveFavoriteView} options={{
                title: 'SaveFavoriteView',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }} />
            <Drawer.Screen name="paymentScreen" component={PaymentScreen} options={{
                title: 'PaymentScreen',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }} />
            <Drawer.Screen name="imageVision" component={ImageVision} options={{
                title: 'ImageVision',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }} />
          




        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({

    profileContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: 20,
        justifyContent: "center"
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 23,
        marginBottom: 5
    },
    coinIcon: {
        width: 35,
        height: 35,
    },
    userDailyLimit: {
        fontSize: 20,
        color: '#000',
        fontWeight: "bold",
        paddingRight: 15
    },
    headerLeft: {
        marginLeft: 15,
    },

    headerRight: {
        marginLeft: 15,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    headerRight: {
        marginRight: 15,
    },
    // drawer content
    drawerLabel: {
        fontSize: 14,
    },
    drawerLabelFocused: {
        fontSize: 14,
        color: '#551E18',
        fontWeight: '500',
    },
    drawerItem: {
        height: 50,
        justifyContent: 'center'
    },
    drawerItemFocused: {
        backgroundColor: '#ba9490',
    },
})

export default DrawerNavigation;
