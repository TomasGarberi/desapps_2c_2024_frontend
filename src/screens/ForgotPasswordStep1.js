import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordStep1() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back-icon.png')} style={styles.backIcon} /> 
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-Mail</Text>
        <LinearGradient
          colors={["#902CA5", "#00F0FF"]}
          style={styles.inputGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Escribe tu correo"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </LinearGradient>
      </View>

      {/* Botón de Recuperar */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => navigation.navigate('ForgotPasswordStep2')}
      >
        <Text style={styles.resetText}>Recuperar Contraseña</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 168,
    height: 150,
    position: 'absolute',
    top: 166, // Posición Y
    left: 112, // Posición X
  },
  inputContainer: {
    width: 320,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    marginBottom: 5,
  },
  inputGradient: {
    borderRadius: 5,
    padding: 2,
  },
  inputWrapper: {
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    backgroundColor: "transparent",
    padding: 10,
    height: 46,
  },
  resetButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  resetText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
