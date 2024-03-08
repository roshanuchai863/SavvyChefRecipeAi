import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../../Firebase/Config";

const HomeScreen = ({ navigation }) => {
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        if (value !== null) {
          setName(value);
          console.log(name)
          // Only navigate after setting the name
          navigation.navigate("Profile");
        }
      } catch (e) {
        console.error("Error reading value from AsyncStorage", e);
      }
    };

    if (userId) { // Ensures there's a logged-in user before fetching
      fetchData();
    }
  }, [userId, navigation]); // Depend on userId and navigation to avoid unnecessary effect runs

  return (
    <Text>{name}</Text> // Display the name to confirm it's being set
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
