import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function AttractionsScreen() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          renderItem={({ item }) => {
            // Détermination du statut (ouvert par défaut à true si non défini)
            const isOpen = item.isOpen !== false;

            return (
              <View style={styles.card}>
                {/* Image de l'attraction si disponible */}
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                ) : null}

                <View style={styles.cardContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.nom || item.name || 'Attraction'}</Text>
                    {item.numeroPlan ? (
                      <Text style={styles.planBadge}>N° {item.numeroPlan}</Text>
                    ) : null}
                  </View>

                  {/* Badge de Statut (Ouvert / Fermé) */}
                  <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, { backgroundColor: isOpen ? '#E9F5ED' : '#FEE2E2' }]}>
                      <Text style={[styles.statusText, { color: isOpen ? '#2D6A4F' : '#DC2626' }]}>
                        {isOpen ? '🟢 Ouvert' : '🔴 Fermé'}
                      </Text>
                    </View>
                    {item.zone ? <Text style={styles.zone}>📍 {item.zone}</Text> : null}
                  </View>

                  <Text style={styles.desc}>
                    {item.description || item.desc || 'Découvrez cette attraction sensationnelle !'}
                  </Text>

                  {/* Horaires et Temps d'attente */}
                  <View style={styles.infoRow}>
                    {item.horaires ? (
                      <Text style={styles.infoText}>🕒 {item.horaires}</Text>
                    ) : null}
                    {item.attente ? (
                      <Text style={styles.waitTime}>⏱️ {item.attente}</Text>
                    ) : null}
                  </View>

                  {/* Restrictions d'accès */}
                  {item.restrictions ? (
                    <Text style={styles.restrictions}>⚠️ {item.restrictions}</Text>
                  ) : null}
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
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 3, borderWidth: 1, borderColor: '#eee' },
  image: { width: '100%', height: 160 },
  cardContent: { padding: 14 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#2D6A4F', flex: 1 },
  planBadge: { backgroundColor: '#E9F5ED', color: '#2D6A4F', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  zone: { fontSize: 12, color: '#666', fontWeight: '600' },
  desc: { fontSize: 13, color: '#555', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 8 },
  infoText: { fontSize: 12, color: '#444' },
  waitTime: { fontSize: 12, fontWeight: 'bold', color: '#D97706' },
  restrictions: { fontSize: 11, color: '#DC2626', backgroundColor: '#FEF2F2', padding: 6, borderRadius: 6, marginTop: 4 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40 }
});