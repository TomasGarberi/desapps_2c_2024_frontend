import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';
import Post from '../components/home/Post';
import Ad from '../components/home/Ads';
import { SafeAreaView } from 'react-native-web';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from '../middleware/axios';

export default function HomeScreen({ navigation}) { 
  const [ads, setAds] = useState([]);
  const [posts, setPosts] = useState([]); // Estado para almacenar las publicaciones del timeline

  // Función para obtener anuncios
  const getAds = async () => {
    try {
      const res = await axios.get('/ads');
      setAds(res.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  // Función para obtener el timeline del usuario
  const getTimeline = async (userId) => {
    try {
      const res = await axios.get(`posts/timeline/${userId}`);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  useEffect(async () => {
    const idResponse = await axios.get('/users/getId');
    const userId = idResponse.data;
    getAds();
    getTimeline(userId);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            {posts.length === 0 ? <WelcomeHome /> : posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
            {ads.map((ad) => (
              <Ad key={ad.id} ad={ad} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  content: {
    overflow: "auto",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
