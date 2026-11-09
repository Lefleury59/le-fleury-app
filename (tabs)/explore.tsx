import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Vérifiez le chemin relatif vers votre fichier firebaseConfig

export default function RestoScreen() {
  const [pointsDeVente, setPointsDeVente] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedZone, setSelectedZone] = useState<string>('Toutes');

  const zones = ['Toutes', 'Le Bayou', "Le monde d'Elios", 'Carotte Ville'];

  // Charger les points de vente depuis Firestore au démarrage
  useEffect(() => {
    async function fetchPointsDeVente() {
      try {
        const querySnapshot = await getDocs(collection(db, 'pointsDeVente'));
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPointsDeVente(list);
      } catch (error) {
        console.error("Erreur lors du chargement des points de vente depuis Firebase :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPointsDeVente();
  }, []);

  const filteredPoints = selectedZone === 'Toutes'
    ? pointsDeVente
    : pointsDeVente.filter(p => p.zone?.toLowerCase() === selectedZone.toLowerCase());

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2D6A4F" />
        <Text style={styles.loaderText}>Chargement des points de vente...</Text>
      </View>
    );
  }

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
        {filteredPoints.length === 0 ? (
          <Text style={styles.noResult}>Aucun point de vente trouvé.</Text>
        ) : (
          filteredPoints.map((resto) => (
            <View key={resto.id} style={styles.restoCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.zoneText}>📍 {resto.zone} {resto.numeroPlan ? `(Plan n°${resto.numeroPlan})` : ''}</Text>
                <View style={[styles.statusBadge, { backgroundColor: resto.isOpen ? '#2D6A4F' : '#d90429' }]}>
                  <Text style={styles.statusText}>{resto.isOpen ? 'Ouvert' : 'Fermé'}</Text>
                </View>
              </View>

              <Text style={styles.restoName}>{resto.name}</Text>
              <Text style={styles.restoType}>{resto.type}</Text>
              {resto.horaires ? <Text style={styles.horairesText}>🕒 {resto.horaires}</Text> : null}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' },
  loaderText: { marginTop: 10, color: '#2D6A4F', fontWeight: 'bold' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 15 },
  filtersContainer: { marginBottom: 15, flexDirection: 'row' },
  filterChip: { backgroundColor: '#E8F5E9', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, height: 36, justifyContent: 'center' },
  filterChipActive: { backgroundColor: '#2D6A4F' },
  filterText: { color: '#2D6A4F', fontWeight: 'bold', fontSize: 13 },
  filterTextActive: { color: '#fff' },
  restoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#eee' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  zoneText: { fontSize: 11, color: '#2D6A4F', fontWeight: 'bold', textTransform: 'uppercase' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  restoName: { fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 4 },
  restoType: { fontSize: 13, color: '#555', marginTop: 4 },
  horairesText: { fontSize: 12, color: '#771', marginTop: 6, fontStyle: 'italic' },
  noResult: { textAlign: 'center', color: '#666', marginTop: 30, fontSize: 14 }
});