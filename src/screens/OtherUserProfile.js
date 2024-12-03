import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "../middleware/axios";

export default function OtherUserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const { userId } = route.params;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`/users/${userId}`);
                setUserData(userResponse.data);
                const postResponse = await axios.get(`/posts/user/${userId}`);
                setPostData(postResponse.data);
                setIsFollowing(userResponse.data.followersIds.includes(userId)); // Verificar si ya sigue al usuario
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleFollow = async () => {
        try {
            await axios.post(`/users/follow/${userId}`);
            setIsFollowing(true);
        } catch (error) {
            console.error('Error al seguir al usuario:', error);
        }
    };

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.loadingText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Imagen de Portada */}
                <View style={styles.coverContainer}>
                    <Image
                        source={userData.backgroundImage ? { uri: userData.backgroundImage } : require('../assets/cover.png')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.coverOverlay} />
                </View>

                {/* Información de Perfil */}
                <View style={styles.profileContainer}>
                    <Image
                        source={userData.urlImage ? { uri: userData.urlImage } : require('../assets/default-profile.png')}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.name}>{userData.name} {userData.lastName}</Text>
                    <Text style={styles.username}>@{userData.username}</Text>

                    {/* Botón de Seguir */}
                    {!isFollowing && (
                        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
                            <Text style={styles.followButtonText}>Seguir</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.followInfo}>
                        <Text style={styles.followCount}>
                            {Array.isArray(userData.followersIds) ? userData.followersIds.length : 0} Seguidores
                        </Text>
                        <Text style={styles.followCount}>
                            {Array.isArray(userData.followedIds) ? userData.followedIds.length : 0} Siguiendo
                        </Text>
                    </View>

                    <Text style={styles.bio}>
                        {userData.description || "Este usuario no ha añadido una descripción."}
                    </Text>
                </View>

                {/* Publicaciones */}
                <View style={styles.galleryContainer}>
                    {postData && postData.length > 0 ? (
                        postData.map((post) => (
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
                        ))
                    ) : (
                        <Text style={styles.noPostsText}>Este usuario no tiene publicaciones.</Text>
                    )}
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
        alignItems: 'center',
        marginTop: -50,
    },
    profilePicture: {
        width: 107,
        height: 107,
        borderRadius: 16.5,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    username: {
        fontSize: 14,
        color: '#7C8089',
    },
    followButton: {
        backgroundColor: '#3B3F58',
        borderRadius: 16.5,
        paddingVertical: 6,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    followButtonText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    followInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    followCount: {
        fontSize: 14,
        color: '#333',
    },
    bio: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginVertical: 10,
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    imageWrapper: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    noPostsText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#7C8089',
    },
});
