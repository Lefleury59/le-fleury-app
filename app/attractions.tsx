import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ATTRACTIONS_FLEURY, Attraction } from '../fleuryData'; // Ajustez le chemin d'import si nécessaire

export default function AttractionsScreen() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['Tous', 'Carotte Ville', 'Le Bayou', 'Le monde des fleurs', "Le monde d'Elios"];

  // Filtrer les attractions selon la zone et la recherche textuelle
  const filteredAttractions = ATTRACTIONS_FLEURY.filter((item) => {
    const matchesZone = selectedZone === 'Tous' || item.zone === selectedZone;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  return (
    <View style={styles.mainContainer}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Rechercher une attraction..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtres par zone */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone}
            style={[styles.filterChip, selectedZone === zone && styles.activeFilterChip]}
            onPress={() => setSelectedZone(zone)}
          >
            <Text style={[styles.filterText, selectedZone === zone && styles.activeFilterText]}>
              {zone}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des attractions */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredAttractions.length === 0 ? (
          <Text style={styles.noResult}>Aucune attraction trouvée.</Text>
        ) : (
          filteredAttractions.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              
              <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                  <Text style={styles.attractionName}>{item.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: item.isOpen ? '#2D6A4F' : '#d90429' }]}>
                    <Text style={styles.statusText}>{item.isOpen ? 'Ouvert' : 'Fermé'}</Text>
                  </View>
                </View>

                <Text style={styles.zoneText}>📍 {item.zone} (Plan n°{item.numeroPlan})</Text>
                <Text style={styles.typeText}>🏷️ Type : {item.type}</Text>
                <Text style={styles.restrictionsText}>⚠️ {item.restrictions}</Text>
                
                {item.horaires && (
                  <Text style={styles.horairesText}>🕒 Horaires : {item.horaires}</Text>
                )}
              </View>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>⬅️ Retour à l'accueil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#f4f6f8' 
  },
  searchContainer: { 
    padding: 12, 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  searchInput: { 
    backgroundColor: '#f1f3f5', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 8, 
    fontSize: 14,
    color: '#333'
  },
  filterContainer: { 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    maxHeight: 60,
    backgroundColor: '#fff'
  },
  filterChip: { 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    backgroundColor: '#e9ecef', 
    borderRadius: 20, 
    marginRight: 8,
    height: 36,
    justifyContent: 'center'
  },
  activeFilterChip: { 
    backgroundColor: '#2D6A4F' 
  },
  filterText: { 
    fontSize: 13, 
    color: '#495057', 
    fontWeight: '600' 
  },
  activeFilterText: { 
    color: '#fff' 
  },
  listContainer: { 
    padding: 16 
  },
  noResult: { 
    textAlign: 'center', 
    color: '#666', 
    marginTop: 40, 
    fontSize: 15 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 16, 
    overflow: 'hidden', 
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  cardImage: { 
    width: '100%', 
    height: 150 
  },
  cardContent: { 
    padding: 12 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  attractionName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1B4332',
    flex: 1
  },
  statusBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6 
  },
  statusText: { 
    color: '#fff', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  zoneText: { 
    fontSize: 12, 
    color: '#666', 
    marginBottom: 2 
  },
  typeText: { 
    fontSize: 12, 
    color: '#2D6A4F', 
    fontWeight: '600', 
    marginBottom: 4 
  },
  restrictionsText: { 
    fontSize: 12, 
    color: '#d90429', 
    marginBottom: 4 
  },
  horairesText: { 
    fontSize: 12, 
    color: '#555', 
    fontStyle: 'italic' 
  },
  backButton: { 
    backgroundColor: '#2D6A4F', 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 30 
  },
  backButtonText: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold' 
  }
});