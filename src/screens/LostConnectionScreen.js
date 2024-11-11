import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LostConnectionScreen({ onRetry }) {
  return (
    <View style={styles.container}>
      {/* Animación Lottie */}
{/*       <LottieView
        source={require('../assets/animations/lost-connection.json')} 
        autoPlay
        loop
        style={styles.lottieAnimation}
      /> */}

      {/* Mensaje de Conexión Perdida */}
      <Text style={styles.message}>
        Parece que perdiste la conexión. Verifica tu red y vuelve a intentarlo.
      </Text>

      {/* Botón de Reintentar */}
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Intentar de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    width: 148,
    height: 35,
    backgroundColor: '#2B2B2B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
