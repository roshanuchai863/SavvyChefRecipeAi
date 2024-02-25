import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, Image, View, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles"
import ImageUpload from '../UploadImage';
import { auth, db, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "../../../Firebase/Config"
import { doc, setDoc, updateDoc } from "firebase/firestore";


const EditProfile = ({ navigation, onUpload, route }) => {

  const [currentPasswordVisible, SetcurrentPasswordVisible] = useState("eye-off-outline");
  const [newPasswordVisible, SetNewPasswordVisible] = useState("eye-off-outline");
  const [currentPassword, SetCurrentPassword] = useState("abcd");
  const [newPassword, SetNewPassword] = useState("abcd");
  const [firstName, SetFirstname] = useState("");
  const [lastName, SetLastname] = useState("");
  const [contact, setContact] = useState("")
  const [profile, setProfile] = useState("");
  const [secureText, SetSecureText] = useState(true);
  const [newSecureText, SetNewSecureText] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);  // upload image  modal
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const currentPasswordVisibleIcon = () => {
    SetSecureText(!secureText);
    SetcurrentPasswordVisible(secureText ? "eye-outline" : "eye-off-outline");
  };

  const newPasswordVisibleIcon = () => {
    SetNewSecureText(!newSecureText);
    SetNewPasswordVisible(newSecureText ? "eye-outline" : "eye-off-outline");
  };


  const handleImageUpload = (url) => {
    setProfile(url);
    setModalVisible(false);
  };

  const updateData = async () => {
    try {
      console.warn("update userid", auth.currentUser.uid)
      const userDocRef = doc(db, "Personal Details", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        "UserDetails.FirstName": firstName,
        "UserDetails.LastName": lastName,
        "UserDetails.Phone": contact
        // Add other fields as necessary



      });
      handlePasswordChange()
      alert('updating profile');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Error updating profile');
    }
  }


  useEffect(() => {

    const { firstName, lastName, contact, profile, } = route.params;

    setContact(contact),
      setProfile(profile),
      SetFirstname(firstName)
    SetLastname(lastName)
  }, [route.params])


  const reauthenticateUser = async (currentPassword) => {

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      return true; // Re-authentication successful
    } catch (error) {
      console.error("Re-authentication failed:", error);
      return false; // Re-authentication failed
    }
  };

  const updateUserPassword = async (newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await updatePassword(user, newPassword);
      console.log("Password updated successfully.");
      // Handle post-update logic here, such as displaying a success message
    } catch (error) {
      console.error("Password update failed:", error);
      // Handle errors, such as password not meeting the security requirements
    }
  };

  const handlePasswordChange = async (currentPassword, newPassword) => {
    const isReauthenticated = await reauthenticateUser(currentPassword);

    if (isReauthenticated) {
      await updateUserPassword(newPassword);
      alert("Password has been updated.");
      // Additional actions upon successful update
    } else {
      alert("Current password is incorrect.", currentPassword);
      // Handle incorrect current password case
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>

        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("profileScreen")}>
              <AntDesign name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.ProfileImage}>
              <Image source={profile ? { uri: profile } : GbStyle.ProfileIcon} style={styles.ProfileView} resizeMode={"cover"} />
              <View style={styles.cameraIconContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <AntDesign name="camera" size={30} color="#EE7214" style={styles.cameraIcon} />

                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.inputFieldContainer}>

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>First Name</Text>
              <View style={styles.inputFieldcontainer}>
                <Octicons name="person" size={28} color="#625D5D" />
                <TextInput value={firstName} placeholder="Roshan Uchai" placeholderTextColor={"#000000"} onChangeText={SetFirstname} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />
              </View>

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Last Name</Text>
              <View style={styles.inputFieldcontainer}>
                <Octicons name="person" size={28} color="#625D5D" />
                <TextInput value={lastName} placeholder="Roshan Uchai" placeholderTextColor={"#000000"} onChangeText={SetLastname} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />
              </View>



              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Contact</Text>

              <View style={[styles.inputFieldcontainer]}>
                <AntDesign name="phone" size={28} color="#625D5D" />
                <TextInput value={contact} placeholder={contact} placeholderTextColor={"#000000"} onChangeText={setContact} style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />
              </View>


              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Current Password</Text>

              <View style={styles.inputFieldcontainer}>
                <AntDesign name="lock" size={28} color="#625D5D" />
                <TextInput value={currentPassword} placeholder={currentPassword} placeholderTextColor={"#000000"} onChangeText={SetCurrentPassword} secureTextEntry={secureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />

                <TouchableOpacity onPress={currentPasswordVisibleIcon}>
                  <Ionicons name={currentPasswordVisible} size={28} color="#625D5D" style={{ marginLeft: -20 }} />
                </TouchableOpacity>
              </View> 

              <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>New Password</Text>

              <View style={styles.inputFieldcontainer}>
                <AntDesign name="lock" size={28} color="#625D5D" />
                <TextInput value={newPassword} placeholder={newPassword} placeholderTextColor={"#000000"} onChangeText={SetNewPassword} secureTextEntry={newSecureText} autoComplete='off' style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]} />

                <TouchableOpacity onPress={newPasswordVisibleIcon}>
                  <Ionicons name={newPasswordVisible} size={28} color="#625D5D" style={{ marginLeft: -20 }} />
                </TouchableOpacity>
              </View>


            </View>


            <View style={styles.btnContainer}>

              {/* <TouchableOpacity style={GbStyle.solidButton} onPress={() => navigation.navigate("profileScreen")}> */}
              <TouchableOpacity style={GbStyle.solidButton} onPress={updateData}>
                <Text style={[GbStyle.ButtonColorAndFontSize]} >Update </Text>
              </TouchableOpacity>
            </View>

            {/* ImageUpload modal */}
            <ImageUpload isVisible={modalVisible} onClose={() => setModalVisible(false)} onUpload={handleImageUpload} />

          </View>
        </ScrollView>


      </SafeAreaView>
    </KeyboardAvoidingView>




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