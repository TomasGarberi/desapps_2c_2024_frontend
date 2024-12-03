import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from '../middleware/axios'
import axiosAlias from 'axios';

const EditProfile = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [images, setImages] = useState([null, null]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userData, setUserData] = useState(null);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería');
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const idResponse = await axios.get('/users/getId');
                const userId = idResponse.data;
                if (userId) {
                    const userResponse = await axios.get(`/users/${userId}`);
                    const userData = userResponse.data;
                    setUserData(userData);
        
                    // Inicializar estados aquí
                    setName(userData.name || '');
                    setLastName(userData.lastName || '');
                    setUsername(userData.username || '');
                    setDescription(userData.description || '');
                    setGender(userData.gender || '');
                } else {
                    console.error("User ID not found");
                }
            } catch (err) {
                console.error("Failed to fetch user data", err);
            }
        };
        
        fetchUserData();
        requestPermissions();
    }, []);
    

    const pickImage = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const newImages = [...images];
            newImages[index] = result.assets[0];
            setImages(newImages);
        }
    };

    const handlePublish = async () => {
        if (!userData || !userData.id) {
            console.error("User ID is undefined");
            return;
        }
    
        try {
            const formData = new FormData();
    
            // Agregar datos de texto al FormData
            formData.append('name', name);
            formData.append('lastName', lastName);
            formData.append('userName', username);
            formData.append('descripcion', description);
            //formData.append('gender', gender);
            
            console.log(images[0]);
            // Agregar imágenes al FormData si están seleccionadas
            if (images[0]) {
                console.log("ACA ESTA LA IMAGENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
                console.log(images[0]);
                formData.append('urlImage', {
                    uri: images[0].uri,
                    name: images[0].fileName || 'photo.jpg', // Puedes personalizar el nombre
                    type: images[0].mimeType || 'image/jpeg', // Asegúrate de que tenga un tipo válido
                });
            }
    
            if (images[1]) {
                console.log("ACA ESTA LA IMAGENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
                console.log(images[1]);

                formData.append('backImage', {
                    uri: images[1].uri,
                    name: images[1].fileName || 'photo.jpg', // Puedes personalizar el nombre
                    type: images[1].mimeType || 'image/jpeg', // Asegúrate de que tenga un tipo válido
                });
            }
    

            // Loguear contenido del FormData
        console.log("FormData contiene:");
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
            // Realizar la solicitud POST con FormData
    
            const response = await axios.put(`/users/${userData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"},
            });
            
    
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                navigation.navigate('MainTabs', {
                    screen: 'Profile',
                    params: { reload: true },
                });
            }, 2000);
        } catch (err) {
            console.error("Failed to update user profile", err);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} color="#3B3F58" />
                </TouchableOpacity>
                <Text style={styles.header}>Editar Perfil</Text>
            </View>

            <View style={styles.imageRowContainer}>
                {['Elegir imagen de Perfil', 'Elegir imagen de Portada'].map((label, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.imageContainer}
                        onPress={() => pickImage(index)}
                    >
                        {images[index] ? (
                            <Image source={{ uri: images[index].uri }} style={styles.image} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text>{label}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Escribe una breve descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={120}
            />

            <Text style={styles.charLimitText}>Máximo 120 Caracteres</Text>

            <Text style={styles.label}>Género</Text>
            <View style={styles.dropdown}>
                {['Masculino', 'Femenino', 'Otrx', 'Prefiero no decir'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.dropdownOption,
                            gender === option && styles.selectedOption,
                        ]}
                        onPress={() => setGender(option)}
                    >
                        <Text style={styles.dropdownOptionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Guardar</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={showSuccessModal}
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>¡Perfil actualizado con éxito!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3B3F58',
        textAlign: 'center',
        flex: 1,
    },
    imageRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    imageContainer: {
        width: 160,
        height: 152,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 11,
        color: '#3B3F58',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4F5269',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    charLimitText: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#4F5269',
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownOption: {
        padding: 10,
    },
    selectedOption: {
        backgroundColor: '#e0e0e0',
    },
    dropdownOptionText: {
        color: '#3B3F58',
    },
    publishButton: {
        backgroundColor: '#3B3F58',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 20,
    },
    publishButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 200,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#3B3F58',
        textAlign: 'center',
    },
});

export default EditProfile;
