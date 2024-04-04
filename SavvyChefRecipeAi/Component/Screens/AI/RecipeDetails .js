import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../Navigation/GlobalContext';
import { RecipeAI } from './RecipeAI';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../Firebase/Config';

const RecipeDetails = ({ route }) => {
    const { recipe } = route.params;
    const navigation = useNavigation();
    const { userId } = useContext(GlobalContext);

    const [isFavorite, setIsFavorite] = useState(false);
    const [cookingInstructions, setCookingInstructions] = useState('');
    const [hasFetched, setHasFetched] = useState(false);

    const { sendRequest, response, loading, error } = RecipeAI();



    useEffect(() => {
        if (recipe) {
            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Provide detailed cooking instructions  of ${recipe.label} with ingredient of ${recipe.ingredientLines}. List only the detailed cooking instruction only` },];
            sendRequest(messages);
        }
    }, [recipe]);

    useEffect(() => {
        if (response) {
            setCookingInstructions(response);
        }
    }, [response]);


    const saveToFavorites = async () => {
        const alertMessage = "Do you want to save this recipe to your favorites?";
        Alert.alert("Add to Favorites", alertMessage, [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: addToFavorites },
        ]);
    };

    const addToFavorites = async () => {
        const favData = {
            Title: recipe.label,
            cuisineType: recipe.cuisineType,
            Servings: recipe.yield.toString(),
            Diet:recipe.dietLabels,
            mealType: recipe.mealType,
            ingredient: recipe.ingredientLines,
            cookingInstructions: cookingInstructions,
            healthLabels: recipe.healthLabels,
            image: recipe.image

        }

        if (favData) {
            try {
                const docRef = doc(db, 'Personal Details', userId);
                await updateDoc(docRef, { favorites: arrayUnion(favData) });
                setIsFavorite(true);
            } catch (error) {
                console.error("Error adding to favorites:", error);
                Alert.alert("Error", "Could not add to your favorites");
            }
        }
};

const renderAttribute = (iconName, label, content) => (
    <View style={styles.attributeContainer}>
        <Icon name={iconName} size={28} style={styles.attributeIcon} />
        <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{label}</Text>
        <Text style={styles.attributeText}>{content}</Text>
    </View>
);


return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={38} color="#f2f2f2" />
        </TouchableOpacity>
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <View style={styles.content}>
            <Text style={styles.title}>{recipe.label}</Text>
            {renderAttribute('food-variant', "Cuisine Type", recipe.cuisineType.join(', '))}
            {renderAttribute('account-group', "Servings", recipe.yield.toString())}
            {renderAttribute('food', "Diet", recipe.dietLabels.join(', '))}
            {renderAttribute('food-turkey', "Meal Type", recipe.mealType.join(', '))}
            <View style={{ marginTop: 30 }}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipe.ingredientLines.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Icon name="circle-medium" size={24} color="#f4511e" />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                ))}

            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.sectionTitle}>Cooking Instructions By GPTAI</Text>
                {loading ? (
                    <View style={styles.cookingInstructionLoading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={{ marginBottom: 15, alignSelf: 'center' }}>Please wait.....</Text>
                        <Image source={{ uri: 'https://media1.tenor.com/m/3_PeCU-61I4AAAAC/food-cooking.gif' }} style={{ width: 200, height: 200, justifyContent: "center" }} />

                    </View>
                ) : (
                    <Text style={styles.instructionsText}>{cookingInstructions || 'No cooking instructions found'}</Text>
                )}
            </View>

            <View style={{ marginTop: 30 }}>

                <Text style={styles.sectionTitle}>Health Information</Text>
                {recipe.healthLabels.map((label, index) => (
                    <Text key={index} style={styles.healthLabel}>{label}</Text>
                ))}
            </View>



            <TouchableOpacity style={styles.button} onPress={saveToFavorites}>
                <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#fff" />
                <Text style={styles.buttonText}>Add to Favorites</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        position: 'absolute',
        zIndex: 10,
        top: 10,
        left: 15,
        padding: 1,
        borderRadius: 25,
        backgroundColor: 'rgba(105, 105, 105, 0.5)'
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 5,
    },
    attributeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cookingInstructionLoading: {
        flexDirection: "column",
        justifyContent: "center",
        alignContent: 'center',
        alignSelf: 'center'
    },
    attributeIcon: {
        width: 30,
        marginRight: 0,
        color: "#f4511e"
    },
    attributeText: {
        fontSize: 16,
        marginLeft: 3,
        textTransform: "capitalize"
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#EE7214',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold',

    },
    healthLabel: {

        fontSize: 16,
        color: '#111',
        backgroundColor: '#ecf0f1',
        marginBottom: 5,
        borderRadius: 5,
        padding: 5,

    },


    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ingredientText: {
        fontSize: 16,
        color: '#111',
        marginLeft: 5,
        textTransform: "capitalize"
    },



    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructionsText: {
        fontSize: 16,
        color: '#333',
    },
});
export default RecipeDetails;