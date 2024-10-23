import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null; // Esperamos a que carguen las fuentes
  }

  const handleRegister = () => {
    // Lógica de registro aquí
    // Simulación de registro exitoso
    setIsModalVisible(true);
  };

  const handleContinue = () => {
    setIsModalVisible(false);
    navigation.navigate("Login");
  };

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
          <Text style={styles.termsBold} onPress={() => navigation.navigate('TermsScreen')}>
            Términos y Condiciones
          </Text>
        </Text>
      </View>

      {/* Botón de Crear Cuenta */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Crear Cuenta</Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tu usuario ha sido creado satisfactoriamente.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleContinue}>
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#000000",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
