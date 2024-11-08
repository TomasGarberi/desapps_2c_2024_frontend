import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHome from '../components/home/WelcomeHome';

export default function HomeScreen({ navigation }) {  // Agrega navigation aquí
  const posts = []; // Simulación de publicaciones (vacío para mostrar WelcomeHome)

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <View style={styles.content}>
        {posts.length === 0 ? <WelcomeHome /> : <Text>No hay publicaciones</Text>}
      </View>

      {/* Footer */}
      <Footer navigation={navigation} /> {/* Pasa navigation al Footer */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0', // Fondo suave para una mejor experiencia visual
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
