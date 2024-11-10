import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Footer from '../components/Footer';
import Icon from "react-native-vector-icons/Feather"; 
import Icons from "react-native-vector-icons/AntDesign";
import HamburgerMenu from '../components/HamburgerMenu';
import axios from "../middleware/axios";


export default function ProfileScreen() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header with Hamburger Menu */}
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.hamburgerButton}>
                <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
            
            <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Background Image */}
                <Image source={require('../assets/photo/perfil.jpg')} style={styles.backgroundImage} />

                {/* Profile Info */}
                <View style={styles.profileContainer}>
                    {/* Left Side: Profile Picture and Name */}
                    <View style={styles.leftContainer}>
                        <Image source={require('../assets/photo/perfil.jpg')} style={styles.profilePicture} />
                        <Text style={styles.name}>Pedro Sanchez</Text>
                    </View>

                    {/* Right Side: Username and User Info */}
                    <View style={styles.rightContainer}>
                        <View style={styles.usernameContainer}>
                            <Text style={styles.username}>@pedro.sanchez</Text>
                        </View>

                        {/* Follow Info Divided into Columns */}
                        <View style={styles.followInfo}>
                            <View style={styles.followColumn}>
                                <Text style={styles.followCount}>600</Text>
                                <Text style={styles.followLabel}>Seguidores</Text>
                            </View>
                            <View style={styles.followColumn}>
                                <Text style={styles.followCount}>475</Text>
                                <Text style={styles.followLabel}>Siguiendo</Text>
                            </View>
                        </View>

                        <Text style={styles.bio}>
                            Apasionado por la tecnología, el diseño y las nuevas ideas. Explorando el mundo una aventura a la vez.
                            ¡Conecta conmigo!
                        </Text>
                    </View>
                </View>

                {/* Icons for grid and favorite sections */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconBox}>
                        <Icons name="appstore-o" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBox}>
                        <Icon name="star" size={30} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Gallery */}
                <View style={styles.galleryContainer}>
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                    <Image source={require('../assets/photo/2.jpg')} style={styles.galleryImage} />
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    hamburgerButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1, // Asegura que el botón esté encima de otros elementos
    },
    scrollContent: {
        paddingBottom: 80, // Espacio para el footer
    },
    backgroundImage: {
        width: '100%',
        height: 275, // Aumenta el tamaño de la imagen de fondo
        resizeMode: 'cover',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 5,
        marginTop: -50,
    },
    leftContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    profilePicture: {
        width: 140,
        height: 150, // Tamaño rectangular
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10, // Espacio entre la foto y el nombre
    },
    rightContainer: {
        flex: 1,
    },
    usernameContainer: {
        backgroundColor: '#d8d8d8', // Fondo gris claro para el nombre de usuario
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    username: {
        fontSize: 14,
        color: '#333',
    },
    followInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    followColumn: {
        alignItems: 'center',
    },
    followCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    followLabel: {
        fontSize: 12,
        color: '#666',
    },
    bio: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    iconBox: {
        marginHorizontal: 50, // Aumenta la separación entre iconos
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    galleryImage: {
        width: '45%',
        height: 100,
        margin: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
