import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function AttractionsScreen() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const categories = ['Tous', 'Sensation', 'Famille', 'Enfant'];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'attractions'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAttractions(list);
      setFilteredAttractions(list);
      setLoading(false);
    }, (error) => {
      console.error("Erreur chargement attractions :", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFilter = (category: string) => {
    setSelectedFilter(category);
    if (category === 'Tous') {
      setFilteredAttractions(attractions);
    } else {
      const filtered = attractions.filter(item => 
        item.zone && item.zone.toLowerCase().includes(category.toLowerCase()) ||
        item.type && item.type.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredAttractions(filtered);
    }
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2D6A4F" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🎢 Attractions du Parc</Text>
      
      {/* Boutons de filtres */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterButton, selectedFilter === cat && styles.activeFilterButton]}
            onPress={() => handleFilter(cat)}
          >
            <Text style={[styles.filterText, selectedFilter === cat && styles.activeFilterText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredAttractions.length === 0 ? (
        <Text style={styles.emptyText}>Aucune attraction trouvée pour cette catégorie.</Text>
      ) : (
        <FlatList
          data={filteredAttractions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isOpen = item.isOpen !== false;

            return (
              <View style={styles.card}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                ) : null}

                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.nom || item.name || 'Attraction'}</Text>
                    {item.numeroPlan ? <Text style={styles.planBadge}>N° {item.numeroPlan}</Text> : null}
                  </View>

                  <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, { backgroundColor: isOpen ? '#E9F5ED' : '#FEE2E2' }]}>
                      <Text style={[styles.statusText, { color: isOpen ? '#2D6A4F' : '#DC2626' }]}>
                        {isOpen ? '🟢 Ouvert' : '🔴 Fermé'}
                      </Text>
                    </View>
                    {item.zone ? <Text style={styles.zone}>📍 {item.zone}</Text> : null}
                  </View>

                  <Text style={styles.desc}>{item.description || item.desc || ''}</Text>

                  <View style={styles.infoRow}>
                    {item.horaires ? <Text style={styles.infoText}>🕒 {item.horaires}</Text> : null}
                    {item.attente ? <Text style={styles.waitTime}>⏱️ {item.attente}</Text> : null}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginBottom: 10, textAlign: 'center' },
  filterContainer: { maxHeight: 50, marginBottom: 15, flexGrow: 0 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#ddd', height: 36, justifyContent: 'center' },
  activeFilterButton: { backgroundColor: '#2D6A4F', borderColor: '#2D6A4F' },
  filterText: { fontSize: 13, color: '#555', fontWeight: '600' },
  activeFilterText: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 3, borderWidth: 1, borderColor: '#eee' },
  image: { width: '100%', height: 150 },
  cardContent: { padding: 14 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2D6A4F', flex: 1 },
  planBadge: { backgroundColor: '#E9F5ED', color: '#2D6A4F', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  zone: { fontSize: 12, color: '#666', fontWeight: '600' },
  desc: { fontSize: 13, color: '#555', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 8 },
  infoText: { fontSize: 12, color: '#444' },
  waitTime: { fontSize: 12, fontWeight: 'bold', color: '#D97706' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40 }
});