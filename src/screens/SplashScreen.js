import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ExpoSplashScreen from "expo-splash-screen"; // Renombramos la importación

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    ExpoSplashScreen.preventAutoHideAsync(); // Usamos el nombre renombrado aquí
    setTimeout(async () => {
      await ExpoSplashScreen.hideAsync(); // Usamos el nombre renombrado aquí
      navigation.replace("MainScreen"); // Navegamos a la pantalla principal
    }, 2000); // Mostrar el splash por 2 segundos
  }, []);

  return (
    <LinearGradient
      colors={["#FF6F61", "#3B3F58"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 212,
    height: 215,
    resizeMode: "contain",
  },
});

