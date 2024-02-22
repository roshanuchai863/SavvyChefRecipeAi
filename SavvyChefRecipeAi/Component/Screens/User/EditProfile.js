import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, Image, View, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles"
import ImageUpload from '../UploadImage';




const EditProfile = ({ navigation, ProfileImage,onUpload  }) => {

  const [Email, SetEmail] = useState("9221@ait.nsw.edu.au");
  const [password, SetPassword] = useState("abcd");
  const [userName, SetUsername] = useState("Roshan Uchai");
  const [contact, setContact] = useState("0441112233")
  const [profile, setProfile] =  useState(""); //http://tinyurl.com/rj5jm9br
  const [secureText, SetSecureText] = useState(true);
  const [PasswordVisbile, setPasswordVisible] = useState("eye-off-outline");
  const [modalVisible, setModalVisible] = useState(false);  // upload image  modal
  const [profileImageUrl, setProfileImageUrl] = useState('');

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
  
  const handleImageUpload = (url) => {
    setProfile(url);
    setModalVisible(false);

    console.warn("Url of iamge: " , profile)
    console.console("Url of : " , url)
  };





  return (
    <SafeAreaView >
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <View style={styles.ProfileImage}>
              <Image source={{ uri:profile}} style={styles.ProfileView} resizeMode={"cover"} />
              <View style={styles.cameraIconContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="camera" size={30} color="#EE7214" style={styles.cameraIcon} />
               
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.inputFieldContainer}>

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Your Name</Text>
              <View style={styles.inputFieldcontainer}>
                <Octicons name="person" size={28} color="#625D5D" />
                <TextInput value={userName} placeholder="Roshan Uchai" placeholderTextColor={"#000000"} onChangeText={SetUsername} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />
              </View>

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Email</Text>

              <View style={[styles.inputFieldcontainer]}>
                <AntDesign name="mail" size={28} color="#625D5D" />
                <TextInput value={Email} placeholder={Email} placeholderTextColor={"#000000"} onChangeText={SetEmail} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />

              </View>

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Contact</Text>

              <View style={[styles.inputFieldcontainer]}>
                <AntDesign name="phone" size={28} color="#625D5D" />
                <TextInput value={contact} placeholder={contact} placeholderTextColor={"#000000"} onChangeText={SetEmail} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />

              </View>


              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Password</Text>

              <View style={styles.inputFieldcontainer}>
              <AntDesign name="lock" size={28} color="#625D5D" />
                <TextInput value={password} placeholder={password} placeholderTextColor={"#000000"} onChangeText={SetPassword} secureTextEntry={secureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />

                <TouchableOpacity onPress={passwordVisible}>
                  <Ionicons name={PasswordVisbile} size={28} color="#625D5D" style={{ marginLeft: -20 }} />
                </TouchableOpacity>
              </View>


            </View>


            <View style={styles.btnContainer}>

              <TouchableOpacity style={GbStyle.solidButton} onPress={() => navigation.navigate("loginScreen")}>
                <Text style={[GbStyle.ButtonColorAndFontSize]} >Edit Profile</Text>
              </TouchableOpacity>
            </View>

      {/* ImageUpload modal */}
      <ImageUpload isVisible={modalVisible} onClose={() => setModalVisible(false)} onUpload={handleImageUpload} />
   
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>





  )
}


const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
    padding: 30

  },

  inputFieldcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10
  },

  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 10,
    flexWrap: "wrap",
  },

  ProfileImage: {
    marginTop: 2,
    width: 200,
    alignSelf: "center",
    height: 200,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",


  },

  ProfileView: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#EE7214',
    borderWidth: 4,
    marginLeft: 25,
    marginHorizontal: -45

  },

  cameraIconContainer: {
    marginTop: 125,
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    borderColor: '#EE7214',
  },

  cameraIcon: {
    padding: 5.5,
    alignSelf: "center"
  },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },

})

export default EditProfile