import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>Bienvenido a la pantalla principal de Lattice</Text>
        {/* Aquí puedes agregar más contenido según tus necesidades */}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Cambia el color de fondo si es necesario
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
});