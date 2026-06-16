import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// مكوّن أيقونة موحّد. set: 'mci' (افتراضي) | 'ion'
export default function Icon({ name, size = 22, color = colors.text, set = 'mci', style }) {
  const Lib = set === 'ion' ? Ionicons : MaterialCommunityIcons;
  return <Lib name={name} size={size} color={color} style={style} />;
}
