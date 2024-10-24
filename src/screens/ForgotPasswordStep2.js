import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordStep2() {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <Image source={require("../assets/back-icon.png")} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Campos de Código */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      {/* Texto de instrucciones */}
      <Text style={styles.instructionsText}>
        Completa con el código de cuatro dígitos que te enviamos por mail
      </Text>

      {/* Botón de Validar */}
      <TouchableOpacity
        style={styles.validateButton}
        onPress={() => navigation.navigate('ForgotPasswordStep3')}
      >
        <Text style={styles.validateText}>Validar</Text>
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
    marginBottom: 40, // Ajustamos la separación
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 30,
    gap: 10,
  },
  inputGradient: {
    width: 46,
    height: 46,
    borderRadius: 5,
    padding: 2,
  },
  codeInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    backgroundColor: "transparent",
    textAlign: "center",
    width: 46,
    height: 46,
    borderImageSlice: 1,
    borderWidth: '2px',
    borderImageSource: 'linear-gradient(45deg, #902CA5, #00F0FF)',
  },
  instructionsText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    marginBottom: 30,
  },
  validateButton: {
    width: 320,
    height: 46,
    backgroundColor: "#FF4057",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  validateText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
