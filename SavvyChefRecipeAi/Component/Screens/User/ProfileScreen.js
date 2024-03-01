import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Dimensions, Text, StyleSheet, Image, View, ActivityIndicator, TouchableOpacity, ScrollView, Alert,RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import GbStyle from "../../../Global/Styles";
import { useNavigation } from '@react-navigation/native';
import { auth, db  } from "../../../Firebase/Config"
import { doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';




const ProfileScreen = () => {
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState("");
  const [subscription, SetSubscription] = useState("");
  const [dailyLimit, SetDailyLimit] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);


  const firestoreRetrive = async () => {
    setLoading(true);
    const docRef = doc(db, "Personal Details", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.exists()); // Check if the document exists
        console.log(docSnap.data());
       
       await setEmail(docSnap.data().UserDetails.Email || "");
       await  SetFirstName(docSnap.data().UserDetails.FirstName || "");
       await SetLastName(docSnap.data().UserDetails.LastName || "");
       await  setContact(docSnap.data().UserDetails.Phone || "");
       await setProfile(docSnap.data().UserDetails.ProfileImage || "");
       await SetSubscription(docSnap.data().Payment.SubscriptionStatus || "");
       await SetDailyLimit(docSnap.data().Payment.DailyLimit || "");


      } else {
        console.log("No such document!");
        setError('No such document!');
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      firestoreRetrive();
    }, [userId])
  );


// useEffect(()=>{
//   firestoreRetrive();
// },[]);



  if (loading) {
    return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", flexDirection:"column",}}>
  <ActivityIndicator size="small" color="#625D5D" style={{ transform: [{ scale: 3.5 }] }} />
  <Text style={{color:"#000000", marginTop:35}}>Loading....</Text>
    
    </View>
    
    )
  }

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
              {firstName + " " + lastName}
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
                  {email}
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
                  {contact}
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
                  {subscription}
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
                  {dailyLimit}
                </Text>
              </View>
            </View>



            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={GbStyle.solidButton}
                onPress={() => navigation.navigate("editProfile", {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,

                  contact: contact,
                  profile: profile
                })}>
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
    borderWidth: 3
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