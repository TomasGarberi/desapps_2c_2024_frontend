import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Post from '../components/home/Post';
import CommentsPanel from '../components/CommentsPanel';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from '../middleware/axios';
import Header from '../components/Header';

export default function FullPostScreen({ route, navigation }) {
    const { postId } = route.params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPost = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            
            {!post ? (<Text> Loading...</Text >) :
                <View style={styles.content}>
                    {/* Botón para cerrar */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color="#3B3F58" />
                    </TouchableOpacity>

                    {/* Post */}
                    <Post key={`post-${post.postId}`} post={post} onLikeUpdate={() => getPost()} />

                    {/* Likes */}
                    <View style={styles.icon}>
                        <Ionicons name="heart-outline" size={20} color="#3B3F58">
                            {` ${post?.usersLikes?.length}`}
                        </Ionicons>
                    </View>

                    {/* Panel de comentarios */}
                    <CommentsPanel postId={post.postId} />
                </View>
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 64,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: -16,
        right: 0,
        zIndex: 1, // Asegura que el botón esté encima de otros elementos
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente (opcional)
        borderRadius: 16,
        padding: 8,
    },
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B3F58',
        marginVertical: 8,
    },
});
