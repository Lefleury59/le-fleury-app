import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête avec le logo-fleury.jpg ajusté et centré dans son rond */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/images/logo-fleury.jpg')} 
            style={styles.logo} 
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Parc Le Fleury</Text>
        <Text style={styles.subtitle}>Votre guide officiel de visite</Text>
      </View>

      {/* Raccourcis rapides vers les sections */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/attractions')}>
          <Text style={styles.cardEmoji}>🎢</Text>
          <Text style={styles.cardTitle}>Attractions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/billets')}>
          <Text style={styles.cardEmoji}>🎟️</Text>
          <Text style={styles.cardTitle}>Mes Billets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/points')}>
          <Text style={styles.cardEmoji}>🍔</Text>
          <Text style={styles.cardTitle}>Se restaurer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/plan')}>
          <Text style={styles.cardEmoji}>🗺️</Text>
          <Text style={styles.cardTitle}>Plan du parc</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f6f8', padding: 20, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // Empêche l'image de dépasser des bords arrondis
    borderWidth: 2,
    borderColor: '#2D6A4F'
  },
  logo: { width: '100%', height: '100%' }, // Remplit parfaitement le cercle sans déformation
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B4332' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', maxWidth: 400 },
  card: { backgroundColor: '#fff', width: '48%', padding: 20, borderRadius: 14, alignItems: 'center', marginBottom: 16, elevation: 2, borderWidth: 1, borderColor: '#eee' },
  cardEmoji: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#2D6A4F', textAlign: 'center' }
});