import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function AttractionsScreen() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écoute en temps réel de la collection 'attractions'
    const unsubscribe = onSnapshot(collection(db, 'attractions'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAttractions(list);
      setLoading(false);
    }, (error) => {
      console.error("Erreur de chargement des attractions :", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2D6A4F" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>🎡 Attractions du Parc</Text>
      
      {attractions.length === 0 ? (
        <Text style={styles.emptyText}>Aucune attraction disponible pour le moment.</Text>
      ) : (
        <FlatList
          data={attractions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.nom || item.name || 'Attraction'}</Text>
              <Text style={styles.desc}>{item.description || item.desc || 'Découvrez cette attraction sensationnelle !'}</Text>
              {item.tempsAttente && (
                <Text style={styles.info}>⏱️ Temps d'attente : {item.tempsAttente} min</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2D6A4F', marginBottom: 4 },
  desc: { fontSize: 13, color: '#666', marginBottom: 6 },
  info: { fontSize: 12, fontWeight: 'bold', color: '#D97706' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40 }
});