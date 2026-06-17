import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from './Icon';
import { colors } from '../theme';

// فاصل زخرفي: خط — معيّن — خط (بطابع عتيق)
export default function Divider({ width = 180, color = colors.frame }) {
  return (
    <View style={[styles.row, { width }]}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <Icon name="rhombus" size={9} color={color} style={styles.gem} />
      <Icon name="rhombus-outline" size={7} color={color} style={styles.gemSmall} />
      <Icon name="rhombus" size={9} color={color} style={styles.gem} />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, opacity: 0.8 },
  line: { flex: 1, height: 1.5, borderRadius: 1 },
  gem: { opacity: 0.95 },
  gemSmall: { opacity: 0.7 },
});
