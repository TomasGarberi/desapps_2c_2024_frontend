import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Ad({ ad }) {
  return (
    <View style={styles.adContainer}>
      {/* Cabecera del Anuncio */}
      <View style={styles.header}>
        <Image source={{ uri: ad.logo }} style={styles.adImage} />
        <View style={styles.adInfo}>
          <Text style={styles.adTitle}>{ad.title}</Text>
          <Text style={styles.sponsored}>Publicidad</Text>
        </View>
      </View>

      {/* Imagen del Anuncio */}
      <Image source={{ uri: ad.image }} style={styles.adImageMain} />

      {/* Llamado a la acción */}
      <TouchableOpacity style={styles.callToAction}>
        <Text style={styles.actionText}>{ad.callToAction}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  adImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  adInfo: {
    marginLeft: 10,
  },
  adTitle: {
    fontWeight: "bold",
  },
  sponsored: {
    color: "grey",
  },
  adImageMain: {
    width: "100%",
    height: 150,
  },
  callToAction: {
    padding: 10,
    backgroundColor: "#FF6F61",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
