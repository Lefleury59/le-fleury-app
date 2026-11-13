import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../../assets/images/images.jpeg')} // Vous pouvez mettre votre photo de fond du parc ici
      style={styles.background}
      blurRadius={5} // Effet photo floutée en arrière-plan
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* En-tête avec le logo ajusté dans le rond */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/images/logo-fleury.jpg')} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Parc Le Fleury</Text>
            <Text style={styles.subtitle}>Votre guide officiel de visite</Text>
          </View>

          {/* Raccourcis vers les pages (routes directes sans /(tabs)/ pour éviter Unmatched Route) */}
          <View style={styles.menuGrid}>
            <TouchableOpacity style={styles.card} onPress={() => router.push('/attractions')}>
              <Text style={styles.cardEmoji}>🎢</Text>
              <Text style={styles.cardTitle}>Attractions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/billets')}>
              <Text style={styles.cardEmoji}>🎟️</Text>
              <Text style={styles.cardTitle}>Mes Billets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/explore')}>
              <Text style={styles.cardEmoji}>🍔</Text>
              <Text style={styles.cardTitle}>Se restaurer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/plan')}>
              <Text style={styles.cardEmoji}>🗺️</Text>
              <Text style={styles.cardTitle}>Plan du parc</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.75)' }, // Voile léger pour garder le texte bien lisible
  container: { flexGrow: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2D6A4F'
  },
  logo: { width: '50%', height: '50%' }, // Logo réduit pour bien rentrer dans le rond sans être coupé
  title: { fontSize: 26, fontWeight: 'bold', color: '#1B4332' },
  subtitle: { fontSize: 14, color: '#333', marginTop: 2, fontWeight: '500' },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', maxWidth: 400 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '48%', padding: 20, borderRadius: 14, alignItems: 'center', marginBottom: 16, elevation: 3, borderWidth: 1, borderColor: '#e0e0e0' },
  cardEmoji: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#2D6A4F', textAlign: 'center' }
});