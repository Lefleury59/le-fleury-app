import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://www.hebergeur-image.fr/uploads/20261109/74d2420dbbefed787843ae15a80b6fb601fe1c7e.jpeg' }} // Vous pouvez remplacer par une belle photo d'ambiance du parc
      style={styles.background}
      blurRadius={4} // Effet flouté pour l'arrière-plan
    >
      {/* Superposition sombre semi-transparente pour contraster le texte */}
      <View style={styles.overlay}>
        
        {/* Logo du parc au-dessus du titre */}
        <Image 
          source={{ uri: 'https://www.hebergeur-image.fr/uploads/20261109/11f6be4ca684e1fc3ad4af520770e57a065b5ec0.jpg' }} // Remplacez par le lien de votre logo officiel
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
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Assombrit l'arrière-plan flouté pour faire ressortir les textes et boutons
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
    marginBottom: 35, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  buttonContainer: { 
    width: '100%', 
    maxWidth: 320 
  },
  primaryButton: { 
    backgroundColor: '#2D6A4F', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  secondaryButton: { 
    backgroundColor: 'rgba(255, 255, 255, 0.92)', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 12, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  secondaryButtonText: { 
    color: '#1B4332', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});