import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordStep1 from './src/screens/ForgotPasswordStep1';
import ForgotPasswordStep2 from './src/screens/ForgotPasswordStep2';
import ForgotPasswordStep3 from './src/screens/ForgotPasswordStep3';
import TermsScreen from './src/screens/TermsScreen';
import Home from './src/screens/HomeScreen';
import AuthLoading from './src/components/AuthLoading';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light } from '@expo-google-fonts/roboto';

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordStep1"
          component={ForgotPasswordStep1}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ForgotPasswordStep2"
          component={ForgotPasswordStep2}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ForgotPasswordStep3"
          component={ForgotPasswordStep3}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="TermsScreen"
          component={TermsScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

