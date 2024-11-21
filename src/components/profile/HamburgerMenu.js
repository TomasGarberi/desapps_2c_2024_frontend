import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Switch,
    TextInput,
    Image,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import axios from '../../middleware/axios'

const HamburgerMenu = ({ visible, onClose, onLogout, navigation }) => {
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const handleDeleteUser =  () => {
        
        setConfirmDeleteVisible(false);
        setAuthModalVisible(true); // Mostrar el modal de autenticación
    };

    const handleAuthSubmit = async () => {
        // Aquí puedes agregar la lógica para eliminar al usuario con username y password
        console.log('Usuario:', username);
        console.log('Contraseña:', password);
        try {
            const response = await axios.post('/auth/authenticate', {
                username: username,
                password: password
            });
            const idResponse = await axios.get('/users/getId');
            const userId = idResponse.data;
            if (userId) {
                await axios.delete(`/users/${userId}`);
                navigation.navigate('Login');
            } else {
                setError("User ID not found");  
            }
        } catch (error) {
            console.error(error);
            setErrors({ server: "Error al Autenticar, por favor intenta nuevamente." });
        }
        // Cerrar el modal después de enviar
        setAuthModalVisible(false);
        setUsername('');
        setPassword('');
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose} />
            <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                <LinearGradient
                    colors={["#FF6F61", "#3B3F58"]}
                    style={styles.background}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image source={require('../../assets/logo-header.png')} style={styles.logo} />
                    <Text style={styles.menuItem}>INICIO</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfile'); onClose(); }}>
                        <Text style={styles.menuItem}>EDITAR PERFIL</Text>
                    </TouchableOpacity>
                    <View style={styles.switchContainer}>
                        <Text style={styles.menuItem}>MODO OSCURO</Text>
                        <Switch value={false} />
                    </View>
                    <TouchableOpacity onPress={() => setConfirmLogoutVisible(true)}>
                        <Text style={styles.menuItem}>CERRAR SESIÓN</Text>
                    </TouchableOpacity>
                    <View style={styles.deleteButtonWrapper}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => setConfirmDeleteVisible(true)}
                        >
                            <Text style={styles.deleteButtonText}>ELIMINAR USUARIO</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Animated.View>

            {/* Modal de Confirmación de Eliminar Usuario */}
            <Modal
                transparent
                visible={confirmDeleteVisible}
                animationType="fade"
                onRequestClose={() => setConfirmDeleteVisible(false)}
            >
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>
                            ¿Estás seguro de que deseas eliminar tu usuario? Esta acción es irreversible.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleDeleteUser}
                            >
                                <Text style={styles.confirmButtonText}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setConfirmDeleteVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Autenticación */}
            <Modal
                transparent
                visible={authModalVisible}
                animationType="fade"
                onRequestClose={() => setAuthModalVisible(false)}
            >
                <View style={styles.confirmOverlay}>
                    <View style={styles.confirmContainer}>
                        <Text style={styles.confirmText}>
                            Por favor, ingresa tus credenciales para confirmar.
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Usuario"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleAuthSubmit}
                            >
                                <Text style={styles.confirmButtonText}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setAuthModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
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
        width: 125,
        height: 75,
        marginBottom: 20,
    },
    menuItem: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 10,
        fontFamily: "Roboto_400Regular",
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    deleteButton: {
        marginTop: 20,
        backgroundColor: '#ff4d4f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteButtonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Roboto_400Regular",
    },
    confirmOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: "Roboto_400Regular",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#2B2B2B',
        width: 91,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: "Roboto_300Light",
    },
    cancelButton: {
        backgroundColor: '#2B2B2B',
        width: 91,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: "Roboto_700Bold",
    },
});

export default HamburgerMenu;
