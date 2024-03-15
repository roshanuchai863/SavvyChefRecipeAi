import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles";
import { auth } from "../../../Firebase/Config";
import GlobalContext from './../Navigation/GlobalContext';


// Custom Drawer Content component
const SettingScreen = (props) => {
  const { userData, setCameraPictureCapture, cameraPictureCapture, resetGlobalContext } = useContext(GlobalContext);
  const [profile, setProfile] = useState("");

  const Logout = async () => {
    try {
      await auth.signOut();
      resetGlobalContext();
      // Navigate to the welcome or login screen after logout
      props.navigation.replace('Welcome');
    } catch (error) {
      console.log("Logout Error: ", error);
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
        onPress={() => props.navigation.navigate("Home")}
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
        onPress={() => props.navigation.navigate("Subscription")}
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
    borderWidth:2,
    borderColor:"#EE7214"
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