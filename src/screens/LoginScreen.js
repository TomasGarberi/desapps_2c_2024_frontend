import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>LATTICE</Text>
      
      {/* Input de Usuario */}
      <TextInput 
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#FFFFFF"
      />
      
      {/* Input de Contraseña */}
      <TextInput 
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#FFFFFF"
        secureTextEntry
      />
      
      {/* Botón de Ingreso */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Ingresar</Text>
      </TouchableOpacity>
      
      {/* Botón de Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      {/* Texto de Registro */}
      <Text style={styles.registerText}>¿No tenes Cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'radial-gradient(circle, #FF6F61, #3B3F58)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#292634',
    width: 319,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#FF4057',
    width: 319,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  registerText: {
    color: '#FFFFFF',
    marginTop: 20,
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});

