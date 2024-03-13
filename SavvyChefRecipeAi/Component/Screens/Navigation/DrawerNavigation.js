import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from './../Navigation/GlobalContext';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import GbStyle from "../../../Global/Styles";
// Update your DrawerNavigator to use the CustomDrawerContent
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../User/SettingScreen';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../User/ProfileScreen';
import EditProfile from '../User/EditProfile';
import SettingStackScreen from './SettingStackScreen';


const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    const { userData, setCameraPictureCapture, cameraPictureCapture, } = useContext(GlobalContext);
    const [profile, setProfile] = useState("");

    // Set profile picture from camera capture or use default
    useEffect(() => {
        if (cameraPictureCapture) {
            setProfile(cameraPictureCapture);
            setCameraPictureCapture(null);
        }
    }, [cameraPictureCapture]);

    // Set profile picture from user data
    useEffect(() => {
        setProfile(userData.profile);
    }, [userData]);
    return (
        <Drawer.Navigator screenOptions={({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'white',
                
            },

            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
                    <Icon name="bars" size={20} color="#000" />
                </TouchableOpacity>
            ),

            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerRight}>
                    <View style={styles.profileContainer}>
                        <Image source={profile ? { uri: profile } : GbStyle.ProfileIcon} style={styles.profileImage} resizeMode={"cover"} />
                        <Text style={styles.userDailyLimit}>{userData.dailyLimit}</Text>
                    </View>
                </TouchableOpacity>
            ),
        })} drawerContent={(props) => <SettingScreen {...props} />}>

            <Drawer.Screen name="Home" component={SettingStackScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="editProfile" component={EditProfile} />

        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({

    profileContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom:4

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
