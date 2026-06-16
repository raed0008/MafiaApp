import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../components/Icon';
import { colors, font, radius, space } from '../theme';
import * as Ads from './index';

// بانر إعلاني — يعرض إعلان AdMob الحقيقي عند توفّره، وإلا مساحة محجوزة
export default function AdBanner({ style }) {
  if (Ads.adsReady && Ads.Banner) {
    const BannerAd = Ads.Banner;
    return (
      <View style={[styles.wrap, style]}>
        <BannerAd
          unitId={Ads.BANNER_UNIT_ID}
          size={Ads.BannerSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.placeholder, style]}>
      <Icon name="bullhorn-variant-outline" size={16} color={colors.textFaint} />
      <Text style={styles.phText}>مساحة إعلانية</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  placeholder: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 50,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.bgSoft,
  },
  phText: { color: colors.textFaint, fontSize: font.small, fontWeight: '700' },
});
