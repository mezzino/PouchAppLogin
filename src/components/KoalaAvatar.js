import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';

// Koala base image
const KOALA_IMAGE = require('../../assets/images/icon.png');
const CLOTHING = {
  naked: '',
  basic: '👕',
  fancy: '👔',
  hoodie: '👘',
  jacket: '🧥',
  sweater: '🧶',
  tshirt: '👕',
  polo: '👔',
  dress: '👗',
  suit: '🤵',
  uniform: '👮',
  lab_coat: '🥼',
  vest: '🦺',
  tank_top: '🎽',
};

const ACCESSORIES = {
  hat: '🎩',
  glasses: '👓',
  bowtie: '🎀',};

const MOODS = {
  sad: '😢',
  neutral: '😐',
  happy: '😊',};

const KoalaAvatar = ({ size = 200 }) => {
  const { koalaState } = useBudget();
  
  // Calculate the container size based on the avatar size
  const containerSize = size * 1.5;
  
  // Determine which accessories to show based on unlocked items
  const activeAccessories = koalaState.accessories
    .map(acc => ACCESSORIES[acc])
    .filter(Boolean);

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <View style={styles.avatarContainer}>
        {/* Base koala */}
        <Image 
          source={KOALA_IMAGE} 
          style={[styles.koala, { width: size, height: size }]} 
          resizeMode="contain"
        />
        
        {/* Clothing (if any) */}
        {koalaState.clothing && (
          <Text style={[styles.clothing, { fontSize: size * 0.3 }]}>
            {CLOTHING[koalaState.clothing]}
          </Text>
        )}
        
        {/* Accessories */}
        {activeAccessories.map((accessory, index) => (
          <Text 
            key={index} 
            style={[styles.accessory, { fontSize: size * 0.5 }]}
          >
            {accessory}
          </Text>
        ))}
        
        {/* Mood indicator */}
        <Text style={[styles.mood, { fontSize: size * 0.3}]}>
          {MOODS[koalaState.mood]}
        </Text>
      </View>
      
      {/* Level indicator */}
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level {koalaState.level}</Text>
        <View style={styles.xpBar}>
          <View 
            style={[
              styles.xpFill, 
              { width: `${koalaState.xp}%` }
            ]} 
          />
        </View>
        <Text style={styles.xpText}>{koalaState.xp}/100 XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 1,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    position: 'absolute',
  },
  koala: {
    zIndex: 1,
    position: 'relative',
  },
  clothing: {
    position: 'absolute',
    zIndex: 2,
  },
  accessory: {
    position: 'absolute',
    zIndex: 3,
  },
  mood: {
    position: 'relative',
    top: -100,
    right: -100,
    zIndex: 4,
  },
  levelContainer: {
    marginTop: -50,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  xpBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  xpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default KoalaAvatar;
