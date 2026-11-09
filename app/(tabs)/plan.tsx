import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';

export default function PlanScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🗺️ Plan du Parc Le Fleury</Text>
      <Text style={styles.subtitle}>Emplacement des attractions et des services</Text>

      <View style={styles.mapContainer}>
        {/* Chemin relatif correct depuis le dossier app vers assets/images/plan-parc.jpg */}
        <Image 
          source={require('../assets/images/plan-parc.jpg')} 
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.hint}>Zoomez sur l'écran pour explorer les différentes zones du parc.</Text>
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
    height: Dimensions.get('window').height * 0.7, 
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