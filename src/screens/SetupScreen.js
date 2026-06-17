import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Switch } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';
import { ROLES } from '../data/roles';
import {
  MIN_PLAYERS,
  MAX_PLAYERS,
  suggestConfig,
  citizenCount,
  validateConfig,
} from '../data/distribution';

function Stepper({ value, onChange, min, max, accent = colors.gold }) {
  return (
    <View style={styles.stepper}>
      <Pressable
        style={[styles.stepBtn, value <= min && styles.stepDisabled]}
        onPress={() => value > min && onChange(value - 1)}
      >
        <Text style={styles.stepSign}>−</Text>
      </Pressable>
      <Text style={[styles.stepVal, { color: accent }]}>{value}</Text>
      <Pressable
        style={[styles.stepBtn, value >= max && styles.stepDisabled]}
        onPress={() => value < max && onChange(value + 1)}
      >
        <Text style={styles.stepSign}>+</Text>
      </Pressable>
    </View>
  );
}

function Toggle({ role, value, onChange }) {
  const r = ROLES[role];
  return (
    <View style={styles.toggleRow}>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: r.color }}
        thumbColor="#fff"
      />
      <View style={styles.toggleText}>
        <View style={styles.toggleNameRow}>
          <Text style={styles.toggleName}>{r.name}</Text>
          <Icon name={r.icon} size={18} color={r.color} />
        </View>
        <Text style={styles.toggleDesc}>{r.short}</Text>
      </View>
    </View>
  );
}

export default function SetupScreen({ onBack, onStart }) {
  const [count, setCount] = useState(7);
  const [names, setNames] = useState({});
  const [config, setConfig] = useState(() => suggestConfig(7));

  const setName = (i, text) => setNames((prev) => ({ ...prev, [i]: text }));

  const applyCount = (n) => {
    setCount(n);
    setConfig(suggestConfig(n));
  };

  const citizens = citizenCount(count, config);
  const validation = useMemo(() => validateConfig(count, config), [count, config]);
  const maxMafia = Math.max(1, Math.floor(count / 2) - 1);

  const handleStart = () => {
    if (!validation.ok) return;
    const nameList = Array.from({ length: count }, (_, i) =>
      (names[i] && names[i].trim()) ? names[i].trim() : `لاعب ${i + 1}`
    );
    onStart(nameList, config);
  };

  return (
    <Screen
      title="إعداد اللعبة"
      onBack={onBack}
      footer={
        <>
          {!validation.ok ? (
            <View style={styles.errorRow}>
              <Icon name="alert-circle" size={16} color={colors.blood} />
              <Text style={styles.error}>{validation.message}</Text>
            </View>
          ) : null}
          <Button title="توزيع الأدوار" onPress={handleStart} disabled={!validation.ok} />
        </>
      }
    >
      {/* عدد اللاعبين */}
      <View style={styles.block}>
        <Text style={styles.label}>عدد اللاعبين</Text>
        <Stepper value={count} onChange={applyCount} min={MIN_PLAYERS} max={MAX_PLAYERS} />
      </View>

      {/* تكوين الأدوار */}
      <View style={styles.block}>
        <View style={styles.blockHead}>
          <Pressable onPress={() => setConfig(suggestConfig(count))}>
            <Text style={styles.autoBtn}>تلقائي</Text>
          </Pressable>
          <Text style={styles.label}>الأدوار</Text>
        </View>

        <View style={styles.mafiaRow}>
          <Stepper
            value={config.mafiaCount}
            onChange={(v) => setConfig({ ...config, mafiaCount: v })}
            min={1}
            max={maxMafia}
            accent={colors.blood}
          />
          <View style={styles.toggleText}>
            <View style={styles.toggleNameRow}>
              <Text style={styles.toggleName}>عدد المافيا</Text>
              <Icon name="incognito" size={18} color={colors.blood} />
            </View>
            <Text style={styles.toggleDesc}>تقريبا ربع اللاعبين</Text>
          </View>
        </View>

        <Toggle role="godfather" value={config.godfather} onChange={(v) => setConfig({ ...config, godfather: v })} />
        <Toggle role="doctor" value={config.doctor} onChange={(v) => setConfig({ ...config, doctor: v })} />
        <Toggle role="detective" value={config.detective} onChange={(v) => setConfig({ ...config, detective: v })} />
        <Toggle role="sniper" value={config.sniper} onChange={(v) => setConfig({ ...config, sniper: v })} />
        <Toggle role="jester" value={config.jester} onChange={(v) => setConfig({ ...config, jester: v })} />

        <View style={styles.citizenBox}>
          <Text style={[styles.citizenNum, citizens < 0 && { color: colors.blood }]}>{citizens}</Text>
          <View style={styles.toggleNameRow}>
            <Text style={styles.citizenLabel}>مدنيون</Text>
            <Icon name="account" size={18} color={colors.town} />
          </View>
        </View>
      </View>

      {/* أسماء اللاعبين */}
      <View style={styles.block}>
        <Text style={styles.label}>الأسماء (اختياري)</Text>
        {Array.from({ length: count }).map((_, i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder={`لاعب ${i + 1}`}
            placeholderTextColor={colors.textFaint}
            value={names[i] || ''}
            onChangeText={(t) => setName(i, t)}
            maxLength={16}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.bgSoft,
    borderRadius: radius.lg,
    padding: space.md,
    marginBottom: space.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  blockHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { color: colors.text, fontSize: font.h2 + 2, fontFamily: serif, marginBottom: space.sm, textAlign: 'right' },
  autoBtn: { color: colors.gold, fontSize: font.small, fontFamily: bodyBold },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.lg },
  stepBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDisabled: { opacity: 0.3 },
  stepSign: { color: colors.text, fontSize: 26, fontFamily: bodyBold, lineHeight: 30 },
  stepVal: { fontSize: 34, fontFamily: serif, minWidth: 50, textAlign: 'center' },
  mafiaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.sm,
    gap: space.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toggleText: { flex: 1, alignItems: 'flex-end' },
  toggleNameRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  toggleName: { color: colors.text, fontSize: font.body, fontFamily: bodyBold, textAlign: 'right' },
  toggleDesc: { color: colors.textDim, fontSize: font.small, marginTop: 2, textAlign: 'right', fontFamily: body },
  citizenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: space.md,
  },
  citizenNum: { color: colors.town, fontSize: 30, fontFamily: serif },
  citizenLabel: { color: colors.text, fontSize: font.body, fontFamily: bodyBold },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: space.md,
    paddingVertical: 12,
    color: colors.text,
    fontSize: font.body,
    fontFamily: body,
    marginBottom: space.sm,
    textAlign: 'right',
  },
  errorRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 6 },
  error: { color: colors.blood, fontSize: font.small, textAlign: 'center', fontFamily: bodyBold },
});
