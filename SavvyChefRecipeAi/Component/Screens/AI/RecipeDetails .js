import React ,{useContext, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GlobalContext from '../Navigation/GlobalContext';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../../Firebase/Config';



const RecipeDetails = ({ route }) => {
    const { recipe } = route.params;
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);



    const { userId } = useContext(GlobalContext);
    



      const saveToFavorites = async () => {
        Alert.alert(
          "Add to Favorites",
          "Do you want to save this recipe to your favorites?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: async () => {
                const docRef = doc(db, 'Personal Details', userId);
                // Use `arrayUnion` to append the new recipe to the existing array of favorites
                await updateDoc(docRef, {
                  // Append to the `favorites` array in the Firestore document
                  favorites: arrayUnion(recipe) // Ensure that `favorites` is set up as an array
                });
                setIsFavorite(true);
              }
            }
          ]
        );
      };
      
        
    // Helper function to render recipe attributes with icons
    const renderAttribute = (iconName, label, content) => (
        <View style={styles.attributeContainer}>
            <Icon name={iconName} size={28} style={styles.attributeIcon} />
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>{label}</Text>
            <Text style={styles.attributeText}>{content}</Text>
        </View>
    );


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={38} color="#f2f2f2" />
            </TouchableOpacity>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <View style={styles.content}>



                <Text style={styles.title}>{recipe.label}</Text>
                {renderAttribute('food-variant', "Cuisine Type:", `${recipe.cuisineType.join(', ')}`)}
                {renderAttribute('clock-outline', "Total Time:", `${recipe.totalTime} minutes`)}
                {renderAttribute('account-group', "Servings: ", `${recipe.yield}`)}
                {renderAttribute('food', "Diet:", ` ${recipe.dietLabels}`)}
                {renderAttribute('food-turkey', "Meal Type:", ` ${recipe.mealType}`)}


                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipe.ingredientLines.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Icon name="circle-medium" size={24} color="#f4511e" />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                ))}



                <Text style={styles.subTitle}>Health Information</Text>
                {recipe.healthLabels.map((label, index) => (
                    <Text key={index} style={styles.healthLabel}>{label}</Text>
                ))}





                {/* Nutrient Details */}
                <Text style={styles.sectionTitle}>Health Related</Text>
                {recipe.cautions.map((label, index) => (
                    <Text key={index} style={styles.healthLabel}>{label}</Text>
                ))}
  <TouchableOpacity
                    style={styles.button}
                    onPress={saveToFavorites}>
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
        top: 5,
        left: 5,
        padding: 8,
        borderRadius: 20,

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
        marginTop: 20,
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

    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#111',
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
});
export default RecipeDetails;