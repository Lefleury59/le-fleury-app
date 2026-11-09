import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { POINTS_DE_VENTE } from '../../constants/fleuryData';

export default function RestoScreen() {
  const [selectedZone, setSelectedZone] = useState<string>('Toutes');

  const zones = ['Toutes', 'Le Bayou', "Le monde d'Elios", 'Carotte Ville'];

  const filteredPoints = selectedZone === 'Toutes'
    ? POINTS_DE_VENTE
    : POINTS_DE_VENTE.filter(p => p.zone.toLowerCase() === selectedZone.toLowerCase());

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>🍔 Restauration & Boutiques</Text>
      <Text style={styles.subtitle}>Retrouvez tous vos points de vente dans le parc.</Text>

      {/* Filtres par zone */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {zones.map((zone) => (
          <TouchableOpacity 
            key={zone} 
            style={[styles.filterChip, selectedZone === zone && styles.filterChipActive]}
            onPress={() => setSelectedZone(zone)}
          >
            <Text style={[styles.filterText, selectedZone === zone && styles.filterTextActive]}>{zone}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des points de vente */}
      <View style={{ marginBottom: 30 }}>
        {filteredPoints.map((resto) => (
          <View key={resto.id} style={styles.restoCard}>
            <Text style={styles.zoneText}>📍 {resto.zone}</Text>
            <Text style={styles.restoName}>{resto.name}</Text>
            <Text style={styles.restoType}>{resto.type}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 15 },
  filtersContainer: { marginBottom: 15, flexDirection: 'row' },
  filterChip: { backgroundColor: '#E8F5E9', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterChipActive: { backgroundColor: '#2D6A4F' },
  filterText: { color: '#2D6A4F', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: '#fff' },
  restoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  zoneText: { fontSize: 11, color: '#2D6A4F', fontWeight: 'bold', textTransform: 'uppercase' },
  restoName: { fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 2 },
  restoType: { fontSize: 13, color: '#555', marginTop: 4 }
});