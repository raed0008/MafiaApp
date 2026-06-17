import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import { colors, space, font, radius, body, bodyBold } from '../theme';

// صف إعداد موحّد: أيقونة + عنوان + تحكّم
function Row({ icon, label, children, onPress, last }) {
  const Comp = onPress ? Pressable : View;
  return (
    <Comp onPress={onPress} style={[styles.row, last && styles.rowLast]}>
      <View style={styles.control}>{children}</View>
      <View style={styles.rowLabel}>
        <Text style={styles.label}>{label}</Text>
        <Icon name={icon} size={20} color={colors.frame} />
      </View>
    </Comp>
  );
}

function GoldSwitch({ value, onValueChange }) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#2A241B', true: '#7A6536' }}
      thumbColor={value ? colors.frame : '#8C8270'}
      ios_backgroundColor="#2A241B"
    />
  );
}

function SelectRow({ value, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.select}>
      <Icon name="chevron-down" size={16} color={colors.textDim} />
      <Text style={styles.selectText}>{value}</Text>
    </Pressable>
  );
}

export default function SettingsScreen({ onBack }) {
  const [sound, setSound] = useState(0.8);
  const [music, setMusic] = useState(0.6);
  const [vibration, setVibration] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [lang] = useState('العربية');
  const [quality, setQuality] = useState('متوسطة');

  const cycleQuality = () =>
    setQuality((q) => (q === 'منخفضة' ? 'متوسطة' : q === 'متوسطة' ? 'عالية' : 'منخفضة'));

  const resetProgress = () =>
    Alert.alert('إعادة التعيين', 'هل تريد إعادة ضبط التقدم؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'إعادة', style: 'destructive' },
    ]);

  const about = () => Alert.alert('عن اللعبة', 'المافيا — لعبة جماعية على جوال واحد.\nالإصدار 1.0.0');

  return (
    <Screen title="الإعدادات" onBack={onBack}>
      <View style={styles.card}>
        <Row icon="volume-high" label="الصوت">
          <Slider
            style={styles.slider}
            value={sound}
            onValueChange={setSound}
            minimumTrackTintColor={colors.frame}
            maximumTrackTintColor="#2A241B"
            thumbTintColor={colors.frame}
          />
        </Row>
        <Row icon="music" label="الموسيقى">
          <Slider
            style={styles.slider}
            value={music}
            onValueChange={setMusic}
            minimumTrackTintColor={colors.frame}
            maximumTrackTintColor="#2A241B"
            thumbTintColor={colors.frame}
          />
        </Row>
        <Row icon="cellphone-vibration" label="الاهتزاز">
          <GoldSwitch value={vibration} onValueChange={setVibration} />
        </Row>
        <Row icon="web" label="اللغة">
          <SelectRow value={lang} onPress={() => Alert.alert('اللغة', 'العربية فقط حالياً.')} />
        </Row>
        <Row icon="quality-high" label="الجودة">
          <SelectRow value={quality} onPress={cycleQuality} />
        </Row>
        <Row icon="bell" label="الإشعارات" last>
          <GoldSwitch value={notifications} onValueChange={setNotifications} />
        </Row>
      </View>

      <View style={styles.card}>
        <Row icon="information-outline" label="عن اللعبة" onPress={about}>
          <Icon name="chevron-back" set="ion" size={18} color={colors.textDim} />
        </Row>
        <Row icon="restore" label="إعادة تعيين التقدم" onPress={resetProgress} last>
          <Icon name="chevron-back" set="ion" size={18} color={colors.textDim} />
        </Row>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.md,
    marginBottom: space.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: space.md,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
  label: { color: colors.text, fontSize: font.body, fontFamily: bodyBold },
  control: { flex: 1, alignItems: 'flex-start' },
  slider: { width: '100%', height: 32 },
  select: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: space.md,
    paddingVertical: 7,
  },
  selectText: { color: colors.text, fontSize: font.small, fontFamily: bodyBold },
});
