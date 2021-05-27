import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabOneParamList } from '../types';

type TabOneScreenNavigationProp = StackNavigationProp<TabOneParamList,'TabOneScreen'>;

type Props = {navigation: TabOneScreenNavigationProp}

export default function LoginScreen({route}: {route: any}, {navigation}: Props) {
  const { name } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name} Login Screen</Text>
      <Button title="Back" onPress={() => navigation.navigate("TabOneScreen", {name: "Went back"})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
