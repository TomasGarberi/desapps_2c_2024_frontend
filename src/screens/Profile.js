import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import HamburgerMenu from '../components/profile/HamburgerMenu';
import axios from "../middleware/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function ProfileScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState(null);
    const [favPosts, setFavPosts] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

    const logout = () => {
        AsyncStorage.clear()
        setMenuVisible(false)
        navigation.navigate('Login')
    };

    const fetchUserData = async () => {
        try {
            const idResponse = await axios.get('/users/getId');
            const userId = idResponse.data;
            if (userId) {
                setUserId(userId);
                const userResponse = await axios.get(`/users/${userId}`);
                setUserData(userResponse.data);
                const postResponse = await axios.get(`/posts/user/${userId}`);
                setPostData(postResponse.data);
            } else {
                setError("User ID not found");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch user data");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const getPosts = async () => {
        try {
            const res = await axios.get(`/posts/user/${userId}`);
            setPostData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getFavs = async () => {
        try {
            const res = await axios.get(`/favorites/user/${userId}`);
            setFavPosts(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserData()

            return () => { };
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    }

    if (error) {
        return <Text style={styles.loadingText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.hamburgerButton}>
                <Ionicons name="menu-outline" size={30} color="#000" />
            </TouchableOpacity>

            <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={() => logout()} navigation={navigation} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Imagen de Portada con Sombra */}
                <View style={styles.coverContainer}>
                    <Image
                        source={userData.backgroundImage ? { uri: userData.backgroundImage } :require('../assets/cover.png')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.coverOverlay} />
                </View>

                {/* Información de Perfil */}
                <View style={styles.profileContainer}>
                    {/* Foto de Perfil */}
                    <View style={styles.leftContainer}>
                        <Image
                            source={userData.urlImage ? { uri: userData.urlImage } : require('../assets/default-profile.png')}
                            style={styles.profilePicture}
                        />
                        <Text style={styles.name}>{userData.name} {userData.lastName}</Text>
                    </View>

                    {/* Nombre de Usuario y Seguidores */}
                    <View style={styles.rightContainer}>
                        <View style={styles.usernameContainer}>
                            <Text style={styles.username}>@{userData.username}</Text>
                        </View>
                        <View style={styles.followInfo}>
                            <TouchableOpacity style={styles.followColumn} onPress={() => navigation.navigate("MainTabs", { screen: 'FollowersScreen', params: { reload: true } })} >
                                <Text style={styles.followCount}>
                                    {Array.isArray(userData.followersIds) ? userData.followersIds.length : 0}
                                </Text>
                                <Text style={styles.followLabel}>Seguidores</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.followColumn} onPress={() => navigation.navigate("MainTabs", { screen: 'FollowsScreen', params: { reload: true } })}>
                                <Text style={styles.followCount}>
                                    {Array.isArray(userData.followedIds) ? userData.followedIds.length : 0}
                                </Text>
                                <Text style={styles.followLabel}>Siguiendo</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.bio}>
                            {userData.description || "Añade una descripción para que los demás te conozcan mejor."}
                        </Text>
                    </View>
                </View>

                {/* Iconos de Post y Favoritos */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={[styles.iconBox]} onPress={() => { setActiveTab('posts'); fetchUserData() }}>
                        <Ionicons name={activeTab == 'posts' ? "grid" : "grid-outline"} size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBox} onPress={() => { setActiveTab('favs'); getFavs() }}>
                        <Ionicons name={activeTab == 'favs' ? "star" : "star-outline"} size={30} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Componente de la galería o mensaje "sin imágenes" */}
                {activeTab == 'posts' ?
                    (postData && postData.length > 0 ? (
                        <View style={styles.galleryContainer}>
                            {postData.map((post) => (
                                <TouchableOpacity
                                    key={post.postId}
                                    style={styles.imageWrapper}
                                    onPress={() => navigation.navigate('FullPostScreen', { postId: post.postId })}
                                >
                                    <Image
                                        source={{ uri: post.image[0] }}
                                        style={styles.galleryImage}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.noImagesContainer}>
                            <Image source={require('../assets/no-images.png')} style={styles.noImagesIcon} />
                            <Text style={styles.noImagesText}>Empieza a compartir tus momentos aquí.</Text>
                        </View>
                    )) : ""}

                {/* Componente de la galería o mensaje "sin imágenes" */}
                {activeTab == 'favs' ?
                    (
                        favPosts && favPosts.length > 0 ? (
                            <View style={styles.galleryContainer}>
                                {favPosts.map((post) => (
                                    <TouchableOpacity
                                        key={post.postId}
                                        style={styles.imageWrapper}
                                        onPress={() => navigation.navigate('FullPostScreen', { postId: post.postId })}
                                    >
                                        <Image
                                            source={{ uri: post.image[0] }}
                                            style={styles.galleryImage}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.noImagesContainer}>
                                <Image source={require('../assets/no-images.png')} style={styles.noImagesIcon} />
                            </View>
                        ))
                    : ""}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginTop: '50%',
    },
    hamburgerButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    coverContainer: {
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: 327,
        contentFit: 'cover',
    },
    coverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
        width: 141,
        height: 137,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    rightContainer: {
        flex: 1,
    },
    usernameContainer: {
        backgroundColor: '#FDFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    username: {
        fontSize: 16,
        color: '#7C8089',
    },
    followInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    followColumn: {
        alignItems: 'center',
        width: 87,
        height: 38,
    },
    followCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0C0F14',
    },
    followLabel: {
        fontSize: 12,
        color: '#0C0F14',
    },
    bio: {
        fontSize: 11,
        color: '#7C8089',
        textAlign: 'center',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    iconBox: {
        marginHorizontal: 50,
    },
    noImagesContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noImagesIcon: {
        width: 50,
        height: 56,
        marginBottom: 10,
    },
    noImagesText: {
        fontSize: 14,
        color: '#7C8089',
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: '48%', // Dos imágenes por fila
        aspectRatio: 1, // Cuadrado perfecto
        marginBottom: 10, // Espaciado vertical entre filas
        backgroundColor: '#f0f0f0', // Color de fondo para pruebas
        borderRadius: 10,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },

});
