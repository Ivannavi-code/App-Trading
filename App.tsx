import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>📈 Trading Signals</Text>
          <Text style={styles.subtitle}>Professional Trading Analysis</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🚀 Welcome</Text>
            <Text style={styles.cardText}>Your trading app is ready!</Text>
            <Text style={styles.cardText}>Railway: trading-production-a44c.up.railway.app</Text>
            <Text style={styles.cardText}>Firebase: app-trading-25ea7</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Features</Text>
            <Text style={styles.feature}>✓ 12 Technical Indicators</Text>
            <Text style={styles.feature}>✓ Real-time Market Data</Text>
            <Text style={styles.feature}>✓ Risk Management</Text>
            <Text style={styles.feature}>✓ Push Notifications</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f3460',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#16213e',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f3460',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    color: '#16213e',
    marginBottom: 8,
  },
  feature: {
    fontSize: 16,
    color: '#16213e',
    marginBottom: 10,
  },
});

export default App;
