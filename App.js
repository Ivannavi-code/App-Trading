import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🚀 Trading Signals</Text>
        <Text style={styles.subtitle}>App compilada con éxito</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Configuración Completa</Text>
          <Text style={styles.text}>• React Native CLI</Text>
          <Text style={styles.text}>• Firebase Firestore</Text>
          <Text style={styles.text}>• Cloud Messaging</Text>
          <Text style={styles.text}>• Firma Debug</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Siguiente Paso</Text>
          <Text style={styles.text}>
            Agrega las pantallas completas con navegación y Firebase
          </Text>
        </View>
        
        <Text style={styles.footer}>
          CodeMagic Build Success ✅
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 8,
  },
  footer: {
    fontSize: 14,
    color: '#22c55e',
    marginTop: 20,
    fontWeight: '600',
  },
});
