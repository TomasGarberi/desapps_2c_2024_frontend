import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/AntDesign";
import axios from "../middleware/axios";
import * as ImagePicker from 'expo-image-picker';
import axiosAlias from 'axios';

const NewPostScreen = () => {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería');
        }
    };

    useEffect(() => {
        requestPermissions();
    }, []);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setImages(result.assets);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }
    };

    const prevImage = () => {
        if (images.length > 1) {
            setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
        }
    };

    const getLocationAndAddress = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        try {
            const response = await axios.get(`/geo/coordinates`, {
                params: { lat: latitude, lng: longitude },
            });

            const data = response.data;
            if (data) {
                setLocation(data);
            } else {
                setLocation('No se pudo obtener la dirección');
            }
        } catch (error) {
            setErrorMsg('Error al obtener la dirección');
            console.error(error);
        }
    };

    const handlePublish = async () => {
        try {
            // Obtener el ID de usuario
            const idResponse = await axios.get('/users/getId');
            const userId = idResponse.data;
    
            // Crear el FormData y agregar los datos
            const formData = new FormData();
            formData.append("descripcion", description);
            formData.append("direc", location);
    
            // Iterar sobre las imágenes seleccionadas y agregar las imágenes como Blob al FormData
            images.forEach((image) => {
                // Convertir la imagen base64 a un Blob
                const imageBlob = base64ToBlob(image.uri);
    
                // Crear un objeto File para poder agregarlo al FormData
                const file = new File([imageBlob], image.fileName, { type: image.mimeType });
    
                // Agregar la imagen al FormData
                formData.append("imagesPost", file);
            });
    
            // Verificar el contenido de formData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }
    
            // Enviar la solicitud POST al backend
            const response = await axios.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data" // Necesario para subir archivos
                },
            });
    
            if (response.status === 201) {
                alert('Publicación creada con éxito');
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("Error al publicar");
        }
    };
    
    // Función para convertir base64 a Blob
    const base64ToBlob = (base64Data) => {
        const byteString = atob(base64Data.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([uint8Array], { type: 'image/jpeg' }); // Puedes cambiar el tipo MIME si es necesario
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>Nueva Publicación</Text>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImages}>
                {images.length > 0 ? (
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: images[currentImageIndex].uri }}
                            style={styles.image}
                        />
                        {images.length > 1 && (
                            <>
                                <TouchableOpacity
                                    style={[styles.arrowContainer, { left: -25 }]}
                                    onPress={prevImage}
                                >
                                    <Text style={styles.arrow}>{"<"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.arrowContainer, { right: -25 }]}
                                    onPress={nextImage}
                                >
                                    <Text style={styles.arrow}>{">"}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                ) : (
                    <View style={styles.placeholder}>
                        <Text>Elige imágenes</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={200}
            />
            <Text style={styles.charLimitText}>Máximo 200 Caracteres</Text>

            <View style={styles.locationContainer}>
                <TextInput
                    style={[styles.input, styles.locationInput]}
                    placeholder="Agregar Ubicación"
                    value={location}
                    onChangeText={setLocation}
                />
                <TouchableOpacity onPress={getLocationAndAddress} style={styles.locationButton}>
                    <Icon name="enviromento" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Publicar</Text>
            </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    imageContainer: {
        width: '80%',
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
        alignSelf: 'center',
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
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
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -20 }],
        padding: 5,
    },
    arrow: {
        fontSize: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
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
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationInput: {
        flex: 1,
    },
    locationButton: {
        padding: 10,
    },
    publishButton: {
        backgroundColor: '#333',
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    publishButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NewPostScreen;
