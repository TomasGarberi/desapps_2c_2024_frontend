import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import axios from "../middleware/axios";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OtherUserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;

    const fetchUserData = async () => {
        try {
        const userResponse = await axios.get(`/users/${userId}`);
        setUserData(userResponse.data);

        const postResponse = await axios.get(`/posts/user/${userId}`);
        setPostData(postResponse.data);

        const authResponse = await axios.get('/users/getId');
        const authUserId = authResponse.data;

        setIsFollowing(userResponse.data.followersIds.includes(authUserId));
        } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del usuario.");
        } finally {
        setLoading(false);
        }
    };

    // Refresh automático al enfocar la pantalla
    useFocusEffect(
        useCallback(() => {
        fetchUserData();
        }, [userId])
    );

    const handleFollow = async () => {
        try {
        await axios.post(`/users/follow/${userId}`);
        setIsFollowing(true);
        } catch (error) {
        console.error('Error al seguir al usuario:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
        await axios.delete(`/users/unfollow/${userId}`);
        setIsFollowing(false);
        } catch (error) {
        console.error('Error al dejar de seguir al usuario:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.loadingText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={24} color="#3B3F58" />
            </TouchableOpacity>
            {/* Imagen de Portada con Sombra */}
            <View style={styles.coverContainer}>
            <Image
                source={userData.backgroundImage ? { uri: userData.backgroundImage } : require('../assets/cover.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.coverOverlay} />
            </View>

            {/* Información de Perfil */}
            <View style={styles.profileContainer}>
            <View style={styles.leftContainer}>
                <Image
                source={userData.urlImage ? { uri: userData.urlImage } : require('../assets/default-profile.png')}
                style={styles.profilePicture}
                />
                <Text style={styles.name}>{userData.name} {userData.lastName}</Text>
            </View>

            <View style={styles.rightContainer}>
                <View style={styles.usernameContainer}>
                <Text style={styles.username}>@{userData.username}</Text>
                </View>
                <View style={styles.followInfo}>
                <View style={styles.followColumn}>
                    <Text style={styles.followCount}>
                    {Array.isArray(userData.followersIds) ? userData.followersIds.length : 0}
                    </Text>
                    <Text style={styles.followLabel}>Seguidores</Text>
                </View>
                <View style={styles.followColumn}>
                    <Text style={styles.followCount}>
                    {Array.isArray(userData.followedIds) ? userData.followedIds.length : 0}
                    </Text>
                    <Text style={styles.followLabel}>Siguiendo</Text>
                </View>
                </View>
                <Text style={styles.bio}>
                {userData.description || "Este usuario no ha añadido una descripción."}
                </Text>
            </View>
            </View>

            {/* Galería de publicaciones */}
            <View style={styles.galleryContainer}>
            {postData && postData.length > 0 ? (
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
                <Text style={styles.noImagesText}>Este usuario no tiene publicaciones.</Text>
                </View>
            )}
            </View>
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
        marginTop: '50%',
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
    },
    coverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -50,
        paddingHorizontal: 20,
        marginBottom: 30,
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
        marginTop: 10,
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 10,
        borderRadius: 10,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    noImagesContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 76
    },
    noImagesIcon: {
        width: 50,
        height: 56,
        marginBottom: 10,
    },
    noImagesText: {
        fontSize: 14,
        color: '#7C8089',
        textAlign: 'center',
    },
});



