import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';

// Constants
const TYPE_COLORS = {
  Fire: 'rgba(255,69,0,0.6)',
  Water: 'rgba(30,144,255,0.42)',
  Grass: 'rgba(50,205,50,0.4)',
  Electric: 'rgba(255,215,0,0.39)',
  Psychic: 'rgba(147,112,219,0.66)',
};

const TYPE_ICONS = {
  Fire: '🔥',
  Water: '💧',
  Grass: '🌿',
  Electric: '⚡',
  Psychic: '🧠',
};

const POKEMON_DATA = {
  Fire: [
    { id: 4, name: 'Charmander' },
    { id: 37, name: 'Vulpix' },
  ],
  Water: [
    { id: 7, name: 'Squirtle' },
    { id: 54, name: 'Psyduck' },
  ],
  Grass: [
    { id: 1, name: 'Bulbasaur' },
    { id: 43, name: 'Oddish' },
  ],
  Electric: [
    { id: 25, name: 'Pikachu' },
    { id: 81, name: 'Magnemite' },
  ],
  Psychic: [
    { id: 63, name: 'Abra' },
    { id: 54, name: 'Psyduck' },
  ],
};

// Helper function to get Pokémon image URL
const getPokemonImage = (id) => `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${id}-2x.png`;

// Pokémon item component
const PokemonItem = ({ name, id }) => (
    <TouchableOpacity style={styles.pokemonItem}>
      <Text style={styles.pokemonName}>{name}</Text>
      <Image source={{ uri: getPokemonImage(id) }} style={styles.pokemonImage} />
    </TouchableOpacity>
);

// Pokémon list component
const PokemonList = ({ type }) => (
    <View style={[styles.pokemonList, { backgroundColor: TYPE_COLORS[type] }]}>
      <Text style={styles.pokemonListHeader}>{TYPE_ICONS[type]} {type}</Text>
      <FlatList
          data={POKEMON_DATA[type]}
          renderItem={({ item }) => <PokemonItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
      />
    </View>
);

// Main app component
const App = () => {
  const types = Object.keys(POKEMON_DATA);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>My Pokémon Card List</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Pokémon</Text>
        </TouchableOpacity>
        <FlatList
            data={types}
            renderItem={({ item }) => <PokemonList type={item} />}
            keyExtractor={(item) => item}
        />
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#778380',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
  pokemonList: {
    marginBottom: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pokemonListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  pokemonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonName: {
    fontSize: 18,
  },
  pokemonImage: {
    width: 100,
    height: 140,
  },
});

export default App;
