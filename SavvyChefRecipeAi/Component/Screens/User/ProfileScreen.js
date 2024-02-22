import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Dimensions, Text, StyleSheet, Image, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import GbStyle from "../../../Global/Styles"


const ProfileScreen = ({ navigation }) => {

  const [Email, SetEmail] = useState("abc@gamil.com");
  const [password, SetPassword] = useState("Roshanmalla42@dd");
  const [userName, SetUsername] = useState("Roshan Uchai");
  const [secureText, SetSecureText] = useState(true);
  const [contact, setContact] = useState("0412225425")
  const [profile, setProfile] = useState("http://tinyurl.com/rj5jm9br")
  const [PasswordVisbile, setPasswordVisible] = useState("eye-off-outline");

  const passwordVisible = () => {

    if (PasswordVisbile == "eye-off-outline" && password.length == 0) {
      Alert.alert("Warning!!", "Your password Field is empty");
      setPasswordVisible("eye-off-outline")
    }

    else if (PasswordVisbile == "eye-off-outline") {
      setPasswordVisible("eye-outline")
      SetSecureText(false);

    }
    else {
      SetSecureText(true);
      setPasswordVisible("eye-off-outline")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.ProfileImage}>
            <Image source={{ uri: profile }} style={styles.ProfileView} resizeMode={"cover"} />

          </View>


          <View style={styles.PersonalInfoContainer}>

            <View style={styles.DetailContainer}>

              <View style={styles.iconContainer}>
                <Octicons name="person" size={28} color="#625D5D" />
              </View>
              <View style={styles.PersonDetails}>

                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  User Name
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {userName}
                </Text>

              </View>
            </View>


            <View style={[styles.DetailContainer, { maringTop: 10 }]}>

              <View style={styles.iconContainer}>
                <AntDesign name="mail" size={28} color="#625D5D" />

              </View>
              <View style={styles.PersonDetails}>

                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Email
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, marginVertical: 8 }]}>
                  {Email}
                </Text>

              </View>
            </View>



            <View style={[styles.DetailContainer, { maringTop: 10 }]}>

              <View style={styles.iconContainer}>
                <AntDesign name="phone" size={28} color="#625D5D" />
              </View>
              <View style={styles.PersonDetails}>

                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Contact
                </Text>
                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18 }]}>
                  {contact}
                </Text>

              </View>
            </View>



            <View style={[styles.DetailContainer, { maringTop: 10 }]}>

              <View style={styles.iconContainer}>
              <AntDesign name="lock" size={28} color="#625D5D" />
              </View>
              <View style={styles.PersonDetails}>

                <Text style={[GbStyle.colors.buttonText.black, { fontSize: 18, fontWeight: "bold" }]}>
                  Password
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ fontSize: 18, color: "#000000", marginVertical: 8 }}
                    value={password}
                    secureTextEntry={secureText}
                    editable={false}
                    autoComplete="off"
                  />
                  <TouchableOpacity onPress={passwordVisible} >
                    <Ionicons name={PasswordVisbile} size={28} color="black" style={{ marginLeft: 40, alignContent: "center", textAlign: "center" }} />
                  </TouchableOpacity>


                </View>
              </View>



            </View>




            <View style={styles.btnContainer}>

              <TouchableOpacity style={GbStyle.solidButton} onPress={() => navigation.navigate("loginScreen")}>
                <Text style={[GbStyle.ButtonColorAndFontSize]} >Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>





        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>





  )
};


const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "99%",
    backgroundColor: "#ffffff"


  },

  PersonalInfoContainer: {

    padding: 30,
    paddingTop: 5,

  },

  ProfileImage: {
    marginTop: 2,
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

  },


  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },

});

export default ProfileScreen