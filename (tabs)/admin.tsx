// app/admin.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
// Remontée de 2 niveaux pour atteindre les dossiers à la racine
import { ATTRACTIONS_FLEURY, POINTS_DE_VENTE } from '../../constants/fleuryData';
import { importerToutesLesDonnees } from '../../utils/importData';

export default function AdminScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [attractions, setAttractions] = useState(ATTRACTIONS_FLEURY);
  const [pointsDeVente, setPointsDeVente] = useState(POINTS_DE_VENTE);

  // Définissez votre mot de passe administrateur ici
  const ADMIN_PASSWORD = "fleury2026"; 

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const toggleAttraction = (id: string) => {
    setAttractions(prev =>
      prev.map(item => (item.id === id ? { ...item, isOpen: !item.isOpen } : item))
    );
  };

  const togglePointDeVente = (id: string) => {
    setPointsDeVente(prev =>
      prev.map(item => (item.id === id ? { ...item, isOpen: !item.isOpen } : item))
    );
  };

  // Si l'administrateur n'est pas connecté, on affiche l'écran de verrouillage
  if (!isAuthenticated) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>🔒 Accès Administrateur Restreint</Text>
        <Text style={styles.loginSubtitle}>Veuillez entrer le mot de passe pour continuer</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Si l'administrateur est authentifié, on affiche le panneau de gestion
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🛠️ Espace Administrateur - Le Fleury</Text>
      
      <View style={styles.adminActionsRow}>
        {/* Bouton d'importation Firebase */}
        <TouchableOpacity 
          style={styles.importButton} 
          onPress={importerToutesLesDonnees}
        >
          <Text style={styles.importButtonText}>☁️ Charger les données dans Firebase</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => { setIsAuthenticated(false); setPassword(''); }}
        >
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION ATTRACTIONS */}
      <Text style={styles.sectionTitle}>Gestion des Attractions</Text>
      {attractions.map(item => (
        <View key={item.id} style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.status, { color: item.isOpen ? '#2e7d32' : '#c62828' }]}>
              {item.isOpen ? '🟢 Ouverte' : '🔴 Fermée (Maintenance)'}
            </Text>
          </View>
          <Switch
            value={item.isOpen}
            onValueChange={() => toggleAttraction(item.id)}
            trackColor={{ false: '#ffcdd2', true: '#c8e6c9' }}
            thumbColor={item.isOpen ? '#4caf50' : '#f44336'}
          />
        </View>
      ))}

      {/* SECTION POINTS DE VENTE */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Gestion des Points de Vente</Text>
      {pointsDeVente.map(item => (
        <View key={item.id} style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.status, { color: item.isOpen ? '#2e7d32' : '#c62828' }]}>
              {item.isOpen ? '🟢 Ouvert' : '🔴 Fermé'}
            </Text>
          </View>
          <Switch
            value={item.isOpen}
            onValueChange={() => togglePointDeVente(item.id)}
            trackColor={{ false: '#ffcdd2', true: '#c8e6c9' }}
            thumbColor={item.isOpen ? '#4caf50' : '#f44336'}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  loginTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  loginSubtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', maxWidth: 300, borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 10, backgroundColor: '#fafafa' },
  errorText: { color: 'red', marginBottom: 10, fontSize: 13 },
  loginButton: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  loginButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  adminActionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  importButton: { backgroundColor: '#2D6A4F', padding: 10, borderRadius: 6, flex: 1, marginRight: 10, alignItems: 'center' },
  importButtonText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#ff3b30', padding: 10, borderRadius: 6, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#444', borderBottomWidth: 2, borderBottomColor: '#ddd', paddingBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  info: { flex: 1, marginRight: 10 },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  status: { fontSize: 13, marginTop: 4, fontWeight: '500' }
});