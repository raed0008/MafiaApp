import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from './Icon';
import * as feedback from '../feedback';
import { colors, font, space, radius, serif, body, bodyBold } from '../theme';

const SIZE = 220;
const STROKE = 12;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
};

// مؤقّت نقاش دائري: عدّ تنازلي مع إيقاف مؤقّت وإضافة وقت.
export default function Timer({ seconds, onDone, accent = colors.gold }) {
  const [total, setTotal] = useState(seconds);
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(true);
  const firedDone = useRef(false);

  // العدّاد
  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  // اهتزاز عند العلامات المهمّة
  useEffect(() => {
    if (remaining === 10) feedback.warn();
    if (remaining === 0 && !firedDone.current) {
      firedDone.current = true;
      feedback.impact();
    }
  }, [remaining]);

  const done = remaining === 0;
  const progress = total > 0 ? remaining / total : 0;
  const ringColor = done ? colors.blood : remaining <= 10 ? colors.blood : accent;

  const addTime = () => {
    feedback.tap();
    firedDone.current = false;
    setTotal((t) => t + 30);
    setRemaining((r) => r + 30);
    setRunning(true);
  };

  const toggle = () => {
    feedback.tap();
    setRunning((v) => !v);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.ring}>
        <Svg width={SIZE} height={SIZE}>
          <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={colors.card} strokeWidth={STROKE} fill="none" />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            stroke={ringColor}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
        <View style={styles.center}>
          <Text style={[styles.time, done && { color: colors.blood }]}>{fmt(remaining)}</Text>
          <Text style={styles.label}>{done ? 'انتهى الوقت' : running ? 'النقاش' : 'متوقّف'}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={addTime} style={styles.ctrlBtn} hitSlop={8}>
          <Icon name="plus" size={20} color={colors.frame} />
          <Text style={styles.ctrlText}>٣٠ث</Text>
        </Pressable>
        <Pressable onPress={toggle} style={[styles.ctrlBtn, styles.ctrlMain]} disabled={done} hitSlop={8}>
          <Icon name={running ? 'pause' : 'play'} size={26} color={done ? colors.textFaint : colors.frame} />
        </Pressable>
        <View style={styles.ctrlBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginVertical: space.md },
  ring: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  time: { color: colors.text, fontSize: 58, fontFamily: serif, letterSpacing: 1 },
  label: { color: colors.textDim, fontSize: font.body, fontFamily: body, marginTop: -4 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.xl, marginTop: space.lg },
  ctrlBtn: { width: 64, height: 56, alignItems: 'center', justifyContent: 'center', gap: 2 },
  ctrlMain: {
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  ctrlText: { color: colors.frame, fontSize: font.small, fontFamily: bodyBold },
});
