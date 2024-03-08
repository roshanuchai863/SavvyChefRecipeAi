import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Dimensions, Text, StyleSheet, Image, View, ActivityIndicator, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import GbStyle from "../../../Global/Styles";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../../Firebase/Config"
import { doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { EvilIcons } from '@expo/vector-icons';

const SettingScreen = () => {
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const navigation = useNavigation();

  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [profile, setProfile] = useState("");


  const getData = async () => {

    try {
      const email = await AsyncStorage.getItem('email');
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const profile = await AsyncStorage.getItem('profile'); // Fixed to correctly retrieve 'profile'


      setEmail(email || "");
      SetFirstName(firstName || "");
      SetLastName(lastName || "");
      setProfile(profile || "");


    } catch (e) {
      console.log("Error loading data in setting screen", e);
      alert("Could not load the data");
    }
  };

  const Logout = async () => {

    try {
      await auth.signOut();
      navigation.navigate("welcomeScreen")
    } catch (error) {
      console.log("Logout Error: ", error)
    }



  }


  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [userId])
  );



  if (error) {
    return <View><Text>Error: {error}</Text></View>;
  }



  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


          <View style={styles.Headercontainer}>

            <View style={styles.ProfileImage}>
              <Image source={profile ? { uri: profile } : GbStyle.ProfileIcon} style={styles.ProfileView} resizeMode={"cover"} />

            </View>


            <View style={styles.headerDetails}>

              <Text style={[GbStyle.colors.buttonText.black, GbStyle.mainTitle, { fontSize: 26, color: "#000000", textAlign: 'left' }]}>
                {firstName + " " + lastName}
              </Text>

              <Text style={[GbStyle.colors.buttonText.black, { fontSize: 16, textAlign: 'left' }]}>
                {email}
              </Text>
            </View>
          </View>

          <View style={{ width: "98%", borderColor: "#C8C8C8", borderWidth: 1, justifyContent: "center", alignItems: 'center', alignSelf: "center", margin: 20 }}></View>


          <View style={styles.PersonalInfoContainer}>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <View style={styles.DetailContainer}>

                <AntDesign name="home" size={30} color="#625D5D" />

                <View style={styles.PersonDetails}>
                  <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                    Home
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ marginTop: 25 }}>

              <View style={styles.DetailContainer}>

                <FontAwesome5 name="user" size={30} color="#625D5D" />

                <View style={styles.PersonDetails}>
                  <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                    Profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ marginTop: 25 }}>

              <View style={styles.DetailContainer}>

                <AntDesign name="creditcard" size={30} color="black" />

                <View style={styles.PersonDetails}>
                  <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                    Subscription
                  </Text>
                </View>

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={Logout} style={{ marginTop: 25 }}>

              <View style={styles.DetailContainer}>

                <MaterialIcons name="logout" size={30} color="black" />

                <View style={styles.PersonDetails}>
                  <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                    Logout
                  </Text>
                </View>

              </View>
            </TouchableOpacity>
          </View>



        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 10,
    borderWidth: 3
  },



  Headercontainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 40
  },


  ProfileImage: {
    width: 100,

    height: 100,


  },
  ProfileView: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#EE7214',
    borderWidth: 2,
    marginLeft: 7,
  },

  PersonalInfoContainer: {

    padding: 10,
    paddingTop: 5,

  },
  iconContainer: {
    borderWidth: 2,
    borderColor: "#EE7214",
    alignItems: 'center',

    alignContent: "center",
    justifyContent: "center",
    padding: 13,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').width * 0.14,
  },


  PersonDetails: {
    width: "100%",
    flexDirection: "column",
    marginHorizontal: 20

  },


  DetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerDetails: {
    width: "100%",
    flexDirection: "column",
    marginHorizontal: 25,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20

  },


  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },

});

export default SettingScreen