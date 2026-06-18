import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from './Icon';
import { Flourish, Suit } from './Ornament';
import Backdrop from '../art/Backdrop';
import { colors, space, font, serif, body, bodyBold } from '../theme';

// غلاف موحّد للشاشات: خلفية مرسومة + ترويسة مزخرفة + تذييل
export default function Screen({
  title,
  subtitle,
  onBack,
  children,
  scroll = true,
  footer,
  backdrop = 'room',
}) {
  const Body = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Backdrop variant={backdrop} />

      {title || onBack ? (
        <View style={styles.header}>
          {onBack ? (
            <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
              <Icon name="chevron-forward" set="ion" size={18} color={colors.gold} />
              <Text style={styles.backText}>رجوع</Text>
            </Pressable>
          ) : (
            <View style={{ width: 72 }} />
          )}
          <View style={styles.titleWrap}>
            {title ? (
              <View style={styles.titleRow}>
                <Suit type="spade" size={11} color={colors.goldDeep} />
                <Text style={styles.title}>{title}</Text>
                <Suit type="spade" size={11} color={colors.goldDeep} />
              </View>
            ) : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          <View style={{ width: 72 }} />
        </View>
      ) : null}

      {title ? (
        <View style={styles.dividerWrap}>
          <Flourish width={200} color={colors.gold} opacity={0.85} />
        </View>
      ) : null}

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
    paddingBottom: 6,
  },
  back: { width: 72, flexDirection: 'row', alignItems: 'center', gap: 2 },
  backText: { color: colors.gold, fontSize: font.body, fontFamily: bodyBold },
  titleWrap: { flex: 1, alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: {
    color: colors.frame,
    fontSize: font.h1,
    fontFamily: serif,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: { color: colors.textDim, fontSize: font.small, marginTop: 3, fontFamily: body },
  dividerWrap: { alignItems: 'center', marginBottom: space.sm, marginTop: 1 },
  body: { flex: 1 },
  content: { padding: space.md, paddingBottom: space.xl },
  footer: {
    padding: space.md,
    paddingTop: space.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: 'rgba(8,7,5,0.82)',
    gap: space.sm,
  },
});
