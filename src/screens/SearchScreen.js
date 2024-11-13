import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import UserSuggestion from '../components/search/UserSuggestion';
import axios from '../middleware/axios';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Llamada al endpoint para obtener usuarios aleatorios
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get('/users/random');
        setSuggestedUsers(response.data);
        console.log(suggestedUsers);
        setError(null); // Limpiar el error si la llamada fue exitosa
      } catch (error) {
        console.error('Error fetching suggested users:', error);
        setError('No se pudieron obtener sugerencias. Intenta de nuevo más tarde.');
      }
    };

    fetchSuggestedUsers();
  }, []);

  // Actualizar resultados de búsqueda cuando cambia el query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        suggestedUsers.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, suggestedUsers]);

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

      {/* Título Dinámico */}
      <Text style={styles.suggestionsTitle}>
        {searchQuery.trim() === '' ? 'Sugerencias' : 'Resultados'}
      </Text>

      {/* Mostrar error si ocurre algún problema */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        // Lista de usuarios sugeridos o resultados de búsqueda
        <FlatList
          data={searchQuery.trim() === '' ? suggestedUsers : searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserSuggestion
              user={item}
              onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
            />
          )}
          contentContainerStyle={styles.suggestionsContainer}
        />
      )}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});
