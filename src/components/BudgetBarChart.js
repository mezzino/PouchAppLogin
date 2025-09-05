import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH * 0.9;
const CHART_HEIGHT = 200;
const BAR_WIDTH = 40;
const SPACING = 20;

const BudgetBarChart = ({ income = 0, expenses = 0 }) => {
  // Calculate maximum value for scaling
  const maxValue = Math.max(income, expenses, 100);
  const scale = (CHART_HEIGHT - 40) / maxValue;
  
  // Calculate bar heights
  const incomeHeight = income * scale;
  const expensesHeight = expenses * scale;
  
  // Calculate positions
  const incomeX = (CHART_WIDTH / 2) - BAR_WIDTH - (SPACING / 2);
  const expensesX = (CHART_WIDTH / 2) + (SPACING / 2);
  
  // Y position is from top, so we subtract from CHART_HEIGHT
  const incomeY = CHART_HEIGHT - incomeHeight - 30;
  const expensesY = CHART_HEIGHT - expensesHeight - 30;

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* X-axis */}
        <Rect
          x={0}
          y={CHART_HEIGHT - 30}
          width={CHART_WIDTH}
          height={2}
          fill="#333"
        />
        
        {/* Income Bar */}
        <G>
          <Rect
            x={incomeX}
            y={incomeY}
            width={BAR_WIDTH}
            height={incomeHeight}
            rx={4}
            fill="#4CAF50"
          />
          <SvgText
            x={incomeX + BAR_WIDTH / 2}
            y={incomeY - 5}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fill="#000"
          >
            ${income.toFixed(2)}
          </SvgText>
          <SvgText
            x={incomeX + BAR_WIDTH / 2}
            y={CHART_HEIGHT - 10}
            fontSize="12"
            textAnchor="middle"
            fill="#333"
          >
            Income
          </SvgText>
        </G>
        
        {/* Expenses Bar */}
        <G>
          <Rect
            x={expensesX}
            y={expensesY}
            width={BAR_WIDTH}
            height={expensesHeight}
            rx={4}
            fill="#F44336"
          />
          <SvgText
            x={expensesX + BAR_WIDTH / 2}
            y={expensesY - 5}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            fill="#000"
          >
            ${expenses.toFixed(2)}
          </SvgText>
          <SvgText
            x={expensesX + BAR_WIDTH / 2}
            y={CHART_HEIGHT - 10}
            fontSize="12"
            textAnchor="middle"
            fill="#333"
          >
            Expenses
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default BudgetBarChart;
