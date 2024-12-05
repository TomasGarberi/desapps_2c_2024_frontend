import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image,Modal, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "../middleware/axios";

export default function RegisterVerifyScreen() {
    const navigation = useNavigation();
    const [code, setCode] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState(false);
    const [attempts, setAttempts] = useState(0); // Estado para contar los intentos
    const [showError, setShowError] = useState(false); // Estado para mostrar mensaje de error
    const route = useRoute();
    const { formData } = route.params || {};
    const email = formData.email || ""; 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // Nuevo estado para el modal de error
    const [loading, setLoading] =  useState(false);

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text.replace(/[^0-9]/g, ""); // Asegura que solo se ingresen números
        setCode(newCode);
    };

     // Función para verificar el TOTP
     const verifyTotpCode = async (email, code) => {
        try {
            setLoading(true);
            const response = await axios.post("/pass/verify-totp", null, {
                params: { email, totpCode: code.join("") }, // Unimos el código de 4 dígitos en un string
            });
            setLoading(false);
            return response.data.success;
        } catch (error) {
            console.error("Error al verificar el TOTP:", error);
            return false;
        }
    };

    // Manejar la validación y la navegación al siguiente paso
    const handleValidation = async () => {
        if (code.includes("") || code.some((digit) => isNaN(digit))) {
            setErrors(true);
            Alert.alert("Código Incorrecto", "Por favor, ingrese los cuatro dígitos del código.");
        } else {
            setErrors(false);

            const isValid = await verifyTotpCode(email, code);

            if (isValid) {
                Alert.alert("Código Verificado", "El código es correcto.");
                try {
                    const response = await axios.post("/auth/register", {
                        name: formData.name,
                        lastname: formData.lastname,
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        role: formData.role
                    });

                    if (response.status === 200) {
                        setIsModalVisible(true); // Mostrar mensaje de éxito
                    }
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        setIsErrorModalVisible(true); // Mostrar modal de error
                    } else {
                        Alert.alert("Error", "Hubo un problema al registrar. Inténtelo de nuevo.");
                    }
                }
            } else {
                setAttempts((prevAttempts) => prevAttempts + 1);
                setShowError(true);
                if (attempts >= 2) {
                    Alert.alert("Intentos agotados", "Has alcanzado el número máximo de intentos.");
                } else {
                    Alert.alert("Código Incorrecto", "El código ingresado no es válido. Inténtalo de nuevo.");
                }
            }
        }
    };

    const handleContinue = () => {
        setIsModalVisible(false);
        navigation.navigate("Login");
    };

    const handleErrorModalClose = () => {
        setIsErrorModalVisible(false);
        navigation.navigate("Register"); // Navegar de nuevo a la pantalla de registro
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
                        style={[styles.codeInput, errors && digit === "" && styles.errorBorder]}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            {/* Texto de instrucciones */}
            <Text style={styles.instructionsText}>
                Completa con el código de cuatro dígitos que te enviamos por mail
            </Text>

            {/* Mostrar mensaje de error si los intentos fallaron */}
            {showError && attempts < 3 && (
                <Text style={styles.errorText}>
                    Error validando. Intentos restantes: {3 - attempts}
                </Text>
            )}

            {/* Botón de Validar */}
            <TouchableOpacity
                style={[styles.validateButton, { opacity: attempts >= 3 ? 0.5 : 1 }]} // Deshabilitar el botón después de 3 intentos
                onPress={handleValidation}
                disabled={attempts >= 3} // Deshabilitar el botón si ya se alcanzaron los 3 intentos
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                    <Text style={styles.validateText}>Validar</Text>
                )}
            </TouchableOpacity>

            {/* Modal de éxito */}
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

            {/* Modal de error */}
            <Modal
                transparent={true}
                visible={isErrorModalVisible}
                animationType="fade"
                onRequestClose={() => setIsErrorModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Error creando usuario. Usuario ya existente.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleErrorModalClose}>
                            <Text style={styles.modalButtonText}>Aceptar</Text>
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
        borderWidth: 2,
        borderImageSource: 'linear-gradient(45deg, #902CA5, #00F0FF)',
    },
    errorBorder: {
        borderColor: "red", // Cambia el color del borde si hay un error
    },
    instructionsText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: "Roboto_400Regular",
        textAlign: "center",
        marginBottom: 30,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        fontFamily: "Roboto_400Regular",
        textAlign: "center",
        marginBottom: 10,
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
        fontSize: 14,
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
        fontSize: 14,
    },
});
