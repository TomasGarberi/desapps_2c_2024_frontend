import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import HeartIcon from '../../assets/icons/heart.svg';
import CommentIcon from '../../assets/icons/comment.svg';
import FavoriteIcon from '../../assets/icons/favorite.svg';

const examplePost = {
  userImage: 'https://picsum.photos/200/300',
  username: 'ana.garcia',
  location: 'Central Park, New York, NY, USA',
  description: 'Paz y naturaleza en pleno Central Park 🌳. Un rincón perfecto en el corazón de NYC. #CentralPark',
  image: 'https://picsum.photos/200/300',
  timeAgo: 'Hace 7 horas',
};

export default function Post({ post = examplePost }) {
  return (
    <View style={styles.postContainer}>
      {/* Header del Usuario */}
      <View style={styles.header}>
        <View style={styles.profileImageWrapper}>
          <Image source={{ uri: post.userImage }} style={styles.profileImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      {/* Imagen de la Publicación */}
      <View style={styles.imageWrapper}>
        {/* Descripción del Post */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        <Image source={{ uri: post.image }} style={styles.postImage} />

        {/* Botones de Acción */}
        <View style={styles.actionContainer}>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          <View style={styles.actionIcons}>
            <TouchableOpacity>
              <View style={styles.icons}>
                <HeartIcon width={24} height={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icons}>
                <CommentIcon width={24} height={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icons}>
                <FavoriteIcon width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: '25%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '23%',
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 5,
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  location: {
    fontSize: 10,
    color: '#7C8089',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    backdropFilter: "blur(10px)",
    zIndex: 999,
    left: 30,
    right: 30,
    top: -5,
    padding: 5,
    backgroundColor: 'rgba(151, 151, 151, 0.4)',
    borderRadius: "0.5rem",
  },
  descriptionText: {
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  postImage: {
    width: 339,
    height: 331,
    borderRadius: "1rem",
    marginVertical: 10,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 10,
    left: '15%',
    right: '15%',
    borderRadius: "1.5rem",
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: "blur(10px)"
  },
  timeAgo: {
    fontSize: 8,
    fontWeight: "bold",
    color: '#3B3F58',
    marginBottom: 5,
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  icons: {
    padding: "1rem",
    borderRadius: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  }
});

