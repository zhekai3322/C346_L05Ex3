import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';

const ELEMENTS = {
  Fire: { color: 'rgba(255,69,0,0.6)', icon: '🔥' },
  Water: { color: 'rgba(30,144,255,0.42)', icon: '💧' },
  Grass: { color: 'rgba(50,205,50,0.4)', icon: '🌿' },
  Electric: { color: 'rgba(255,215,0,0.39)', icon: '⚡' },
  Psychic: { color: 'rgba(147,112,219,0.66)', icon: '🧠' },
};

const POKEMONS = {
  Fire: [
    { name: 'Charmander', id: 4 },
    { name: 'Vulpix', id: 37 },
  ],
  Water: [
    { name: 'Squirtle', id: 7 },
    { name: 'Psyduck', id: 54 },
  ],
  Grass: [
    { name: 'Bulbasaur', id: 1 },
    { name: 'Oddish', id: 43 },
  ],
  Electric: [
    { name: 'Pikachu', id: 25 },
    { name: 'Magnemite', id: 81 },
  ],
  Psychic: [
    { name: 'Abra', id: 63 },
    { name: 'Psyduck', id: 54 }, // Reusing Psyduck for demonstration
  ],
};

const getPokemonImageUrl = (id) => `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${id}-2x.png`;

const PokemonItem = ({ pokemon }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Image source={{ uri: getPokemonImageUrl(pokemon.id) }} style={styles.image} />
    </TouchableOpacity>
);

const PokemonList = ({ element }) => (
    <View style={[styles.section, { backgroundColor: ELEMENTS[element].color }]}>
      <Text style={styles.header}>{ELEMENTS[element].icon} {element}</Text>
      <FlatList
          data={POKEMONS[element]}
          renderItem={({ item }) => <PokemonItem pokemon={item} />}
          keyExtractor={(item) => item.id.toString()}
      />
    </View>
);

const App = () => {
  // Create a combined array of sections for FlatList
  const sections = Object.keys(POKEMONS).map((element) => ({
    title: element,
    data: POKEMONS[element],
  }));

  return (
      <FlatList
          data={sections}
          renderItem={({ item }) => (
              <PokemonList element={item.title} />
          )}
          keyExtractor={(item) => item.title}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>My Pokémon Card List</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.buttonText}>Add Pokémon</Text>
              </TouchableOpacity>
            </>
          }
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 140,
  },
});

export default App;
