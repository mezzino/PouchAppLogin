// App.js
import { useState } from 'react';
import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from './lib/supabase';

import bgImage from './assets/images/icon.png';

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

 // const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fetchTableData() {
  const { data, error } = await supabase
    .from('Financial') // Replace with your table name
    .select('Income, Expenses'); // Selects all columns

  if (error) {
    console.error('Error fetching data:', error.message);
    return null;
  } else {
 //   console.log('Fetched data:', data);
    const totalIncome = data.reduce((sum, record) => sum + (record.Income || 0), 0);
    const totalExpenses = data.reduce((sum, record) => sum + (record.Expenses || 0), 0);
    const ti = +totalIncome;  
    const te = +totalExpenses;
    Alert.alert(`Total Income: ${totalIncome}\nTotal Expenses: ${totalExpenses}\nCash Flow: ${ti - te}`);
    Alert.alert(`Cash Flow: ${ti - te}`);
    return data;
  }
}

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
        console.error('Error signing up:', error.message);
//        Alert.alert('Error creating user:', error.message)
    } else {
        console.error('User created:', data.user);
        Alert.alert('User created:', email)
        // User may need to verify email if 'Confirm email' is enabled in your project settings.
    }
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      Alert.alert('Login Error', error.message)
    } else {
      Alert.alert('Login Successful')
      setUser(data.user)
      fetchTableData()
    }
  }

async function handleLogout() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Error signing out:', error.message)
      } else {
        Alert.alert('Logout Successful')
        // Redirect or update UI as needed after successful logout
      }
    }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>PouchApp Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <Text style={styles.Text}></Text>
      <Button  title="Login" onPress={handleLogin} />
      {user && <Text style={styles.success}>Logged in as {user.email}</Text>}
      <Text style={styles.spacer}></Text>
      <Button title="Signup"  color="#11874aff" onPress={signUp} />
      <Text style={styles.spacer}></Text>
      <Button title="Logout" color="#841584"  onPress={handleLogout} />
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex:1,
    backgroundColor: 'rgba(0,255,255,.7)',
  },
  title: {
    fontSize: 34,
    marginTop: 100,
    padding: 50,
    textAlign: 'center',
  },
  spacer: {
    fontSize: 2,
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  logout: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  success: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
  },
  fixedWidthButton: {
    width: 10, // Set a fixed width of 100 dp
  },
})
