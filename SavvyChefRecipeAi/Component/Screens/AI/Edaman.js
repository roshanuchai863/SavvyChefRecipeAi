import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EdamanAPP_ID, EdamanAPP_KEY } from '@env';
const Edaman = () => {


    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');
    const [totalResult, setTotalResult] = useState(0);


    // useEffect(() => {
    //     getRecipes();
    // }, [query]);

    // const getRecipes = async () => {
    //     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20&calories=591-722&health=alcohol-free`);
    //     const data = await response.json();
    //     setTotalResult(data.to);
    //     setRecipes(data.hits);
    // };


    const localRecipesData = [
        {
            recipe: {
                label: "Chicken Parmesan",
                image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Chicken+Parmesan",
                calories: 400,
                mealType: ["Dinner"], dietLables: ["Low-Carb"],
                ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Beef Stroganoff",
                image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Beef+Stroganoff",
                calories: 700,
                mealType: ["Dinner"], dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Vegetarian Pizza Vegetarian Pizza Vegetarian Pizza Vegetarian Pizza Vegetarian Pizza",
                image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Vegetarian+Pizza",
                calories: 250,
                mealType: ["Lunch", "Dinner"], dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Quinoa Salad",
                image: "https://via.placeholder.com/150/F000F0/FFFFFF?text=Quinoa+Salad",
                calories: 180,
                mealType: ["Lunch"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Spaghetti Carbonara",
                image: "https://via.placeholder.com/150/FFFF00/FFFFFF?text=Spaghetti+Carbonara",
                calories: 500,
                mealType: ["Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Classic Burger",
                image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Classic+Burger",
                calories: 800,
                mealType: ["Lunch", "Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Sushi Platter",
                image: "https://via.placeholder.com/150/00FFFF/FFFFFF?text=Sushi+Platter",
                calories: 600,
                mealType: ["Lunch", "Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Mushroom Risotto",
                image: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Mushroom+Risotto",
                calories: 350,
                mealType: ["Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Tofu Stir Fry",
                image: "https://via.placeholder.com/150/000000/FFFFFF?text=Tofu+Stir+Fry",
                calories: 250,
                mealType: ["Lunch", "Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
        {
            recipe: {
                label: "Lentil Soup",
                image: "https://via.placeholder.com/150/800080/FFFFFF?text=Lentil+Soup",
                calories: 220,
                mealType: ["Lunch", "Dinner"],
                dietLables: ["Low-Carb"], ingredients: [
                    "4 boneless, skinless chicken breasts",
                    "1 cup grated parmesan cheese",
                    "1 cup marinara sauce",
                    "2 teaspoons olive oil",
                    "1 teaspoon salt",
                    "1/2 teaspoon black pepper",
                ],
            },
        },
    ];


    useEffect(() => {
        console.log(EdamanAPP_ID + " " + EdamanAPP_KEY)
        setRecipes(localRecipesData);
        setTotalResult(localRecipesData.length);
    }, [query]);



    return (
        <View style={styles.app}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Recipe Finder</Text>
            </View>

            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchBar}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search for recipes"
                    placeholderTextColor="#B1B1B1"
                />
                <TouchableOpacity onPress={() => setQuery(search)} style={styles.searchButton}>
                    <Icon name="search" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={recipes}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeCard}>
                        <Image source={{ uri: item.recipe.image }} style={styles.image} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.title} numberOfLines={1}>
                                {index + 1}. {item.recipe.label}
                            </Text>
                            <Text style={styles.ingredients}>
                                <Text style={{ fontWeight: "500" }}>Meal Type: </Text> 
                                {item.recipe.mealType}
                            </Text>
                            <Text style={styles.ingredients} numberOfLines={3}>
                                <Text style={{ fontWeight: "500" }}>Ingredient: </Text>
                                {item.recipe.ingredients}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#FAFAFA', 
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
        shadowOffset: {width: 0, height: 1},
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
        shadowOffset: {width: 0, height: 1},
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
        margin: 8,
        borderRadius:8
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

export default Edaman;
