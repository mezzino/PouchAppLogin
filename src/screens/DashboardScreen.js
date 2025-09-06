import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import KoalaAvatar from '../components/KoalaAvatar';
import { supabase } from '../lib/supabase';

const DashboardScreen = ({ navigation }) => {
  const { budget, koalaState, fetchBudgetData, calculateBudgetHealth } = useBudget();
  const budgetHealth = calculateBudgetHealth();

  // Handle add transaction button press
  const handleAddTransaction = (type) => {
    navigation.navigate('AddTransaction', { type });
  };

  // Fetch budget data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBudgetData();
      } catch (_error) {
        Alert.alert('Error', 'Failed to load budget data');
      }
    };

    loadData();
  }, [fetchBudgetData]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Pouch</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>


      {/* Koala Avatar */}
      <View style={styles.avatarContainer}>
        <KoalaAvatar size={120} />
        <Text style={styles.budgetHealthText}>
          Budget Health: {Math.round(budgetHealth)}%
        </Text>
        <Text style={styles.koalaMoodText}>
          Koala is feeling {koalaState.mood} {koalaState.mood === 'happy' ? '😊' : koalaState.mood === 'neutral' ? '😐' : '😢'}
        </Text>
      </View>

      {/* Budget Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Budget Summary</Text>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Income:</Text>
          <Text style={[styles.summaryValue, styles.incomeText]}>
            ${budget.income.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Expenses:</Text>
          <Text style={[styles.summaryValue, styles.expenseText]}>
            -${budget.expenses.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.summaryItem, styles.totalContainer]}>
          <Text style={styles.summaryLabel}>Balance:</Text>
          <Text 
            style={[
              styles.summaryValue, 
              budget.balance >= 0 ? styles.positiveBalance : styles.negativeBalance
            ]}
          >
            ${Math.abs(budget.balance).toFixed(2)} {budget.balance < 0 ? 'Owed' : 'Left'}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.addIncomeButton]}
          onPress={() => navigation.navigate('AddTransaction', { type: 'income' })}
        >
          <Text style={styles.actionButtonText}>+ Income</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.addExpenseButton]}
          onPress={() => navigation.navigate('AddTransaction', { type: 'expense' })}
        >
          <Text style={styles.actionButtonText}>- Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions (Placeholder) */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Text style={styles.placeholderText}>Your recent transactions will appear here</Text>
        {/* In a real app, you would map through transactions here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  signOutText: {
    color: '#666',
    fontWeight: '500',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  budgetHealthText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  koalaMoodText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  incomeText: {
    color: '#2e7d32', // Green for income
  },
  expenseText: {
    color: '#c62828', // Red for expenses
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 8,
  },
  positiveBalance: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  negativeBalance: {
    color: '#c62828',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  addIncomeButton: {
    backgroundColor: '#e8f5e9',
  },
  addExpenseButton: {
    backgroundColor: '#ffebee',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default DashboardScreen;
