import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🎢</Text>
      <Text style={styles.title}>Bienvenue sur Le Fleury</Text>
      <Text style={styles.subtitle}>Votre guide interactif du parc d'attractions</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/plan' as any)}
        >
          <Text style={styles.buttonText}>🗺️ Voir le Plan du Parc</Text>
        </TouchableOpacity>

        {/* Bouton ajouté pour accéder directement à la liste des attractions */}
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

        <TouchableOpacity 
          style={styles.adminButton} 
          onPress={() => router.push('/admin' as any)}
        >
          <Text style={styles.adminButtonText}>🛠️ Espace Administrateur</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8', padding: 20 },
  emoji: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1B4332', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30, textAlign: 'center' },
  buttonContainer: { width: '100%', maxWidth: 300 },
  primaryButton: { backgroundColor: '#2D6A4F', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#ddd', elevation: 1 },
  secondaryButtonText: { color: '#2D6A4F', fontSize: 16, fontWeight: 'bold' },
  adminButton: { backgroundColor: '#333', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  adminButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});