import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

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

      {/* Campos de entrada */}
      {["Nombre", "Usuario", "Email", "Contraseña"].map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <LinearGradient
            colors={["#902CA5", "#00F0FF"]}
            style={styles.inputGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder={
                  label === "Email" ? "usuario@mail.com" : 
                  label === "Contraseña" ? "************" : 
                  `Escriba su ${label}`
                }
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={styles.input}
                secureTextEntry={label === "Contraseña"}
              />
            </View>
          </LinearGradient>
        </View>
      ))}

      {/* Switch de términos y condiciones */}
      <View style={styles.termsContainer}>
        <Switch
          value={isTermsAccepted}
          onValueChange={setIsTermsAccepted}
          trackColor={{ false: "#FFFFFF", true: "#FF4057" }}
          thumbColor="#FFFFFF"
          style={styles.termsSwitch}
        />
        <Text style={styles.termsText}>
          Acepto los{" "}
          <Text style={styles.termsBold} onPress={() => alert('Mostrar términos y condiciones')}>
            Términos y Condiciones
          </Text>
        </Text>
      </View>

      {/* Botón de Crear Cuenta */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
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
    padding: 1,
  },
  inputWrapper: {
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    padding: 10,
  },
  termsContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  termsSwitch: {
    marginRight: 10,
  },
  termsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
  },
  termsBold: {
    fontFamily: "Roboto_700Bold",
    textDecorationLine: "underline",
  },
  registerButton: {
    width: "80%",
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
