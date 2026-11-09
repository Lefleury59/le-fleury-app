import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';

export default function PlanScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🗺️ Plan du Parc Le Fleury</Text>
      <Text style={styles.subtitle}>Découvrez l'emplacement de toutes nos attractions et services</Text>

      <View style={styles.mapContainer}>
        {/* Remplacez l'URL par l'image locale ou le lien officiel de votre plan */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.hint}>Pincez l'écran pour zoomer sur une zone spécifique du parc.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    alignItems: 'center', 
    backgroundColor: '#f4f6f8', 
    padding: 16 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1B4332', 
    marginBottom: 5, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#666', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  mapContainer: { 
    width: '100%', 
    height: Dimensions.get('window').height * 0.65, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    overflow: 'hidden', 
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  mapImage: { 
    width: '100%', 
    height: '100%' 
  },
  hint: {
    marginTop: 15,
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center'
  }
});