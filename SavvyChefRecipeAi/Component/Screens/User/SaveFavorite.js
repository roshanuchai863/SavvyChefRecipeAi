import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Animated, TouchableOpacity, FlatList, Text, Alert, Button, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../Navigation/GlobalContext';
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { auth, onAuthStateChanged, db } from "../../../Firebase/Config";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const SaveFavorite = () => {
    const navigation = useNavigation();
    const { userData, userId } = useContext(GlobalContext);
    const [recipes, setRecipes] = useState([]);
    const swipeableRows = useRef([]);

    const renderRightActions = (progress, dragX, onDelete, item, index) => {
        const trans = dragX.interpolate({
            inputRange: [0, 20, 100, 101],
            outputRange: [0, 0, -20, -20],  // Change to animate the button from the right
        });




        return (

            <RectButton style={styles.leftAction} onPress={() => onDelete(item, index)}>

                <View style={styles.deleteIcon}>
                    <Icon name="trash" size={45} color="#fff" /></View>
            </RectButton>
        );
    };

    console.log(userData.favorite)
    useEffect(() => {
        // Convert the favorite recipes object to an array
        if (userData.favorite) {
            setRecipes(Object.values(userData.favorite));
        }
    }, [userData.favorite]);


    const deleteFavorite = async (item, index) => {
        // Show confirmation dialog
        Alert.alert(
            "Remove Favorite",
            "Are you sure you want to remove this recipe from your favorites?",
            [
                // The "No" button
                // Does nothing but dismiss the dialog when pressed
                {
                    text: "No",
                    style: "cancel",
                },
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const docRef = doc(db, "Personal Details", userId);
                            await updateDoc(docRef, {
                                favorites: arrayRemove(item)
                            });

                        

                            swipeableRows.current.forEach((swipeable, key) => {
                                if (key !== index) swipeable?.close();
                            });


                            // If deletion is successful, remove the item from the local state
                            const updatedRecipes = [...recipes];
                            updatedRecipes.splice(index, 1);
                            setRecipes(updatedRecipes);

                        } catch (error) {
                            console.error("Error removing from favorites:", error);
                            // Display error message
                            Alert.alert("Error", "Could not remove from favorites");
                        }
                    },
                },
            ],
            { cancelable: true } // If true, the dialog is dismissible by tapping outside of the alert dialog.
        );
    };



    return (
        <View style={styles.app}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Favorite Recipes</Text>
            </View>

            <FlatList
                data={userData.favorite}
                renderItem={({ item, index }) => (
                    <Swipeable
                        ref={ref => swipeableRows.current[index] = ref}
                        onSwipeableOpen={() => {
                            swipeableRows.current.forEach((swipeable, key) => {
                                if (key !== index) swipeable?.close();
                            });
                        }}
                        renderRightActions={(progress, dragX) =>
                            renderRightActions(progress, dragX, deleteFavorite, item, index)
                        }
                        friction={2} 
                    >


                        <TouchableOpacity onPress={() => navigation.navigate('saveFavoriteView', { recipe: item })}>
                            <View style={styles.recipeCard}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.recipeInfo}>


                                    <Text style={styles.title} numberOfLines={1}>
                                        {item.Title}
                                    </Text>


                                    <Text style={styles.ingredients}>
                                        <Text style={{ fontWeight: "500" }}>Meal Type: </Text>
                                        {item.mealType.join(", ")}
                                    </Text>
                                    <Text style={styles.ingredients} numberOfLines={3}>
                                        <Text style={{ fontWeight: "500" }}>Ingredients: </Text>
                                        {item.ingredient.join(", ")}
                                    </Text>


                                </View>
                            </View>
                        </TouchableOpacity>
                    </Swipeable>

                )}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
};


const styles = StyleSheet.create({

    leftAction: {

        alignItems: "center",
        justifyContent: "center",

        width: "25%",
        backgroundColor: "#FF0000",
        marginTop: 20,
        marginRight: 10,
        borderRadius: 12
    },
    deleteIcon: {
        justifyContent: "center",
        alignItems: "center",
        color: "red",

    },


    header: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#EE7214',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchForm: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        height: 45,
        marginRight: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    searchButton: {
        width: 45,
        height: 45,
        backgroundColor: '#EE7214',
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    recipeCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 10,
        marginTop: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    image: {
        width: 120,
        height: 120,
        margin: 0,
        justifyContent: "flex-end",
        borderRadius: 8
    },

    recipeInfo: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    ingredients: {
        fontSize: 15,
        color: '#333',
        marginTop: 3,
        textAlign: "left",
    },
});

export default SaveFavorite;


