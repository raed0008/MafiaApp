import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from './Icon';
import { colors, radius, space, font } from '../theme';

// بطاقة لاعب قابلة للاختيار — تُستخدم في اختيار الهدف والتصويت
export default function PlayerChip({ player, selected, onPress, disabled, accent = colors.gold, badge }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.chip,
        selected && { borderColor: accent, backgroundColor: colors.cardSoft },
        pressed && !disabled && { opacity: 0.8 },
        disabled && styles.disabled,
      ]}
    >
      <View
        style={[
          styles.avatar,
          { backgroundColor: selected ? accent : colors.border },
        ]}
      >
        <Text style={[styles.avatarText, selected && { color: '#0E1116' }]}>
          {player.name?.charAt(0) || '؟'}
        </Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>
      {badge ? <Text style={[styles.badge, { color: accent }]}>{badge}</Text> : null}
      {selected ? <Icon name="check-circle" size={24} color={accent} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: space.md,
    gap: space.sm,
    marginBottom: space.sm,
  },
  disabled: { opacity: 0.35 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.text, fontSize: font.body, fontWeight: '900' },
  name: { flex: 1, color: colors.text, fontSize: font.body, fontWeight: '700', textAlign: 'right' },
  badge: { fontSize: font.small, fontWeight: '800' },
});
