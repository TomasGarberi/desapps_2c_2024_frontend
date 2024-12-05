import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from '../middleware/axios';
import UserSuggestion from '../components/search/UserSuggestion';
import Ionicons from '@expo/vector-icons/Ionicons';

const FollowsScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [followedCount, setFollowedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const fetchFollowedUsers = async () => {
    try {
      // Obtener el ID de usuario
      const idResponse = await axios.get('/users/getId');
      const userId = idResponse.data;

      // Obtener la lista de usuarios seguidos
      const followedResponse = await axios.get(`users/${userId}/followed`);
      const followedList = followedResponse.data;

      setFollowers(followedList);
      setFollowedCount(followedList.length);
    } catch (error) {
      console.error('Error fetching followed users:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]); // Limpiar resultados si no hay búsqueda
    } else {
      const filteredResults = followers.filter((user) => {
        // Verifica si el nombre de usuario contiene la consulta
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(filteredResults); // Setear la lista de resultados filtrados
    }
  };

  useEffect(() => {
    searchUsers();
  }, [searchQuery]);

  // Refresh automático al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchFollowedUsers();
    }, [])
  );

  const renderItem = ({ item }) => <UserSuggestion user={item} />;

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#3B3F58" />
        </TouchableOpacity>
      <Text style={styles.followedCountText}>Seguidos {followedCount} usuarios</Text>

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

      <FlatList
        data={searchQuery.trim() === '' ? followers : searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de tener un campo único como 'id'
        ListEmptyComponent={loading ? <Text>Cargando...</Text> : <Text>No tienes seguidos.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: 202,
    height: 35,
    marginVertical: 15,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
    borderImage: 'linear-gradient(to right, #902CA5, #00F0FF) 1',
    justifyContent: 'center',
  },
  searchInput: {
    paddingHorizontal: 10,
    color: '#000',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  followedCountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 30,
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default FollowsScreen;

