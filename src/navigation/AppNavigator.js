import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from '../lib/supabase';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import ChartsScreen from '../screens/ChartsScreen';

// Icons
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app screens
function MainTabs({ navigation }) {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Charts') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Add') {
            return (
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#4CAF50',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                elevation: 5,
              }}>
                <Ionicons name="add" size={32} color="white" />
              </View>
            );
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarButton: (props) => {
          if (props.name === 'Add') {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => navigation.navigate('AddTransaction', { type: 'expense' })}
              />
            );
          }
          return <TouchableOpacity {...props} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
          title: 'Home',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Charts" 
        component={ChartsScreen} 
        options={{ 
          title: 'Charts',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={PlaceholderScreen} 
        options={{ 
          title: 'Transactions',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={View} 
        options={{ title: '' }}
      />
      <Tab.Screen 
        name="Budget" 
        component={PlaceholderScreen} 
        options={{ title: 'Budget' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={PlaceholderScreen} 
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Placeholder component for tabs we haven't implemented yet
function PlaceholderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Coming soon!</Text>
    </View>
  );
}

// Main App Navigator
const AppNavigator = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!session ? (
          <Stack.Screen name="Login" component={LoginScreen} />) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
        <Stack.Screen 
          name="AddTransaction" 
          component={AddTransactionScreen} 
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Add Transaction',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
