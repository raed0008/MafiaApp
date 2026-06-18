import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Flourish } from './Ornament';
import { colors } from '../theme';

// فاصل زخرفي آرت-ديكو
export default function Divider({ width = 180, color = colors.frame, opacity = 0.9 }) {
  return (
    <View style={styles.wrap}>
      <Flourish width={width} color={color} opacity={opacity} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});
