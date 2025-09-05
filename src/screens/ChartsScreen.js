import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import BudgetBarChart from '../components/BudgetBarChart';

const ChartsScreen = () => {
  const { budget } = useBudget();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <BudgetBarChart 
          income={budget.income || 0} 
          expenses={budget.expenses || 0} 
        />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.incomeCard]}>
          <View style={styles.statHeader}>
            <View style={[styles.colorIndicator, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.statTitle}>Income</Text>
          </View>
          <Text style={[styles.statValue, styles.incomeText]}>
            ${budget.income?.toFixed(2) || '0.00'}
          </Text>
        </View>
        
        <View style={[styles.statCard, styles.expenseCard]}>
          <View style={styles.statHeader}>
            <View style={[styles.colorIndicator, { backgroundColor: '#F44336' }]} />
            <Text style={styles.statTitle}>Expenses</Text>
          </View>
          <Text style={[styles.statValue, styles.expenseText]}>
            ${budget.expenses?.toFixed(2) || '0.00'}
          </Text>
        </View>
        
        <View style={[styles.statCard, styles.balanceCard]}>
          <View style={styles.statHeader}>
            <View style={[styles.colorIndicator, { 
              backgroundColor: budget.balance >= 0 ? '#4CAF50' : '#F44336' 
            }]} />
            <Text style={styles.statTitle}>Balance</Text>
          </View>
          <Text style={[
            styles.statValue,
            budget.balance >= 0 ? styles.incomeText : styles.expenseText
          ]}>
            ${budget.balance?.toFixed(2) || '0.00'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#F44336',
  },
  incomeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  balanceCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
});

export default ChartsScreen;
