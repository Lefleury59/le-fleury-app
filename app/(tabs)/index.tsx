import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ATTRACTIONS_FLEURY, POINTS_DE_VENTE, EVENEMENTS_INITIAL } from '../../constants/fleuryData';
export default function HomeScreen() {
  const router = useRouter();

  // Fonction pour injecter toutes vos données locales dans Firebase Firestore
  const handleImportData = async () => {
    try {
      console.log("🚀 Début de l'importation dans Firebase...");

      // 1. Importation des Attractions
      for (const item of ATTRACTIONS_FLEURY) {
        await setDoc(doc(db, "attractions", item.id), {
          nom: item.name,
          zone: item.zone,
          type: item.type,
          restrictions: item.restrictions || "",
          image: item.image || "",
          isOpen: item.isOpen ?? true,
          horaires: item.horaires || "10h00 - 18h00",
          attente: "10 min",
          numeroPlan: item.numeroPlan || 0
        });
      }

      // 2. Importation des Points de Vente
      for (const item of POINTS_DE_VENTE) {
        await setDoc(doc(db, "points_de_vente", item.id), {
          nom: item.name,
          zone: item.zone,
          type: item.type,
          isOpen: item.isOpen ?? true,
          horaires: item.horaires || "11h00 - 18h00",
          numeroPlan: item.numeroPlan || ""
        });
      }

      // 3. Importation des Événements
      for (const item of EVENEMENTS_INITIAL) {
        await setDoc(doc(db, "evenements", item.id), {
          titre: item.title,
          heure: `${item.time} - ${item.location}`
        });
      }

      Alert.alert("Succès", "🎉 Toutes vos données ont été importées dans Firebase !");
    } catch (error: any) {
      console.error("❌ Erreur lors de l'importation : ", error);
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://www.hebergeur-image.fr/uploads/20261109/74d2420dbbefed787843ae15a80b6fb601fe1c7e.jpeg' }} 
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        
        <Image 
          source={{ uri: 'https://www.hebergeur-image.fr/uploads/20261109/11f6be4ca684e1fc3ad4af520770e57a065b5ec0.jpg' }} 
          style={styles.logo}
          resizeMode="cover"
        />

        <Text style={styles.title}>Bienvenue au Fleury</Text>
        <Text style={styles.subtitle}>Votre guide interactif du parc d'attractions</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/plan' as any)}
          >
            <Text style={styles.buttonText}>🗺️ Voir le Plan du Parc</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/attractions' as any)}
          >
            <Text style={styles.secondaryButtonText}>🎢 Liste des Attractions</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/explore' as any)}
          >
            <Text style={styles.secondaryButtonText}>🍔 Restauration & Boutiques</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/info' as any)}
          >
            <Text style={styles.secondaryButtonText}>ℹ️ Infos & Événements</Text>
          </TouchableOpacity>

          {/* Bouton d'importation pour initialiser Firebase une fois l'APK installé */}
          <TouchableOpacity 
            style={styles.importButton} 
            onPress={handleImportData}
          >
            <Text style={styles.importButtonText}>☁️ Synchroniser les données (Admin)</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 5, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  subtitle: { 
    fontSize: 14, 
    color: '#e0e0e0', 
    marginBottom: 30, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  buttonContainer: { width: '100%', maxWidth: 320 },
  primaryButton: { 
    backgroundColor: '#2D6A4F', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 12, 
    elevation: 3 
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { 
    backgroundColor: 'rgba(255, 255, 255, 0.92)', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 12, 
    elevation: 2 
  },
  secondaryButtonText: { color: '#1B4332', fontSize: 16, fontWeight: 'bold' },
  importButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffffff55'
  },
  importButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});