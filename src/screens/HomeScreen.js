import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';
import Post from '../components/home/Post';

export default function HomeScreen({ navigation }) {  // Agrega navigation aquí
  const posts = [{
    userImage: 'https://picsum.photos/200/300',
    username: 'ana.garcia',
    location: 'Central Park, New York, NY, USA',
    description: 'Paz y naturaleza en pleno Central Park 🌳. Un rincón perfecto en el corazón de NYC. #CentralPark',
    image: 'https://picsum.photos/200/300',
    timeAgo: 'Hace 7 horas',
  }]; // Simulación de publicaciones (vacío para mostrar WelcomeHome)

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={styles.content}>
        {posts.length === 0 ? <WelcomeHome /> : <Post />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa', // Fondo suave para una mejor experiencia visual
    overflow: "auto"
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
