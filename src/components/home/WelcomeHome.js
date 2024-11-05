import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WelcomeHome() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/animations/welcome_animation.gif')}
        style={styles.image}
        resizeMode="contain" 
      />
      <Text style={styles.welcomeText}>Bienvenido a Lattice</Text>
      <Text style={styles.instructions}>
        Comienza a seguir personas o haz tu primera publicación para ver contenido aquí.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
  },
  image: {
    width: 180, 
    height: 180,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
