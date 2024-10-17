import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validación del formulario
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email requerido'),
  password: Yup.string().min(4, 'Mínimo 4 caracteres').required('Contraseña requerida')
});

const LoginScreen = () => {
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('https://virtserver.swaggerhub.com/ADRIFIERRO/TP-DAI-Swagger/1.0.0/sessions/login', {
        email: values.email,
        password: values.password
      });
      Alert.alert('Login exitoso', `Token: ${response.data.accessToken}`);
    } catch (error) {
      Alert.alert('Error al iniciar sesión', 'Verifica tus credenciales');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
            
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
            
            <Button onPress={handleSubmit} title="Ingresar" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10
  }
});

export default LoginScreen;
