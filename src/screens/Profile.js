import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Footer from '../components/Footer';
import Icon from "react-native-vector-icons/Feather"; 
import Icons from "react-native-vector-icons/AntDesign";
import HamburgerMenu from '../components/profile/HamburgerMenu';
//import axios from "../middleware/axios"; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]); // New state for storing posts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    const logout = () => {
        AsyncStorage.clear()
        setMenuVisible(false) 
        navigation.navigate('Login')
    }

    // Fetching user data and posts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // First, fetch the user ID using the token
                const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFucGVyZXoxMjM0IiwiaWF0IjoxNzMxMzY0NjExLCJpZCI6OCwiZXhwIjoxNzMxNDUxMDExfQ.mBZGVKgAvoHe-QjQufImWoULkjlHOGNoQvgBau82C2CqXRFNhgBYFp8j0WBdfXnXR_Y2OFun4Pl68WO44-axIQ';  // TODO: Get token when user logs in
                const idResponse = await axios.get('https://dai-g9eqemg8czd0caev.brazilsouth-01.azurewebsites.net/users/getId', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userId = idResponse.data; // User ID

                if (userId) {
                    // Fetch user details
                    const userResponse = await axios.get(`https://dai-g9eqemg8czd0caev.brazilsouth-01.azurewebsites.net/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setUserData(userResponse.data);

                    // Fetch posts by user
                    const postsResponse = await axios.get(`https://dai-g9eqemg8czd0caev.brazilsouth-01.azurewebsites.net/posts/user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setPosts(postsResponse.data); // Set the posts data
                    setLoading(false);
                } else {
                    setError("User ID not found");
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array to run only once when the component mounts

    if (loading) {
        return <Text>Loading...</Text>; // Show loading while data is being fetched
    }

    if (error) {
        return <Text>{error}</Text>; // Show error message if something goes wrong
    }

    return (
        <View style={styles.container}>
            {/* Header with Hamburger Menu */}
            <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.hamburgerButton}>
                <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>

            <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={() => logout()}/>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Background Image */}
                <Image source={require('../assets/photo/perfil.jpg')} style={styles.backgroundImage} />

                {/* Profile Info */}
                <View style={styles.profileContainer}>
                    {/* Left Side: Profile Picture and Name */}
                    <View style={styles.leftContainer}>
                        <Image source={{ uri: userData.urlImage }} style={styles.profilePicture} />
                        <Text style={styles.name}>{userData.name} {userData.lastName}</Text>
                    </View>

                    {/* Right Side: Username and User Info */}
                    <View style={styles.rightContainer}>
                        <View style={styles.usernameContainer}>
                            <Text style={styles.username}>@{userData.username}</Text>
                        </View>

                        {/* Follow Info Divided into Columns */}
                        <View style={styles.followInfo}>
                            <View style={styles.followColumn}>
                                <Text style={styles.followCount}>
                                    {Array.isArray(userData.followers) ? userData.followers.length : 0}
                                </Text>
                                <Text style={styles.followLabel}>Seguidores</Text>
                            </View>
                            <View style={styles.followColumn}>
                                <Text style={styles.followCount}>
                                    {Array.isArray(userData.following) ? userData.following.length : 0}
                                </Text>
                                <Text style={styles.followLabel}>Siguiendo</Text>
                            </View>
                        </View>

                        <Text style={styles.bio}>
                            {userData.description}
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
                    {/* Display images from posts */}
                    {posts.length > 0 ? posts.map((post) => (
                        <Image key={post.postId} source={{ uri: post.image }} style={styles.galleryImage} />
                    )) : <Text>No posts available</Text>}
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
        zIndex: 1, // Ensures the button is above other elements
    },
    scrollContent: {
        paddingBottom: 80, // Space for the footer
    },
    backgroundImage: {
        width: '100%',
        height: 275, // Larger background image
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
        height: 150, // Rectangular size for the profile picture
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10, // Space between photo and name
    },
    rightContainer: {
        flex: 1,
    },
    usernameContainer: {
        backgroundColor: '#d8d8d8', // Light gray background for username
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
        marginHorizontal: 50, // Increased space between icons
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
