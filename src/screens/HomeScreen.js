import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';
import Timeline from '../components/home/Timeline';

export default function HomeScreen() {
  // Simulación de posts para decidir qué mostrar
  const posts = []; // Vacío para mostrar WelcomeHome o lleno para Timeline

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <Header />
      
      {/* Contenido dinámico */}
      <View style={styles.content}>
        {posts.length === 0 ? <WelcomeHome /> : <Timeline posts={posts} />}
      </View>
      
      {/* Footer fijo */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
  },
});
