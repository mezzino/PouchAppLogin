import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    lastUpdated: null,
  });
  
  const [koalaState, setKoalaState] = useState({
    // Base state - starts naked
    base: 'naked',
    // Clothing and accessories that can be unlocked
    clothing: null,
    accessories: [],
    // Mood based on budget health
    mood: 'neutral',
    // Level/XP system
    level: 1,
    xp: 200,
  });


  // Memoize the calculateBudgetHealth function
  const calculateBudgetHealthMemo = React.useCallback(() => {
    if (budget.income === 0) return 0;
    const expenseRatio = (budget.expenses / budget.income) * 100;
    return Math.max(0, 100 - expenseRatio);
  }, [budget.income, budget.expenses]);

  // Update koala state based on budget health
  useEffect(() => {
    const health = calculateBudgetHealthMemo();
    
    setKoalaState(prevState => {
      const newState = { ...prevState };
      let needsUpdate = false;
      
      // Update mood based on budget health
      const newMood = health < 30 ? 'sad' : health < 70 ? 'neutral' : 'happy';
      const newClothing = health < 30 ? null : health < 70 ? 'basic' : 'fancy';
      
      if (newMood !== prevState.mood || newClothing !== prevState.clothing) {
        newState.mood = newMood;
        newState.clothing = newClothing;
        needsUpdate = true;
      }
      
      return needsUpdate ? newState : prevState;
    });
  }, [calculateBudgetHealthMemo]);
  
  // Handle XP and level updates separately
  useEffect(() => {
    if (koalaState.xp < 100) return;
    
    setKoalaState(prevState => {
      const levelsGained = Math.floor(prevState.xp / 100);
      if (levelsGained === 0) return prevState;
      
      const newState = { ...prevState };
      newState.level += levelsGained;
      newState.xp = prevState.xp % 100;
      
      // Unlock new accessories at certain levels
      if (newState.level >= 5 && !newState.accessories.includes('hat')) {
        newState.accessories = [...newState.accessories, 'hat'];
      }
      if (newState.level >= 10 && !newState.accessories.includes('glasses')) {
        newState.accessories = [...newState.accessories, 'glasses'];
      }
         
      newState.accessories = ['hat','glasses'];

      return newState;
    });
  }, [koalaState.xp]);

  // Fetch budget data from Supabase
  const fetchBudgetData = useCallback(async () => {
    try {
      // Get the most recent record
      const { data: latestData, error: todayError } = await supabase
        .from('Financial')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (todayError && todayError.code !== 'PGRST116') { // Ignore 'not found' error
        throw todayError;
      }

      if (latestData) {
        const newBudget = {
          income: latestData.Income || 0,
          expenses: latestData.Expenses || 0,
          balance: (latestData.Income || 0) - (latestData.Expenses || 0),
          lastUpdated: latestData.created_at,
        };
        
        setBudget(newBudget);
        // Add XP when budget is updated
        setKoalaState(prev => ({
          ...prev,
          xp: Math.min(prev.xp + 10, 100) // Cap at 100 XP
        }));
        
        return newBudget;
      }
      
      // If no records exist, return zeros
      const emptyBudget = {
        income: 0,
        expenses: 0,
        balance: 0,
        lastUpdated: new Date().toISOString(),
      };
      
      setBudget(emptyBudget);
      return emptyBudget;
    } catch (error) {
      console.error('Error fetching budget data:', error);
      throw error;
    }
  }, []); // Empty dependency array as this function doesn't depend on any props or state

  // Add transaction (income or expense)
  const addTransaction = useCallback(async (type, amount, description = '') => {
    try {
      const transactionData = {
        [type === 'income' ? 'Income' : 'Expenses']: amount,
        created_at: new Date().toISOString()
      };
      
      // Get the current date in YYYY-MM-DD format for the date column
      // Get the most recent record
      const { data: existingData, error: fetchError } = await supabase
        .from('Financial')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // Ignore 'not found' error
        throw fetchError;
      }

      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('Financial')
          .update({
            [type === 'income' ? 'Income' : 'Expenses']: (existingData[type === 'income' ? 'Income' : 'Expenses'] || 0) + amount
          })
          .eq('id', existingData.id);

        if (updateError) throw updateError;
      } else {
        // Insert new record with current timestamp
        const { error: insertError } = await supabase
          .from('Financial')
          .insert([{ ...transactionData, created_at: new Date().toISOString() }]);

        if (insertError) throw insertError;
      }
      
      // Refresh budget data
      await fetchBudgetData();
      return { success: true };
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }, [fetchBudgetData]);

  const value = useMemo(() => ({
    budget,
    koalaState,
    fetchBudgetData,
    addTransaction,
    calculateBudgetHealth: calculateBudgetHealthMemo,
  }), [budget, koalaState, fetchBudgetData, addTransaction, calculateBudgetHealthMemo]);

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
