import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  Chip,
  ActivityIndicator,
  Searchbar,
} from 'react-native-paper';
import {subscribeToSignals} from '../services/firebase';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

export default function DashboardScreen({navigation}) {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToSignals((newSignals) => {
      setSignals(newSignals);
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const filteredSignals = signals.filter(signal =>
    signal.pair?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSignalColor = (type) => {
    return type === 'BUY' ? '#22c55e' : type === 'SELL' ? '#ef4444' : '#64748b';
  };

  const getSignalEmoji = (type) => {
    return type === 'BUY' ? '🟢' : type === 'SELL' ? '🔴' : '⚪';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Hace un momento';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
    return format(date, "dd MMM, HH:mm", {locale: es});
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Cargando señales...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar par..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#64748b"
        placeholderTextColor="#64748b"
      />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#22c55e']}
            tintColor="#22c55e"
          />
        }>
        {filteredSignals.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📭</Text>
            <Text style={styles.emptyTitle}>No hay señales</Text>
            <Text style={styles.emptySubtitle}>
              El sistema está monitoreando el mercado
            </Text>
          </View>
        ) : (
          filteredSignals.map((signal) => (
            <TouchableOpacity
              key={signal.id}
              onPress={() => navigation.navigate('SignalDetail', {signal})}
              activeOpacity={0.7}>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <View style={styles.pairContainer}>
                      <Text style={styles.emoji}>
                        {getSignalEmoji(signal.signal)}
                      </Text>
                      <Text style={styles.pair}>{signal.pair}</Text>
                    </View>
                    <Chip
                      style={[
                        styles.chip,
                        {backgroundColor: getSignalColor(signal.signal) + '20'}
                      ]}
                      textStyle={[
                        styles.chipText,
                        {color: getSignalColor(signal.signal)}
                      ]}>
                      {signal.signal}
                    </Chip>
                  </View>

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Confianza</Text>
                      <Text style={styles.infoValue}>
                        💪 {signal.confidence?.toFixed(1)}%
                      </Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Precio</Text>
                      <Text style={styles.infoValue}>
                        💰 {signal.price?.toFixed(5)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.targetRow}>
                    <Text style={styles.targetLabel}>
                      🎯 Target: {signal.target?.toFixed(5)}
                    </Text>
                    <Text style={styles.stopLabel}>
                      🛡️ Stop: {signal.stop_loss?.toFixed(5)}
                    </Text>
                  </View>

                  <View style={styles.footer}>
                    <Text style={styles.timestamp}>
                      🕐 {formatTimestamp(signal.timestamp)}
                    </Text>
                    <Text style={styles.timeframe}>
                      📊 {signal.timeframe || '1h'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    marginTop: 16,
    color: '#64748b',
    fontSize: 16,
  },
  searchBar: {
    margin: 16,
    backgroundColor: '#1e293b',
    elevation: 0,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pairContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  pair: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  targetLabel: {
    fontSize: 14,
    color: '#22c55e',
  },
  stopLabel: {
    fontSize: 14,
    color: '#ef4444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#64748b',
  },
  timeframe: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  bottomPadding: {
    height: 20,
  },
});
