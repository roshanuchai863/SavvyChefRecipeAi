import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles"
import { Platform } from 'react-native';

const ResetSuccess = ({ navigation }) => {


  return (


    <ImageBackground source={GbStyle.resetSuccessBg} resizeMode='cover' blurRadius={4} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.MainContainer}>
            <View style={styles.headertextContainer}>

              <TouchableOpacity onPress={() => navigation.navigate("welcomeScreen")}>
                <AntDesign name="arrowleft" size={28} color="white" />
              </TouchableOpacity>

              <Text style={[GbStyle.mainTitle, { textAlign: "left", width: '100%', fontSize: 26 }]}>Password reset e-mail has been sent</Text>
              <Text style={[GbStyle.NormalText, { textAlign: "left", width: '100%' }]}>We have sent an email to your email account with a verification code!</Text>
            </View>


            <View style={styles.btnContainer}>

              <TouchableOpacity style={GbStyle.solidButton} onPress={() => navigation.navigate("loginScreen")}>
                <Text style={GbStyle.ButtonColorAndFontSize} >Return Back</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView></ImageBackground>


  )

}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-start',
  },

  MainContainer: {
    width: "100%",
    padding: 30,
    margin: 3
  },

  headertextContainer: {
    width: "100%",
    alignItems: "flex-start",

  },


  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20


  },



})


export default ResetSuccess