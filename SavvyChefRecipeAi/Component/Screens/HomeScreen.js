import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { auth, db } from "../../Firebase/Config"





const HomeScreen = ({ navigation }) => {
  const userId = auth.currentUser ? auth.currentUser.uid : null;

useEffect(()=>{

  console.log("userID", userId)
  navigation.navigate("profileScreen")
})

  return (

    <Text></Text>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})