import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text,Alert, Image, ActivityIndicator ,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EdamanAPP_ID, EdamanAPP_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edaman = () => {
    const navigation = useNavigation();


    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetLocalStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Local storage has been reset.');
        } catch (error) {
            console.error('Error resetting local storage:', error);
        }
    };
    useEffect(() => {
        getRecipes();
        // resetLocalStorage();
    }, [query]);

    // const getRecipes = async () => {
    //     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${EdamanAPP_ID}&app_key=${EdamanAPP_KEY}&from=8&to=12&calories=591-722&health=alcohol-free`);
    //     const data = await response.json();
    //     setTotalResult(data.to);
    //     setRecipes(data.hits);
    // };


    const getRecipes = async () => {
        setIsLoading(true);
        const cacheKey = `edamam-${query}`;
        console.log(`Fetching recipes for query: ${query}`);
        try {
            const cachedData = await AsyncStorage.getItem(cacheKey);
            if (cachedData) {
                console.log("Using cached data");
                setRecipes(JSON.parse(cachedData));
                console.log("cache data:" , JSON.parse(cachedData))
            } else {
                console.log("Fetching data from API");
                const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${EdamanAPP_ID}&app_key=${EdamanAPP_KEY}&from=7&to=10&calories=591-722&health=alcohol-free`);
                const data = await response.json();
                if (data && data.hits && data.hits.length > 0) {
                    await AsyncStorage.setItem(cacheKey, JSON.stringify(data.hits));
                    setRecipes(data.hits);
                    console.log("fetching API data", data.hits);
                } else {
                    console.log("No data found in API response");
                    setRecipes([]); // Clear the recipes if no data is found
                    Alert.alert('No Results', `No recipes found for "${query}"`);

                }
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setRecipes([]); // Clear the recipes on error

        }
        finally {
            setIsLoading(false);
        }
    };

    

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
            {isLoading ? (
                <>
                <ActivityIndicator size="large" color="#EE7214" />
                <Text style={{alignSelf:"center"}}>Loading....</Text>
                </>
            ) : (
            <FlatList
                data={recipes}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { recipe: item.recipe })}>
                        <View style={styles.recipeCard}>
                            <Image source={{ uri: item.recipe.image }} style={styles.image} />
                            <View style={styles.recipeInfo}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {index + 1}. {item.recipe.label}
                                </Text>
                                {/* Only render strings or elements within Text components */}
                                <Text style={styles.ingredients}>
                                    <Text style={{ fontWeight: "500" }}>Meal Type: </Text>
                                    {item.recipe.mealType.join(", ")}
                                </Text>
                                <Text style={styles.ingredients} numberOfLines={3}>
                                    <Text style={{ fontWeight: "500" }}>Ingredients: </Text>
                                    {item.recipe.ingredientLines.join(", ")}
                                </Text>
                            </View>
                        </View>
                    

                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${index}`}
            />
            )}
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
        margin: 8,
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

export default Edaman;


