import React from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ImageBackground, Button, SafeAreaView } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import GbStyle from "../../../Global/Styles"

// This is the Welcome Screen for the SavvyChef Recipe App. It allows users to navigate to either the Sign Up or Login screens.

const WelcomeScreen = ({ navigation }) => {

    return (

        <ImageBackground source={GbStyle.welcomeScreenBg} resizeMode='cover' blurRadius={3} style={styles.bgImage} >
            <SafeAreaView style={styles.container}>

                <View style={styles.headertextContainer}>
                    <Text style={[GbStyle.NormalText, { marginStart: "6%", textAlign: "left", alignSelf: "flex-start" }]}>
                        Welcome to
                    </Text>
                    <Text style={[GbStyle.mainTitle, { marginStart: "6%", textAlign: "left" }]}>
                        SavvyChef Recipe
                    </Text>
                    <Text style={[GbStyle.NormalText, { marginStart: "6%", paddingTop: 0, textAlign: "left", alignSelf: "flex-start" }]}>
                        Explore world of Delicious Food Recipe
                    </Text>
                    <Text style={[GbStyle.NormalText, { marginStart: "6%", paddingTop: 30, textAlign: "left", alignSelf: "flex-start" }]}>
                        Let's Get Started...
                    </Text>
                </View>

                <View style={styles.btnContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={GbStyle.transparentButton}>
                        <Text style={GbStyle.ButtonColorAndFontSize} >Register</Text>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={[GbStyle.solidButton, { marginVertical: 20 }]}>
                        <Text style={GbStyle.ButtonColorAndFontSize} >Login</Text>
                    </TouchableOpacity>


                    {/* <View style={GbStyle.HorizentalLine}></View> */}
                </View>


                {/* <View style={styles.SocialbtnContainer}>

                    <TouchableOpacity style={GbStyle.transparentButton} >
                        <Text style={[GbStyle.ButtonColorAndFontSize, { fontSize: 22 }]} >
                            <AntDesign name="google" size={28} color="white" style={{ marginHorizontal: 10 }} />
                            Register with Google</Text>
                    </TouchableOpacity >

                    <TouchableOpacity style={[GbStyle.transparentButton, { marginVertical: 20 }]} >
                        <Text style={[GbStyle.ButtonColorAndFontSize, { fontSize: 22, marginVertical: 10 }]} >
                            <AntDesign name="facebook-square" size={28} color="white" style={{ marginHorizontal: 10 }} />
                            Register with Facebook</Text>
                    </TouchableOpacity>

                </View> */}


            </SafeAreaView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        // justifyContent: "center",
        // overflow: "hidden",

    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },

    headertextContainer: {
        paddingTop: 70,
        paddingLeft: 10,
        paddingRight: 5,
        width: "100%",
        alignContent: "flex-start",
        justifyContentL: "center",
        flexDirection: "column"


    },


    btnContainer: {
        justifyContent: "center",
        alignItems: "center", marginTop: 20

    },


    SocialbtnContainer: {
        width: "100%",
        flex: 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    }

})









export default WelcomeScreen