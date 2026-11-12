import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig'; // <-- Un seul "../" car le fichier est dans app/

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [acceptPromo, setAcceptPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }
    if (!acceptCGU) {
      Alert.alert("Conditions Générales", "Vous devez accepter les CGU pour créer un compte.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        cguAccepted: acceptCGU,
        promoAccepted: acceptPromo,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Succès", "Votre compte a bien été créé !");
      router.replace('/(tabs)'); // Redirige vers l'accueil de l'application

    } catch (error: any) {
      console.error("Erreur d'inscription :", error);
      let errorMessage = "Impossible de créer le compte.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Cette adresse email est déjà utilisée.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Format d'email invalide.";
      }
      Alert.alert("Erreur", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>🎡 Bienvenue au Le Fleury</Text>
      <Text style={styles.subtitle}>Créez votre compte pour retrouver vos billets et vos avantages.</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Adresse email</Text>
        <TextInput
          style={styles.input}
          placeholder="votre@email.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimum 6 caractères"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.checkboxContainer}>
          <Switch
            value={acceptCGU}
            onValueChange={setAcceptCGU}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={acceptCGU ? "#2D6A4F" : "#f4f3f4"}
          />
          <Text style={styles.checkboxLabel}>
            J'accepte les <Text style={styles.link}>Conditions Générales d'Utilisation (CGU)</Text> *
          </Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Switch
            value={acceptPromo}
            onValueChange={setAcceptPromo}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={acceptPromo ? "#2D6A4F" : "#f4f3f4"}
          />
          <Text style={styles.checkboxLabel}>
            J'accepte de recevoir les offres promotionnelles et actualités du parc.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Créer mon compte</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f6f8', padding: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1B4332', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 25 },
  formContainer: { width: '100%', maxWidth: 380, backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 16, color: '#333' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxLabel: { flex: 1, fontSize: 12, color: '#555', marginLeft: 10 },
  link: { color: '#2D6A4F', textDecorationLine: 'underline' },
  button: { backgroundColor: '#2D6A4F', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});