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

export default function HomeScreen({ navigation }) { 
  const [ads, setAds] = useState([]);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idResponse = await axios.get('/users/getId');
        const userId = idResponse.data;
        await getAds();
        await getTimeline(userId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  // Función para renderizar contenido con anuncios intercalados
  const renderContentWithAds = () => {
    const content = [];
    let adsIndex = 0;

    posts.forEach((post, index) => {
      content.push(<Post key={`post-${post.id}`} post={post} />);
      // Insertar un anuncio después de cada 3 posts, si hay anuncios disponibles
      if ((index + 1) % 3 === 0 && ads.length > 0) {
        const ad = ads[adsIndex % ads.length]; // Usar los anuncios de forma cíclica
        content.push(<Ad key={`ad-${ad.id}-${index}`} ad={ad} />);
        adsIndex += 1;
      }
    });

    return content;
  };

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            {posts.length === 0 ? (
              <WelcomeHome />
            ) : (
              renderContentWithAds()
            )}
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

