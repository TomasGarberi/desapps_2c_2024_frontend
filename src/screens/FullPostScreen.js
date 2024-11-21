import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Post from '../components/home/Post';
import CommentsPanel from '../components/CommentsPanel';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FullPostScreen({ route, navigation }) {
    const { post } = route.params;

    return (
        <View style={styles.container}>
            {/* Botón para cerrar */}
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="#3B3F58" />
            </TouchableOpacity>

            {/* Post */}
            <Post key={`post-${post.postId}`} post={post} />

            {/* Likes */}
            <View style={styles.icon}>
                <Ionicons name="heart-outline" size={20} color="#3B3F58">
                    {` ${post.usersLikes.length}`}
                </Ionicons>
            </View>

            {/* Panel de comentarios */}
            <CommentsPanel postId={post.postId} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1, // Asegura que el botón esté encima de otros elementos
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente (opcional)
        borderRadius: 16,
        padding: 8,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    postDescription: {
        fontSize: 16,
        color: '#666',
    },
    icon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B3F58',
        marginVertical: 8,
    },
});