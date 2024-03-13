import React, { useEffect, useState, useContext } from 'react';
import { KeyboardAvoidingView, Dimensions, Text, StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Platform } from 'react-native';
import GbStyle from "../../../Global/Styles";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import GlobalContext from '../Navigation/GlobalContext';

const ProfileScreen = () => {

  // Local state for handling potential errors and profile image URL
  const [error, setError] = useState();
  const [profile, setProfile] = useState("");

  // Access the global user data from context
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);



  // useEffect hook updates the profile state based on userData changes
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      setError("Couldn't load data");
    } else {
      setError(null);
      setProfile(userData.profile)
    }
  }, [userData]);


  // Render an error message if there is an error state
  if (error) {
    return <View><Text>Error: {error}</Text></View>;
  }



  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.ProfileImage}>
            <Image source={profile ? { uri: profile } : GbStyle.ProfileIcon} style={styles.ProfileView} resizeMode={"cover"} />

          </View>

          <View style={[GbStyle.mainTitle, {}]}>
            <Text style={[GbStyle.colors.buttonText.black, GbStyle.mainTitle, { fontSize: 30, color: "#000000" }]}>
              {userData.firstName + " " + userData.lastName}
            </Text>
          </View>




          <View style={styles.PersonalInfoContainer}>


            <View style={[styles.DetailContainer, { marginTop: 20 }]}>
              <View style={styles.iconContainer}>
                <Zocial name="email" size={24} color="#625D5D" />
              </View>
              <View style={styles.PersonDetails}>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Email
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {/* {email} */}
                  {userData.email}
                </Text>
              </View>
            </View>

            <View style={[styles.DetailContainer, { marginTop: 20 }]}>
              <View style={styles.iconContainer}>
                <AntDesign name="mobile1" size={24} color="#625D5D" />

              </View>
              <View style={styles.PersonDetails}>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Contact
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {/* {contact} */}
                  {userData.contact}
                </Text>
              </View>
            </View>

            <View style={[styles.DetailContainer, { marginTop: 20 }]}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="subscriptions" size={24} color="#625D5D" />

              </View>
              <View style={styles.PersonDetails}>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Subscripton Status
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {userData.subscription}

                </Text>
              </View>
            </View>

            <View style={[styles.DetailContainer, { marginTop: 20 }]}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="coins" size={24} color="#625D5D" />

              </View>
              <View style={styles.PersonDetails}>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Daily Coin
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {userData.dailyLimit}
                </Text>
              </View>
            </View>



            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={GbStyle.solidButton}
                onPress={() => navigation.navigate("editProfile")}>
                <Text style={GbStyle.ButtonColorAndFontSize}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
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
  },

  PersonalInfoContainer: {

    padding: 30,
    paddingTop: 5,

  },

  ProfileImage: {

    width: 200,
    alignSelf: "center",
    height: 200,
    justifyContent: "center",
    alignItems: "center",


  },
  ProfileView: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#EE7214',
    borderWidth: 4,
    marginLeft: 25,
  },

  DetailContainer: {
    flexDirection: "row",
    marginTop: 30
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


  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },

});

export default ProfileScreen