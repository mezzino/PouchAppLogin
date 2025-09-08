import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('meredith_51@yahoo.com');
  const [password, setPassword] = useState('mason1');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Navigation to Dashboard is handled by the AuthNavigator
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      Alert.alert('Success', 'Check your email for the confirmation link!');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>PouchApp</Text>
          <Text style={styles.subtitle}>Your Personal Budget Companion</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signupButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={[styles.buttonText, { color: '#4CAF50' }]}>
                Create Account
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => Alert.alert('Reset Password', 'Password reset functionality will be implemented here')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.demoContainer}>
           <Text style={styles.demoText}>Try the demo:</Text>
            <Text style={styles.demoCredentials}>Email: demo@example.com</Text>
            <Text style={styles.demoCredentials}>Password: demopassword</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 40,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  demoContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    width: '100%',
  },
  demoText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  demoCredentials: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 2,
  },
});

export default LoginScreen;
