import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import UserSuggestion from '../components/search/UserSuggestion'; // Componente para cada usuario en la lista de sugerencias

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Datos de ejemplo para sugerencias y resultados
  const exampleSuggestedUsers = [
    { id: 1, username: 'carlos.lopez', name: 'Carlos Lopez', profileImage: 'https://picsum.photos/50/50?1' },
    { id: 2, username: 'ana.garcia', name: 'Ana Garcia', profileImage: 'https://picsum.photos/50/50?2' },
    { id: 3, username: 'maria.fernandez', name: 'Maria Fernandez', profileImage: 'https://picsum.photos/50/50?3' },
    { id: 4, username: 'luis.martinez', name: 'Luis Martinez', profileImage: 'https://picsum.photos/50/50?4' },
    { id: 5, username: 'laura.sanchez', name: 'Laura Sanchez', profileImage: 'https://picsum.photos/50/50?5' },
  ];

  const exampleSearchResults = [
    { id: 6, username: 'carla.mendoza', name: 'Carla Mendoza', profileImage: 'https://picsum.photos/50/50?6' },
    { id: 7, username: 'carla.lopez.mendoza', name: 'Carla Lopez Mendoza', profileImage: 'https://picsum.photos/50/50?7' },
    { id: 8, username: 'carl.mendoza', name: 'Carl Mendoza', profileImage: 'https://picsum.photos/50/50?8' },
  ];

  // Cargar sugerencias de ejemplo
  useEffect(() => {
    setSuggestedUsers(exampleSuggestedUsers);
  }, []);

  // Actualizar resultados de búsqueda cuando cambia el query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        exampleSearchResults.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

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

      {/* Lista de usuarios sugeridos o resultados de búsqueda */}
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
