import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import { useSettings, setSetting, resetSettings } from '../settings';
import * as feedback from '../feedback';
import { colors, space, font, radius, body, bodyBold } from '../theme';

function Row({ icon, label, children, onPress, last }) {
  const Comp = onPress ? Pressable : View;
  return (
    <Comp onPress={onPress} style={[styles.row, last && styles.rowLast]}>
      <View style={styles.control}>{children}</View>
      <View style={styles.rowLabel}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.rowIcon}>
          <Icon name={icon} size={18} color={colors.gold} />
        </View>
      </View>
    </Comp>
  );
}

function GoldSwitch({ value, onValueChange }) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#2A241B', true: colors.goldDeep }}
      thumbColor={value ? colors.goldLight : '#8C8270'}
      ios_backgroundColor="#2A241B"
    />
  );
}

function SelectRow({ value, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.select}>
      <Icon name="chevron-down" size={16} color={colors.gold} />
      <Text style={styles.selectText}>{value}</Text>
    </Pressable>
  );
}

export default function SettingsScreen({ onBack }) {
  const s = useSettings();
  const lang = 'العربية';

  const [sound, setSound] = useState(s.sound);
  const [music, setMusic] = useState(s.music);
  useEffect(() => {
    setSound(s.sound);
    setMusic(s.music);
  }, [s.sound, s.music]);

  const cycleQuality = () => {
    const order = ['منخفضة', 'متوسطة', 'عالية'];
    const i = order.indexOf(s.quality);
    setSetting('quality', order[(i + 1) % order.length]);
  };

  const toggleVibration = (v) => {
    setSetting('vibration', v);
    if (v) feedback.tap();
  };

  const resetProgress = () =>
    Alert.alert('إعادة التعيين', 'هل تريد إعادة ضبط الإعدادات؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'إعادة', style: 'destructive', onPress: resetSettings },
    ]);

  const about = () => Alert.alert('عن اللعبة', 'مافيا الزعيم — لعبة جماعية على جوال واحد.\nالإصدار 2.0.0');

  return (
    <Screen title="الإعدادات" subtitle="اضبط أجواء اللعبة" onBack={onBack} backdrop="room">
      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.card}>
        <Row icon="volume-high" label="الصوت">
          <Slider style={styles.slider} value={sound} onValueChange={setSound} onSlidingComplete={(v) => setSetting('sound', v)} minimumTrackTintColor={colors.gold} maximumTrackTintColor="#2A241B" thumbTintColor={colors.goldLight} />
        </Row>
        <Row icon="music" label="الموسيقى">
          <Slider style={styles.slider} value={music} onValueChange={setMusic} onSlidingComplete={(v) => setSetting('music', v)} minimumTrackTintColor={colors.gold} maximumTrackTintColor="#2A241B" thumbTintColor={colors.goldLight} />
        </Row>
        <Row icon="vibrate" label="الاهتزاز">
          <GoldSwitch value={s.vibration} onValueChange={toggleVibration} />
        </Row>
        <Row icon="web" label="اللغة">
          <SelectRow value={lang} onPress={() => Alert.alert('اللغة', 'العربية فقط حالياً.')} />
        </Row>
        <Row icon="quality-high" label="الجودة">
          <SelectRow value={s.quality} onPress={cycleQuality} />
        </Row>
        <Row icon="bell" label="الإشعارات" last>
          <GoldSwitch value={s.notifications} onValueChange={(v) => setSetting('notifications', v)} />
        </Row>
      </Frame>

      <Frame variant="plaque" rad={radius.lg} padding={space.md} style={styles.card}>
        <Row icon="information-outline" label="عن اللعبة" onPress={about}>
          <Icon name="chevron-back" set="ion" size={18} color={colors.textDim} />
        </Row>
        <Row icon="restore" label="إعادة تعيين الإعدادات" onPress={resetProgress} last>
          <Icon name="chevron-back" set="ion" size={18} color={colors.textDim} />
        </Row>
      </Frame>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: space.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: space.md,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  rowIcon: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { color: colors.text, fontSize: font.body, fontFamily: bodyBold },
  control: { flex: 1, alignItems: 'flex-start' },
  slider: { width: '100%', height: 32 },
  select: {
    flexDirection: 'row-reverse', alignItems: 'center', gap: 6,
    backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.gold, borderRadius: radius.sm,
    paddingHorizontal: space.md, paddingVertical: 7,
  },
  selectText: { color: colors.text, fontSize: font.small, fontFamily: bodyBold },
});
