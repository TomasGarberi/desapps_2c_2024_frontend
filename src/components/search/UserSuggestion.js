import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function UserSuggestion({ user, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    borderImage: 'linear-gradient(to right, #902CA5, #00F0FF) 1',
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 12,
    color: '#902CA5',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 10,
    color: '#3B3F58',
  },
});
