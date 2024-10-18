import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen'; 
import MainScreen from './src/screens/MainScreen'; 
import LoginScreen from './src/screens/LoginScreen'; 
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const Stack = createNativeStackNavigator();

export default function App() {
  // Cargamos la fuente Roboto
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  // Si las fuentes no están cargadas, mostramos la pantalla de carga
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Ocultamos el header en la pantalla Splash
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }} // Pantalla principal sin header
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Pantalla de login sin header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
