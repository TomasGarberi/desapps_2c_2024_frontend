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
              <HeartIcon width={24} height={24} fill="#3B3F58" />
            </TouchableOpacity>
            <TouchableOpacity>
              <CommentIcon width={24} height={24} fill="#3B3F58" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FavoriteIcon width={24} height={24} fill="#3B3F58" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 2,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'linear-gradient(90deg, #902CA5, #00F0FF)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#7C8089',
  },
  location: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#7C8089',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
    padding: 5,
    backgroundColor: 'rgba(151, 151, 151, 0.4)',
    borderRadius: 20,
  },
  descriptionText: {
    fontSize: 9,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  postImage: {
    width: 339,
    height: 331,
    borderRadius: 20,
    marginVertical: 10,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 10,
    left: '15%',
    right: '15%',
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeAgo: {
    fontSize: 6,
    fontFamily: 'Inter-Bold',
    color: '#7C8089',
    marginBottom: 5,
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 15,
  },
});

