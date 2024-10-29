// src/components/AuthLoading.js

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AuthLoading() {
  const navigation = useNavigation();

  useEffect(() => {
    // Función para verificar el token de autenticación
    const checkAuthToken = async () => {
      try {
        // Verificar si hay un token almacenado
        const userToken = await AsyncStorage.getItem('userToken');

        // Redirigir basado en la existencia del token
        if (userToken) {
          // Si existe un token válido, redirigir a la pantalla principal (Home)
          navigation.navigate('Home');
        } else {
          // Si no hay token o el token es inválido, redirigir a la pantalla de Login
          navigation.navigate('Login');
        }
      } catch (error) {
        // Si hay algún error, redirigir a la pantalla de Login
        navigation.navigate('Login');
      }
    };

    // Llamar a la función de verificación al montar el componente
    checkAuthToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6F61" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3F58',
  },
});
