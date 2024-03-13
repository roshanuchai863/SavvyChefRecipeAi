import React, { useEffect, useState, useContext } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, Image, View, TextInput, ActivityIndicator, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles";
import ImageUpload from '../UploadImage';
import { auth, db, updatePassword, reauthenticateWithCredential, EmailAuthProvider, storage } from "../../../Firebase/Config";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import GlobalContext from '../Navigation/GlobalContext';
import * as Progress from 'react-native-progress';



const EditProfile = ({ navigation }) => {
  const { userData, setCameraPictureCapture, CameraPictureCapture } = useContext(GlobalContext);
  const user = auth.currentUser;



  // State variables for form fields and UI state management
  const [newPasswordVisible, setNewPasswordVisible] = useState(false); 
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [firstName, setFirstname] = useState(userData?.firstName || "");
  const [lastName, setLastname] = useState(userData?.lastName || "");
  const [contact, setContact] = useState(userData?.contact || "");
  const [profile, setProfile] = useState(GbStyle.ProfileIcon);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  // Effect hook to initialize form with user data
  useEffect(() => {
    if (userData) {
      setProfile(userData.profile || "");
      setFirstname(userData.firstName || "");
      setLastname(userData.lastName || "");
      setContact(userData.contact || "");
    } else {
      setError("Couldn't load user data.");
    }
  }, [userData]);


  // Effect hook for handling camera picture capture updates
  useEffect(() => {
    if (CameraPictureCapture) {
      setProfile(CameraPictureCapture);
      setModalVisible(false);
      setCameraPictureCapture(null)
    }
  }, [CameraPictureCapture]);

  // Validation for input fields
  const inputFieldValidation = () => {

    if (firstName.length <= 2) {
      alert("First Name is empty & must be at least 3 letters long.")
      return false
    }
    if (lastName.length <= 2) {
      alert("Last Name is empty & must be at least 3 letters long.")
      return false
    }
    if (contact.length != 10 && contact.length >= 1) {
      alert("Contact Number Must be 10 digit")
      return false;
    }



    return true;
  }

  // Toggle visibility of new password
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleImageUpload = (url) => {
    setProfile(url);
    setModalVisible(false);
  };

  // Upload profile image to Firebase Storage
  const uploadProfileImage = async () => {
    if (!profile) {
      console.error("No profile image selected");
      return null; // Return null if no profile image to upload
    }

    try {
      const response = await fetch(profile);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error during image upload:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadProgress(0);
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      setError("Failed to upload profile image.");
      return null; // Return null if upload fails
    }
  };

  // Update user profile data
  const updateData = async () => {
    if (!inputFieldValidation()) {
      return; // Stop the function if validation fails
    }
    setIsLoading(true); // Start loading

    try {
      const profileImageUrl = await uploadProfileImage(); // Upload and get the URL only if changed

      // Prepare update payload
      const updatePayload = {
        "UserDetails.FirstName": firstName,
        "UserDetails.LastName": lastName,
        "UserDetails.Phone": contact,
      };

      if (profileImageUrl) {
        updatePayload["UserDetails.ProfileImage"] = profileImageUrl;
      }

      // Update Firestore document
      const userDocRef = doc(db, "Personal Details", user.uid);
      await updateDoc(userDocRef, updatePayload);

      // Update password if necessary
      if (currentPassword && newPassword) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert('Password updated successfully.');
      }

      alert('Profile updated successfully.');
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(`Error updating profile: ${error.message}`);
      alert('Error updating. Try Again');
    }
    setIsLoading(false);
  };

  // Navigate to camera for picture capture
  function CameraCaptionNavigation() {
    setModalVisible(false)
    navigation.navigate('Camera');
  }





  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>

        <ScrollView>
          <View style={styles.container}>
            {isLoading ? (
              <View style={styles.loadingContainer}>

                {/* Additional components for cleaner main function */}

                <ActivityIndicator size="large" color="#0000ff" />
                <View style={styles.uploadProgressContainer}>
                  <Text>Please Wait....</Text>

                  <View style={{ marginTop: 10 }}>
                    {uploadProgress > 0 && (
                      <Text>Update Complete: {uploadProgress.toFixed(0)}%</Text>
                    )}
                  </View>
                  <View style={{ marginTop: 20 }}>

                    {uploadProgress > 0 && (
                      <Progress.Bar progress={uploadProgress / 100} width={200} />
                    )}
                  </View>
                </View>

              </View>
            ) : (
              <>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={28} color="black" />
                </TouchableOpacity>


                <View style={styles.ProfileImage}>
                  <Image source={typeof profile === 'string' ? { uri: profile } : profile} style={styles.ProfileView} resizeMode="cover" />
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
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstname}
                      placeholder="First Name"
                      placeholderTextColor="#000000"
                      style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]}
                    />
                  </View>

                  <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Last Name</Text>
                  <View style={styles.inputFieldcontainer}>
                    <Octicons name="person" size={28} color="#625D5D" />
                    <TextInput
                      value={lastName}
                      onChangeText={setLastname}
                      placeholder="Last Name"
                      placeholderTextColor="#000000"
                      style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]}
                    />
                  </View>

                  <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Contact</Text>
                  <View style={styles.inputFieldcontainer}>
                    <AntDesign name="phone" size={28} color="#625D5D" />
                    <TextInput
                      value={contact}
                      onChangeText={setContact}
                      placeholder="Contact Number"
                      placeholderTextColor="#000000"
                      style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]}
                    />
                  </View>

                  <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>Current Password</Text>
                  <View style={styles.inputFieldcontainer}>
                    <AntDesign name="lock" size={28} color="#625D5D" />
                    <TextInput
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                      placeholder="Current Password"
                      placeholderTextColor="#000000"
                      secureTextEntry={!newPasswordVisible}
                      autoComplete='off'
                      style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]}
                    />
                    <TouchableOpacity onPress={toggleNewPasswordVisibility} style={{ marginLeft: -30 }}>
                      <Ionicons name={newPasswordVisible ? "eye" : "eye-off"} size={28} color="#625D5D" />
                    </TouchableOpacity>
                  </View>

                  <Text style={[GbStyle.NormalText, { textAlign: "left", alignSelf: "flex-start", color: "#000000" }]}>New Password</Text>
                  <View style={styles.inputFieldcontainer}>
                    <AntDesign name="lock" size={28} color="#625D5D" />
                    <TextInput
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder="New Password"
                      placeholderTextColor="#000000"
                      secureTextEntry={!newPasswordVisible}
                      autoComplete='off'
                      style={[GbStyle.inputText, { width: "90%", marginLeft: 10, color: "black" }]}
                    />
                  </View>
                </View>


                <View style={styles.btnContainer}>
                  <TouchableOpacity style={GbStyle.solidButton} onPress={updateData}>
                    <Text style={GbStyle.ButtonColorAndFontSize}>Update</Text>
                  </TouchableOpacity>
                </View>



                <ImageUpload isVisible={modalVisible} onClose={() => setModalVisible(false)} onUpload={handleImageUpload} onCameraCapture={CameraCaptionNavigation} />

              </>)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  uploadProgressContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 30,
    justifyContent: "space-between"
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: "auto",
    padding: 30,
    paddingTop: 3
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