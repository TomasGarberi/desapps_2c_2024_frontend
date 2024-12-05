import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import UserSuggestion from '../components/search/UserSuggestion';
import axios from '../middleware/axios';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]); // Para mostrar sugerencias aleatorias
  const [searchResults, setSearchResults] = useState([]); // Para mostrar los resultados de la búsqueda
  const [error, setError] = useState(null); // Estado para manejar errores
  const [userId, setUserId] = useState(null);

  // Función para obtener sugerencias de usuarios aleatorios
  const fetchSuggestedUsers = async () => {
    try {
      const idResponse = await axios.get('/users/getId');
      const userId = idResponse.data;
      setUserId(userId);
      const response = await axios.get(`/users/random/${userId}`);
      setSuggestedUsers(response.data);
      setError(null); // Limpiar el error si la llamada fue exitosa
    } catch (error) {
      console.error('Error fetching suggested users:', error);
      setError('No se pudieron obtener sugerencias. Intenta de nuevo más tarde.');
    }
  };

  // Función para realizar la búsqueda de usuarios
  const searchUsers = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]); // Limpiar resultados si no hay búsqueda
    } else {
      try {
        const response = await axios.get(`/users/search/${searchQuery}`);
        if (Array.isArray(response.data)) {
          const filteredResults = response.data.filter((user) => user.id !== userId);
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]); // Si no es un array, no hay resultados
          setError('No se encontraron usuarios.');
        }
        setError(null); // Limpiar el error si la búsqueda fue exitosa
      } catch (error) {
        console.error('Error searching users:', error);
        setError('No se pudo realizar la búsqueda. Intenta de nuevo más tarde.');
      }
    }
  };

  // Efecto para realizar la búsqueda cuando cambia el query
  useEffect(() => {
    searchUsers();
  }, [searchQuery]);

  // Reset automático al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      // Restablecer los estados al enfocar la pantalla
      setSearchQuery('');
      setSuggestedUsers([]);
      setSearchResults([]);
      setError(null);

      // Volver a cargar sugerencias de usuarios
      fetchSuggestedUsers();
    }, [])
  );

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
    height: 40,
    marginVertical: 20,
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

