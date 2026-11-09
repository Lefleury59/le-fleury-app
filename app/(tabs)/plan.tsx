import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ScreenOrientation from 'expo-screen-orientation';
// Importation de votre vraie configuration centralisée
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

interface PointDeVente {
  id: string;
  nom: string;
  lettre: string;
  latitude: number;
  longitude: number;
  horaires: string;
}

export default function PlanScreen() {
  const [points, setPoints] = useState<PointDeVente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Activer la rotation automatique de l'écran
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();

    // 2. Écouter les données en TEMPS RÉEL avec onSnapshot
    const unsubscribe = onSnapshot(collection(db, "points_de_vente"), (querySnapshot) => {
      const pointsList: PointDeVente[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        pointsList.push({
          id: doc.id,
          nom: data.nom || '',
          lettre: data.lettre || '',
          latitude: data.latitude || 50.2815,
          longitude: data.longitude || 3.3110,
          horaires: data.horaires || 'Non renseigné',
        });
      });
      setPoints(pointsList);
      setLoading(false);
    }, (error) => {
      console.error("Erreur lors de la récupération des points Firebase :", error);
      setLoading(false);
    });

    // Nettoyage de l'écouteur lorsque l'écran est quitté
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 50.2815,
          longitude: 3.3110,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        zoomEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        showsCompass={true}
      >
        {points.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
          >
            {/* Repère affichant la lettre */}
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>{p.lettre}</Text>
            </View>

            {/* Infobulle */}
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{p.nom} (Zone {p.lettre})</Text>
                <Text style={styles.calloutText}>🕒 Horaires : {p.horaires}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  markerContainer: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
  calloutContainer: { padding: 5, minWidth: 120 },
  calloutTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 3 },
  calloutText: { fontSize: 12, color: '#333333' },
});