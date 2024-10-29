import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Por ejemplo, usando Ionicons

const Footer = ({ navigation, userProfileImage }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Icon name="search-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <Icon name="add-circle-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
        <Icon name="heart-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        {userProfileImage ? (
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="person-outline" size={30} color="#000" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Footer;
