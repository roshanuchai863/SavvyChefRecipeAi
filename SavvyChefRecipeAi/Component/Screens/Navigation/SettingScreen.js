import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles";
import { auth } from "../../../Firebase/Config";
import GlobalContext from './GlobalContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage
  from '@react-native-async-storage/async-storage';
// Custom Drawer Content component
const SettingScreen = (props) => {
  const { userData, setCameraPictureCapture, cameraPictureCapture, resetGlobalContext } = useContext(GlobalContext);
  const [profile, setProfile] = useState("");
  const navigation = useNavigation();

  const Logout = async () => {
    try {
      await auth.signOut();
      resetGlobalContext();
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage has been reset.');
    } catch (error) {
      console.error('Error resetting local storage:', error);
      // Handle specific errors like directory deletion errors here
      if (error.code === 'ENOENT') {
        console.error('Directory or file does not exist.');
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };
  


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
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image source={profile ? { uri: profile } : GbStyle.ProfileIcon} style={styles.profileImage} resizeMode={"cover"} />
        <Text style={styles.userName}>{userData.firstName + " " + userData.lastName}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <View style={styles.divider} />

      <DrawerItem
        icon={() => (
          <AntDesign name="home" size={30} color="#EE7214" style={{ marginRight: -15 }} />
        )}
        label="Home"
        labelStyle={{ color: '#000', fontSize: 16, fontWeight: '400' }}
        onPress={() => props.navigation.navigate("Main")}
      />

      <DrawerItem
        icon={() => (
          <FontAwesome5 name="user" size={30} color="#EE7214" style={{ marginRight: -15 }} />
        )}
        label="Profile"
        labelStyle={{ color: '#000', fontSize: 16, fontWeight: '400' }}
        onPress={() => props.navigation.navigate("Profile")}
      />

      <DrawerItem
        icon={() => (
          <AntDesign name="creditcard" size={30} color="#EE7214" style={{ marginRight: -15 }} />
        )}
        label="Subscription"
        labelStyle={{ color: '#000', fontSize: 16, fontWeight: '400' }}
        onPress={() => props.navigation.navigate("paymentScreen")}
      />

      <DrawerItem
        icon={() => (
          <MaterialIcons name="delete-outline" size={30} color="#EE7214" style={{ marginRight: -15 }} />
        )}
        label="Wipe Local Storage"
        labelStyle={{ color: '#000', fontSize: 16, fontWeight: '400' }}
        onPress={clearAllData}
      />


      <DrawerItem
        icon={() => (
          <MaterialIcons name="logout" size={30} color="#EE7214" style={{ marginRight: -15 }} />
        )}
        label="Logout"
        labelStyle={{ color: '#000', fontSize: 16, fontWeight: '400' }}
        onPress={Logout}
      />

    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#EE7214"
  },
  userName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  userEmail: {
    fontSize: 15,
    color: 'gray',
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  drawerButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingScreen;