import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ExpoSplashScreen from "expo-splash-screen"; // Renombramos la importación
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../middleware/axios";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    ExpoSplashScreen.preventAutoHideAsync(); // Usamos el nombre renombrado aquí

    setTimeout(async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {

        // try {
        //   const response = await axios.post("/auth/refreshToken");
        // } catch (error) {

        // }
        
        await ExpoSplashScreen.hideAsync();
        navigation.replace("MainTabs");
      } else {
        navigation.replace("Main");
      }
    }, 1000)

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

