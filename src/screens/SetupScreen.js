import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Switch } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import RoleArt from '../art/RoleArt';
import GangScene from '../art/GangScene';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';
import { ROLES } from '../data/roles';
import { MIN_PLAYERS, MAX_PLAYERS, suggestConfig, citizenCount, validateConfig } from '../data/distribution';

function Stepper({ value, onChange, min, max, accent = colors.gold }) {
  return (
    <View style={styles.stepper}>
      <Pressable style={[styles.stepBtn, value <= min && styles.stepDisabled]} onPress={() => value > min && onChange(value - 1)} hitSlop={6}>
        <Text style={styles.stepSign}>−</Text>
      </Pressable>
      <Text style={[styles.stepVal, { color: accent }]}>{value}</Text>
      <Pressable style={[styles.stepBtn, value >= max && styles.stepDisabled]} onPress={() => value < max && onChange(value + 1)} hitSlop={6}>
        <Text style={styles.stepSign}>+</Text>
      </Pressable>
    </View>
  );
}

function Toggle({ role, value, onChange }) {
  const r = ROLES[role];
  return (
    <View style={[styles.toggleRow, value && { borderColor: r.color, backgroundColor: colors.cardSoft }]}>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.border, true: r.color }} thumbColor="#F3E8D2" ios_backgroundColor={colors.border} />
      <View style={styles.toggleText}>
        <Text style={styles.toggleName}>{r.name}</Text>
        <Text style={styles.toggleDesc}>{r.short}</Text>
      </View>
      <View style={[styles.thumb, { borderColor: value ? r.color : colors.border }]}>
        <RoleArt role={role} size={40} />
      </View>
    </View>
  );
}

export default function SetupScreen({ onBack, onStart }) {
  const [count, setCount] = useState(7);
  const [names, setNames] = useState({});
  const [config, setConfig] = useState(() => suggestConfig(7));

  const setName = (i, text) => setNames((prev) => ({ ...prev, [i]: text }));
  const applyCount = (n) => { setCount(n); setConfig(suggestConfig(n)); };

  const citizens = citizenCount(count, config);
  const validation = useMemo(() => validateConfig(count, config), [count, config]);
  const maxMafia = Math.max(1, Math.floor(count / 2) - 1);

  const handleStart = () => {
    if (!validation.ok) return;
    const nameList = Array.from({ length: count }, (_, i) => (names[i] && names[i].trim() ? names[i].trim() : `لاعب ${i + 1}`));
    onStart(nameList, config);
  };

  return (
    <Screen
      title="تكوين العصابة"
      subtitle="وزّع الأدوار وابدأ اللعب"
      onBack={onBack}
      backdrop="felt"
      footer={
        <>
          {!validation.ok ? (
            <View style={styles.errorRow}>
              <Icon name="alert-octagon" size={16} color={colors.bloodLight} />
              <Text style={styles.error}>{validation.message}</Text>
            </View>
          ) : null}
          <Button title="وزّع الأدوار" icon="cards-playing-outline" variant="gold" onPress={handleStart} disabled={!validation.ok} />
        </>
      }
    >
      <View style={styles.scene}>
        <GangScene width={290} />
      </View>

      {/* عدد اللاعبين */}
      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.block}>
        <View style={styles.blockHead}>
          <Icon name="account-group" size={20} color={colors.gold} />
          <Text style={styles.label}>عدد اللاعبين</Text>
        </View>
        <Stepper value={count} onChange={applyCount} min={MIN_PLAYERS} max={MAX_PLAYERS} />
      </Frame>

      {/* الأدوار */}
      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.block}>
        <View style={styles.blockHead}>
          <Pressable onPress={() => setConfig(suggestConfig(count))} hitSlop={8} style={styles.autoBtn}>
            <Icon name="auto-fix" size={14} color={colors.gold} />
            <Text style={styles.autoText}>تلقائي</Text>
          </Pressable>
          <View style={styles.blockHeadR}>
            <Icon name="cards" size={20} color={colors.gold} />
            <Text style={styles.label}>الأدوار</Text>
          </View>
        </View>

        <View style={styles.mafiaRow}>
          <Stepper value={config.mafiaCount} onChange={(v) => setConfig({ ...config, mafiaCount: v })} min={1} max={maxMafia} accent={colors.blood} />
          <View style={styles.toggleText}>
            <Text style={styles.toggleName}>عدد المافيا</Text>
            <Text style={styles.toggleDesc}>تقريباً ربع اللاعبين</Text>
          </View>
          <View style={[styles.thumb, { borderColor: colors.blood }]}>
            <RoleArt role="mafia" size={40} />
          </View>
        </View>

        <Toggle role="godfather" value={config.godfather} onChange={(v) => setConfig({ ...config, godfather: v })} />
        <Toggle role="doctor" value={config.doctor} onChange={(v) => setConfig({ ...config, doctor: v })} />
        <Toggle role="detective" value={config.detective} onChange={(v) => setConfig({ ...config, detective: v })} />
        <Toggle role="sniper" value={config.sniper} onChange={(v) => setConfig({ ...config, sniper: v })} />
        <Toggle role="jester" value={config.jester} onChange={(v) => setConfig({ ...config, jester: v })} />

        <View style={styles.citizenBox}>
          <Text style={[styles.citizenNum, citizens < 0 && { color: colors.blood }]}>{citizens}</Text>
          <View style={styles.toggleText}>
            <Text style={styles.toggleName}>مدنيون</Text>
            <Text style={styles.toggleDesc}>بلا قدرات — سلاحهم النقاش</Text>
          </View>
          <View style={[styles.thumb, { borderColor: colors.town }]}>
            <RoleArt role="citizen" size={40} />
          </View>
        </View>
      </Frame>

      {/* مؤقّت النقاش */}
      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.block}>
        <View style={styles.blockHead}>
          <Icon name="timer-sand" size={20} color={colors.gold} />
          <Text style={styles.label}>مؤقّت النقاش</Text>
        </View>
        <Stepper value={config.discussionMinutes ?? 0} onChange={(v) => setConfig({ ...config, discussionMinutes: v })} min={0} max={10} />
        <Text style={styles.timerHint}>
          {(config.discussionMinutes ?? 0) === 0 ? 'بلا مؤقّت — النقاش مفتوح' : `${config.discussionMinutes} دقائق نقاش قبل التصويت`}
        </Text>
      </Frame>

      {/* الأسماء */}
      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.block}>
        <View style={styles.blockHead}>
          <Icon name="account-edit" size={20} color={colors.gold} />
          <Text style={styles.label}>الأسماء (اختياري)</Text>
        </View>
        {Array.from({ length: count }).map((_, i) => (
          <View key={i} style={styles.inputRow}>
            <View style={styles.inputNum}>
              <Text style={styles.inputNumText}>{i + 1}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder={`لاعب ${i + 1}`}
              placeholderTextColor={colors.textFaint}
              value={names[i] || ''}
              onChangeText={(t) => setName(i, t)}
              maxLength={16}
            />
          </View>
        ))}
      </Frame>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scene: { alignItems: 'center', marginBottom: space.md },
  block: { marginBottom: space.md },
  blockHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.sm },
  blockHeadR: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  label: { color: colors.text, fontSize: font.h2 + 2, fontFamily: serif, textAlign: 'right' },
  autoBtn: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  autoText: { color: colors.gold, fontSize: font.small, fontFamily: bodyBold },

  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.xl },
  stepBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.bgSoft, borderWidth: 1.5, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  stepDisabled: { opacity: 0.3, borderColor: colors.border },
  stepSign: { color: colors.gold, fontSize: 26, fontFamily: bodyBold, lineHeight: 30 },
  stepVal: { fontSize: 38, fontFamily: serif, minWidth: 54, textAlign: 'center' },

  mafiaRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingVertical: space.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', gap: space.sm,
    paddingVertical: space.sm, paddingHorizontal: 6,
    borderWidth: 1, borderColor: 'transparent', borderRadius: radius.md, marginTop: 6,
  },
  toggleText: { flex: 1, alignItems: 'flex-end' },
  toggleName: { color: colors.text, fontSize: font.body + 1, fontFamily: bodyBold, textAlign: 'right' },
  toggleDesc: { color: colors.textDim, fontSize: font.small, marginTop: 2, textAlign: 'right', fontFamily: body },
  thumb: { width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: colors.bg },

  citizenBox: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingTop: space.md },
  citizenNum: { color: colors.town, fontSize: 34, fontFamily: serif, minWidth: 44, textAlign: 'center' },

  timerHint: { color: colors.textDim, fontSize: font.small, textAlign: 'center', fontFamily: body, marginTop: space.sm },

  inputRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginBottom: space.sm },
  inputNum: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  inputNumText: { color: colors.gold, fontSize: font.small, fontFamily: bodyBold },
  input: {
    flex: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: space.md, paddingVertical: 11, color: colors.text, fontSize: font.body, fontFamily: body, textAlign: 'right',
  },
  errorRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 6 },
  error: { color: colors.bloodLight, fontSize: font.small, textAlign: 'center', fontFamily: bodyBold },
});
