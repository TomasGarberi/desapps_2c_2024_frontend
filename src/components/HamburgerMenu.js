import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Switch,
    Image
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const HamburgerMenu = ({ visible, onClose }) => {
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose} />
            <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                {/* Envuelve todos los elementos dentro de LinearGradient */}
                <LinearGradient
                    colors={["#FF6F61", "#3B3F58"]}
                    style={styles.background}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image source={require('../assets/logo-header.png')} style={styles.logo} />
                    <Text style={styles.menuItem}>INICIO</Text>
                    <Text style={styles.menuItem}>EDITAR PERFIL</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.menuItem}>MODO OSCURO</Text>
                        <Switch value={false} />
                    </View>
                    <Text style={styles.menuItem}>CERRAR SESIÓN</Text>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>ELIMINAR USUARIO</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    hamburgerButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    background: {
        flex: 1, // Asegura que el gradiente ocupe todo el fondo
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuContainer: {
        position: 'absolute',
        right: 0,
        width: '50%',
        height: '100%',
    },
    logo: {
        width: 125, // Ajusta el tamaño del logo
        height: 75,
        marginBottom: 20,
    },
    menuItem: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 30,
        fontFamily: "Roboto_400Regular",
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#ff4d4f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Roboto_400Regular"
    },
});

export default HamburgerMenu;
