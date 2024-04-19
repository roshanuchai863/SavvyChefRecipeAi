import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SaveFavoriteView = ({ route }) => {
    const { recipe } = route.params;
    const navigation = useNavigation();

    const renderAttribute = (iconName, label, content) => (
        <View style={styles.attributeContainer}>
            <Icon name={iconName} size={28} style={styles.attributeIcon} />
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{label}</Text>
            <Text style={styles.attributeText}>{Array.isArray(content) ? content.join(', ') : content}</Text>
        </View>
    );


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={38} color="#f2f2f2" />
            </TouchableOpacity>
            <Image source={{ uri: recipe.image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{recipe.Title}</Text>
                {renderAttribute('food-variant', "Cuisine Type: ", recipe.cuisineType)}
                {renderAttribute('account-group', "Servings: ", recipe.Servings)}
                {renderAttribute('food', "Diet: ", recipe.Diet)}
                {renderAttribute('food-turkey', "Meal Type: ", recipe.mealType)}

                <View style={{ marginTop: 30 }}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    {Array.isArray(recipe.ingredient) ? recipe.ingredient.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientItem}>
                            <Icon name="circle-medium" size={24} color="#f4511e" />
                            <Text style={styles.ingredientText}>{ingredient}</Text>
                        </View>
                    )) : <Text style={styles.ingredientText}>No ingredients found</Text>}
                </View>
                
                {/* Assuming cookingInstructions is a string */}
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.sectionTitle}>Cooking Instructions By GPTAI</Text>
                    <Text style={styles.instructionsText}>{recipe.cookingInstructions || 'No cooking instructions found'}</Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text style={styles.sectionTitle}>Health Information</Text>
                    {Array.isArray(recipe.healthLabels) ? recipe.healthLabels.map((label, index) => (
                        <Text key={index} style={styles.healthLabel}>{label}</Text>
                    )) : <Text style={styles.healthLabel}>No health information found</Text>}
                </View>

         
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
export default SaveFavoriteView;