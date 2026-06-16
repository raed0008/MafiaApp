import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from './Icon';
import NightSky from '../art/NightSky';
import { colors, space, font, serif } from '../theme';

// غلاف موحّد للشاشات مع عنوان وزر رجوع اختياري + خلفية ليلية
export default function Screen({ title, subtitle, onBack, children, scroll = true, footer, skyline = false }) {
  const Body = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <NightSky skyline={skyline} />
      {(title || onBack) && (
        <View style={styles.header}>
          {onBack ? (
            <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
              <Icon name="chevron-forward" set="ion" size={18} color={colors.gold} />
              <Text style={styles.backText}>رجوع</Text>
            </Pressable>
          ) : (
            <View style={{ width: 70 }} />
          )}
          <View style={styles.titleWrap}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          <View style={{ width: 70 }} />
        </View>
      )}
      <Body
        style={styles.body}
        contentContainerStyle={scroll ? styles.content : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Body>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.md,
    paddingTop: space.sm,
    paddingBottom: space.sm,
  },
  back: { width: 70, flexDirection: 'row', alignItems: 'center', gap: 2 },
  backText: { color: colors.gold, fontSize: font.body, fontWeight: '700' },
  titleWrap: { flex: 1, alignItems: 'center' },
  title: { color: colors.text, fontSize: font.h2, fontWeight: '900', fontFamily: serif, letterSpacing: 0.5 },
  subtitle: { color: colors.textDim, fontSize: font.small, marginTop: 2 },
  body: { flex: 1 },
  content: { padding: space.md, paddingBottom: space.xl },
  footer: {
    padding: space.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bgSoft,
    gap: space.sm,
  },
});
