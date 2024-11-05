import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para almacenar el token

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",  // Add lastname to formData
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar requisitos de contraseña
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Manejar los cambios en los campos
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Verificar si el email ya está en uso
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4002/users/isEmailUsed`, {
        params: { email }
      });
      return response.data;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  // Verificar si el username ya está en uso
  const checkUsernameExists = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:4002/users/isUsernameUsed`, {
        params: { username }
      });
      return response.data;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const handleRegister = async () => {
    console.log("Datos del formulario:", formData);
    let validationErrors = {};
  
    if (!formData.name) {
      validationErrors.name = "El campo de name es obligatorio.";
      console.log("no hay name");
    }

    if (!formData.lastname) {  // Validate lastname
      validationErrors.lastname = "El campo de apellido es obligatorio.";
      console.log("no hay lastname");
    }
  
    if (!formData.username) {
      validationErrors.username = "El campo de username es obligatorio.";
      console.log("no hay user");
    }
  
    if (!formData.email) {
      validationErrors.email = "El campo de email es obligatorio.";
      console.log("no hay mail");
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Por favor, ingrese un email válido.";
    }
  
    if (!formData.password) {
      validationErrors.password = "El campo de contraseña es obligatorio.";
      console.log("no hay pass");
    } else if (!isValidPassword(formData.password)) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.";
    }
  
    if (!isTermsAccepted) {
      Alert.alert("Términos y Condiciones", "Debe aceptar los términos y condiciones para registrarse.");
      console.log("no hay terms");
      return;
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("hay errores");
      return;
    } else {
      setErrors({});
      console.log("Se viene el try de register");
      try {
        const response = await axios.post("http://127.0.0.1:4002/auth/register", {
          name: formData.name,
          lastname: formData.lastname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
  
        if (response.status === 200) {
          console.log("Corrio bien");
          const token = response.data.token; // Suponiendo que el token está en `data.token`
          await AsyncStorage.setItem("authToken", token); // Guardar token
  
          setIsModalVisible(true); // Mostrar mensaje de éxito
        } else if (response.status === 400) {
          // Mostrar error devuelto por el backend
          console.log("Corrio mal");
          Alert.alert("Error de Registro", response.data);
        }
      } catch (error) {
        console.error("Error en registro:", error);
        Alert.alert("Error de Registro", "Hubo un problema al registrar. Inténtelo de nuevo.");
      }
    }
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {["Name", "Lastname", "Username", "Email", "Password"].map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={
                label === "Email" ? "username@mail.com" :
                label === "Password" ? "************" :
                `Escriba su ${label}`
              }
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
              secureTextEntry={label === "Password"}
              value={formData[label.toLowerCase()] || ""} // Asegurarse de que `value` sea correcto
              onChangeText={(text) => handleInputChange(label.toLowerCase(), text)}
            />
          </View>
          {errors[label.toLowerCase()] && <Text style={styles.errorText}>{errors[label.toLowerCase()]}</Text>}
        </View>
      ))}

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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tu username ha sido creado satisfactoriamente.</Text>
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
    marginBottom: 20,
    width: "80%",
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  input: {
    height: 40,
    color: "#FFFFFF",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  termsSwitch: {
    marginRight: 10,
  },
  termsText: {
    color: "#FFFFFF",
  },
  termsBold: {
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#FF4057",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FF4057",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
