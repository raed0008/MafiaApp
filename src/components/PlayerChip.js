import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from './Icon';
import { colors, radius, space, font, serif, bodyBold, body, shadow } from '../theme';

// صفّ ملفّ لاعب — قابل للاختيار (اختيار الهدف والتصويت)
export default function PlayerChip({ player, selected, onPress, disabled, accent = colors.gold, badge }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.chip,
        !disabled && shadow.soft,
        selected && { borderColor: accent, backgroundColor: colors.cardSoft },
        pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        disabled && styles.disabled,
      ]}
    >
      {selected ? <View style={[styles.edge, { backgroundColor: accent }]} /> : null}

      <View style={[styles.avatar, { borderColor: selected ? accent : colors.border, backgroundColor: selected ? accent : colors.bgSoft }]}>
        <Text style={[styles.monogram, { color: selected ? '#1B130A' : colors.frame }]}>
          {player.name?.charAt(0) || '؟'}
        </Text>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {player.name}
      </Text>

      {badge ? (
        <View style={[styles.badge, { borderColor: accent }]}>
          <Text style={[styles.badgeText, { color: accent }]}>{badge}</Text>
        </View>
      ) : null}

      {selected ? (
        <Icon name="check-decagram" size={26} color={accent} />
      ) : (
        <Icon name="circle-outline" size={22} color={colors.textFaint} />
      )}
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
    paddingVertical: 11,
    paddingHorizontal: space.md,
    gap: space.sm,
    marginBottom: space.sm,
    overflow: 'hidden',
  },
  edge: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 4 },
  disabled: { opacity: 0.4 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogram: { fontSize: 20, fontFamily: serif },
  name: { flex: 1, color: colors.text, fontSize: font.body + 1, fontFamily: bodyBold, textAlign: 'right' },
  badge: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.bgSoft,
  },
  badgeText: { fontSize: font.small, fontFamily: bodyBold },
});
