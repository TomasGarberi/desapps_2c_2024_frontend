import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';

export default function LoginScreen() {
  const navigation = useNavigation();

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null; // Esperamos a que carguen las fuentes
  }

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

      {/* Texto "¿Olvidaste tu contraseña?" clickeable */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordStep1')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Campo de Usuario */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Usuario</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="usuario@mail.com"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
            />
          </View>
      </View>

      {/* Campo de Contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="************"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>

      {/* Botón de Ingresar */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Ingresar</Text>
      </TouchableOpacity>

      {/* Texto de registro clickeable */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.registerBold}>Regístrate</Text>
        </Text>
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
    marginBottom: 20,  // Separación ajustada
  },
  forgotText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_700Bold",
    marginBottom: 20, // Separación ajustada
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
    background: 'transparent',
    border: '2px solid',
    borderImageSlice: 1,
    borderWidth: '2px',
    borderImageSource: 'linear-gradient(45deg, #902CA5, #00F0FF)',
    borderRadius: '8px',
    padding: '10px',
    color: '#fff',
    outline: 'none',
  },
  loginButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
  },
  registerBold: {
    fontFamily: "Roboto_700Bold",
  },
});
