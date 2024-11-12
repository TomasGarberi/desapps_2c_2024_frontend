import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';
import Post from '../components/home/Post';
import Ad from '../components/home/Ads';
import { SafeAreaView, ScrollView } from 'react-native-web';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from '../middleware/axios';

export default function HomeScreen({ navigation }) {  // Agrega navigation aquí
  const [ads, setAds] = React.useState([]);

  const posts = [{
    userImage: 'https://picsum.photos/200/300',
    username: 'ana.garcia',
    location: 'Central Park, New York, NY, USA',
    description: 'Paz y naturaleza en pleno Central Park 🌳. Un rincón perfecto en el corazón de NYC. #CentralPark',
    image: 'https://picsum.photos/200/300',
    timeAgo: 'Hace 7 horas',
  }]; // Simulación de publicaciones (vacío para mostrar WelcomeHome)

  const getAds = async () => {
    try {
      const res = await axios.get('/ads')
      setAds(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAds()
  }, [])

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView style={styles.scrollView}>
            {posts.length === 0 ? <WelcomeHome /> : <Post />}
            {
              ads.map((ad) => (
                <Ad key={ad.id} ad={ad} />
              ))
            }
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa', // Fondo suave para una mejor experiencia visual
    flex: 1,
  },
  content: {
    overflow: "auto",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
