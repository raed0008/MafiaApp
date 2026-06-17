import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Rakkas_400Regular } from '@expo-google-fonts/rakkas';
import { Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { initAds, showInterstitial } from './src/ads';
import { colors } from './src/theme';

import HomeScreen from './src/screens/HomeScreen';
import RulesScreen from './src/screens/RulesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SetupScreen from './src/screens/SetupScreen';
import DealScreen from './src/screens/DealScreen';
import NightScreen from './src/screens/NightScreen';
import DayScreen from './src/screens/DayScreen';
import GameOverScreen from './src/screens/GameOverScreen';

import { buildPlayers, resolveNight, executePlayer, checkWinner } from './src/game/engine';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [players, setPlayers] = useState([]);
  const [setup, setSetup] = useState({ names: [], config: null }); // محفوظ لإعادة اللعب
  const [dayNumber, setDayNumber] = useState(1);
  const [nightDeaths, setNightDeaths] = useState([]);
  const [winner, setWinner] = useState(null);
  const [jester, setJester] = useState(null);

  const [fontsLoaded] = useFonts({ Rakkas_400Regular, Cairo_400Regular, Cairo_700Bold });

  // تهيئة الإعلانات مرة واحدة عند الإقلاع
  useEffect(() => {
    initAds();
  }, []);

  const startGame = (names, config) => {
    setSetup({ names, config });
    setPlayers(buildPlayers(names, config));
    setDayNumber(1);
    setWinner(null);
    setJester(null);
    setScreen('deal');
  };

  const replay = () => {
    showInterstitial(); // إعلان بيني عند نهاية الجولة
    startGame(setup.names, setup.config);
  };

  const goHomeFromOver = () => {
    showInterstitial();
    setScreen('home');
  };

  const endIfWon = (nextPlayers) => {
    const w = checkWinner(nextPlayers);
    if (w) {
      setWinner(w);
      setScreen('over');
      return true;
    }
    return false;
  };

  // انتهاء الليل → حلّ الأحداث ثم النهار
  const resolveNightPhase = (actions) => {
    const result = resolveNight(players, actions);
    setPlayers(result.players);
    setNightDeaths(result.deaths);
    if (!endIfWon(result.players)) {
      setScreen('day');
    }
  };

  // انتهاء التصويت → إعدام (أو لا) ثم ليلة جديدة
  const resolveVote = (targetId) => {
    if (targetId == null) {
      // لا إعدام — ليلة جديدة
      if (!endIfWon(players)) {
        setDayNumber((d) => d + 1);
        setScreen('night');
      }
      return;
    }
    const result = executePlayer(players, targetId);
    setPlayers(result.players);
    if (result.jesterWin) {
      setJester(result.executed);
      setWinner('jester');
      setScreen('over');
      return;
    }
    if (!endIfWon(result.players)) {
      setDayNumber((d) => d + 1);
      setScreen('night');
    }
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  }

  let content;
  switch (screen) {
    case 'rules':
      content = <RulesScreen onBack={() => setScreen('home')} />;
      break;
    case 'settings':
      content = <SettingsScreen onBack={() => setScreen('home')} />;
      break;
    case 'setup':
      content = <SetupScreen onBack={() => setScreen('home')} onStart={startGame} />;
      break;
    case 'deal':
      content = (
        <DealScreen players={players} onDone={() => setScreen('night')} onBack={() => setScreen('setup')} />
      );
      break;
    case 'night':
      content = <NightScreen players={players} dayNumber={dayNumber} onResolve={resolveNightPhase} />;
      break;
    case 'day':
      content = (
        <DayScreen players={players} dayNumber={dayNumber} deaths={nightDeaths} onExecute={resolveVote} />
      );
      break;
    case 'over':
      content = (
        <GameOverScreen
          winner={winner}
          players={players}
          jester={jester}
          onReplay={replay}
          onHome={goHomeFromOver}
        />
      );
      break;
    default:
      content = (
        <HomeScreen
          onNewGame={() => setScreen('setup')}
          onRules={() => setScreen('rules')}
          onSettings={() => setScreen('settings')}
        />
      );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {content}
    </SafeAreaProvider>
  );
}
