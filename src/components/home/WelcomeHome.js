import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function WelcomeHome() {
  return (
    <View style={styles.container}>
{/*       <LottieView
        source={require('../../assets/animations/welcome_animation.json')}
        autoPlay
        loop
        style={styles.animation}
      /> */}
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
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
  },
  image: {
    width: 100, 
    height: 100,
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
