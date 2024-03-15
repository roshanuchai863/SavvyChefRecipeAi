import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <View style={styles.recipe}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient.text}</Text>
        ))}
      </ScrollView>
      <Text style={styles.calories}>Calories: {calories.toFixed()}</Text>
      <Image style={styles.image} source={{ uri: image }} />
    </View>
  );
};

const styles = StyleSheet.create({
  recipe: {
    borderRadius: 10,
    shadowColor: "#474747",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5, 
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
    minWidth: '40%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredientsList: {
    marginVertical: 10,
  },
  ingredient: {
    fontSize: 16,
  },
  calories: {
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default Recipe;
