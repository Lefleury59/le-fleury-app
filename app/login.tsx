import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // false = Connexion, true = Inscription
  const [loading, setLoading] = useState(false);

  const handleAuthentication = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Succès", "Votre compte a été créé avec succès !");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      Alert.alert("Erreur d'authentification", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🎡</Text>
        <Text style={styles.title}>Parc Le Fleury</Text>
        
        {/* Sélecteur de mode (Connexion / Inscription) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, !isRegistering && styles.activeTab]} 
            onPress={() => setIsRegistering(false)}
          >
            <Text style={[styles.tabText, !isRegistering && styles.activeTabText]}>Connexion</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, isRegistering && styles.activeTab]} 
            onPress={() => setIsRegistering(true)}
          >
            <Text style={[styles.tabText, isRegistering && styles.activeTabText]}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuthentication} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? "Chargement..." : (isRegistering ? "S'inscrire" : "Se connecter")}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  emoji: { fontSize: 40, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1B4332', textAlign: 'center', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#f0f2f5', borderRadius: 8, marginBottom: 20, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  activeTab: { backgroundColor: '#2D6A4F', elevation: 1 },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#2D6A4F', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});