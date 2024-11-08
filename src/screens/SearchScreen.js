import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserSuggestion from '../components/search/UserSuggestion'; // Componente para cada usuario en la lista de sugerencias

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Función para cargar sugerencias aleatorias de usuarios
  useEffect(() => {
    // Aquí realizarías la llamada a la API para obtener usuarios sugeridos
    const fetchSuggestedUsers = async () => {
      try {
        const response = await fetch('https://your-api-url.com/getSuggestedUsers');
        const data = await response.json();
        setSuggestedUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Título de Sugerencias */}
      <Text style={styles.suggestionsTitle}>Sugerencias</Text>

      {/* Lista de usuarios sugeridos */}
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserSuggestion
            user={item}
            onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
          />
        )}
        contentContainerStyle={styles.suggestionsContainer}
      />

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    width: 202,
    height: 35,
    marginVertical: 15,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
    borderImage: 'linear-gradient(to right, #902CA5, #00F0FF) 1',
    backgroundColor: 'rgba(217, 217, 217, 0.26)',
    justifyContent: 'center',
  },
  searchInput: {
    paddingHorizontal: 10,
    color: '#000',
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B3F58',
    marginLeft: 20,
    marginBottom: 10,
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
  },
});
