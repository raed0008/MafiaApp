import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Frame from './Frame';
import Icon from './Icon';
import { Suit, Sunburst } from './Ornament';
import { Ribbon } from './Nameplate';
import RoleArt from '../art/RoleArt';
import { ROLES, TEAM_LABEL } from '../data/roles';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

// رمز ورق اللعب لكل دور (نكهة)
const SUIT = {
  mafia: 'spade', godfather: 'club', doctor: 'heart',
  detective: 'diamond', sniper: 'spade', jester: 'club', citizen: 'heart',
};

const SIZES = {
  lg: { art: 134, name: 40, sun: 200 },
  md: { art: 104, name: 32, sun: 160 },
};

// بطاقة دور قابلة للجمع بطابع ورق اللعب
export default function RoleCard({ role, size = 'lg', showDesc = true, accent, children }) {
  const r = ROLES[role] || ROLES.citizen;
  const color = accent || r.color;
  const s = SIZES[size] || SIZES.lg;
  const suit = SUIT[role] || 'spade';

  return (
    <Frame variant="plaque" accent={color} corners rad={radius.lg} padding={space.lg} glow style={styles.card}>
      {/* أرقام/رموز الزوايا كورق اللعب */}
      <View style={[styles.pip, styles.pipTL]}>
        <Suit type={suit} size={16} color={color} />
      </View>
      <View style={[styles.pip, styles.pipBR]}>
        <Suit type={suit} size={16} color={color} />
      </View>

      {/* نافذة الصورة + أشعّة خلفية */}
      <View style={[styles.portrait, { width: s.sun, height: s.sun }]}>
        <View style={styles.sun}>
          <Sunburst size={s.sun} color={color} opacity={0.14} />
        </View>
        <RoleArt role={role} size={s.art} />
      </View>

      <Text style={[styles.name, { color, fontSize: s.name }]}>{r.name}</Text>
      <Ribbon label={TEAM_LABEL[r.team]} color={color} textColor="#241A0E" height={28} />

      {showDesc ? (
        <Frame variant="parchment" rad={radius.sm} padding={space.md} style={styles.descBox}>
          <Text style={styles.desc}>{r.desc}</Text>
        </Frame>
      ) : null}

      {children}
    </Frame>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', alignItems: 'center' },
  pip: { position: 'absolute' },
  pipTL: { top: 12, right: 12 },
  pipBR: { bottom: 12, left: 12, transform: [{ rotate: '180deg' }] },
  portrait: { alignItems: 'center', justifyContent: 'center', marginTop: space.sm },
  sun: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: serif, letterSpacing: 1, marginTop: space.sm, marginBottom: 6, textAlign: 'center' },
  descBox: { width: '100%', marginTop: space.md },
  desc: { color: colors.ink, fontSize: font.body, lineHeight: 26, textAlign: 'center', fontFamily: body },
});
