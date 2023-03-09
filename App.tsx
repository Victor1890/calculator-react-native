import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Switch, View, SafeAreaView } from 'react-native';
import Keyboard from './src/components/Keyboard';
import { ThemeContext, ThemeTypeEnum } from './src/context/theme.context';
import { myColors } from './src/styles/colors.style';


export default function App() {

  const [theme, setTheme] = useState<ThemeTypeEnum>(ThemeTypeEnum.LIGHT)

  return (
    <ThemeContext.Provider value={theme}>
    <SafeAreaView style={theme == ThemeTypeEnum.LIGHT ? styles.container : {...styles.container, backgroundColor: myColors.black}}>
      <StatusBar style="auto" />
      <Switch
        value={theme == ThemeTypeEnum.LIGHT}
        onValueChange={() => setTheme(theme == ThemeTypeEnum.LIGHT ? ThemeTypeEnum.DARK : ThemeTypeEnum.LIGHT)}
      />

      <Keyboard />
    </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
