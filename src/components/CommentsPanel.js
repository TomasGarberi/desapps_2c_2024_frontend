import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';
import axios from '../middleware/axios';

export default function CommentsPanel({ postId }) {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const res = await axios.get(`/posts/${postId}/comments`);

            if (res.data) {
                const parsedComments = await Promise.allSettled(
                    res.data.map(async (comment) => {
                        const user = await getUser(comment.userId);
                        comment.user = user
                        return comment
                    })
                );

                setComments(parsedComments.map((comment) => comment.value));
            } else {
                setComments([]);
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const sendComment = async () => {
        try {
            const res = await axios.post(`/posts/${postId}/comments`, { comment: commentText.trim() });
            getComments();
            setCommentText('');
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async (id) => {
        try {
            const res = await axios.get(`/users/${id}`);
            return res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getComments();
    }, [])


    const renderComment =  ({ item }) => {
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.username}>@{item.user.username}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
                <Text style={styles.commentText}>{item.comment}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Comentarios</Text>
            </View>


            <FlatList
                data={comments}
                keyExtractor={(item) => item.commentId}
                renderItem={renderComment}
                style={styles.commentsList}
                contentContainerStyle={styles.commentsContainer}
            />

            {/* Input de nuevo comentario */}
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Añade un comentario..."
                    placeholderTextColor="#B0B0B0"
                    value={commentText}
                    onChangeText={setCommentText}
                />
                <Button
                    title="Enviar"
                    onPress={sendComment}
                    disabled={!commentText.trim()} // Deshabilitar si commentText está vacío o tiene solo espacios
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3B3F58',
    },
    closeButton: {
        fontSize: 18,
        color: '#3B3F58',
    },
    commentsList: {
        maxHeight: '60%',
        backgroundColor: '#fff',
    },
    commentsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    commentContainer: {
        marginBottom: 15,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3B3F58',
    },
    timeAgo: {
        fontSize: 10,
        color: '#7C8089',
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        color: '#2e2e2e',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    commentInput: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#00C1FF',
        borderRadius: 5,
        marginRight: 10,
        color: '#000',
    },
});
