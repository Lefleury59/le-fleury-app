import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function EvenementsScreen() {
  const [evenements, setEvenements] = useState<any[]>([]);
  const [parcHoraires, setParcHoraires] = useState<string>('Chargement des horaires...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Écoute en temps réel de la liste des événements
    const unsubEvents = onSnapshot(collection(db, 'evenements'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvenements(list);
    });

    // 2. Écoute en temps réel des horaires généraux du parc (depuis un document 'config/parc')
    const unsubConfig = onSnapshot(doc(db, 'config', 'parc'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setParcHoraires(data.horairesParc || "10h00 - 18h00");
      } else {
        setParcHoraires("10h00 - 18h00 (Horaires par défaut)");
      }
      setLoading(false);
    }, (error) => {
      console.error("Erreur horaires parc :", error);
      setLoading(false);
    });

    return () => {
      unsubEvents();
      unsubConfig();
    };
  }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2D6A4F" /></View>;
  }

  return (
    <View style={styles.container}>
      {/* Encart Horaires du Parc dynamique */}
      <View style={styles.horairesCard}>
        <Text style={styles.horairesTitle}>🕒 Horaires d'ouverture du Parc</Text>
        <Text style={styles.horairesText}>{parcHoraires}</Text>
      </View>

      <Text style={styles.headerTitle}>🎉 Événements & Spectacles</Text>

      {evenements.length === 0 ? (
        <Text style={styles.emptyText}>Aucun événement prévu pour l'instant.</Text>
      ) : (
        <FlatList
          data={evenements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.nom || item.titre || 'Événement'}</Text>
              <Text style={styles.desc}>{item.description || item.desc || ''}</Text>
              {item.horaire && (
                <Text style={styles.info}>🕒 Horaire de l'animation : {item.horaire}</Text>
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
  horairesCard: { backgroundColor: '#2D6A4F', padding: 16, borderRadius: 12, marginBottom: 20, alignItems: 'center', elevation: 3 },
  horairesTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  horairesText: { color: '#E8F5E9', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2D6A4F', marginBottom: 4 },
  desc: { fontSize: 13, color: '#666', marginBottom: 6 },
  info: { fontSize: 12, fontWeight: 'bold', color: '#2563EB' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 }
});