import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // Écoute de l'état de connexion Firebase en temps réel
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  // Gestion de la redirection automatique
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      // Si l'utilisateur n'est pas connecté et n'est pas sur la page login -> Redirection vers login
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Si l'utilisateur est connecté et est sur la page login -> Redirection vers l'accueil du parc
      router.replace('/(tabs)');
    }
  }, [user, initializing, segments]);

  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="billets" options={{ headerShown: true, title: "Mes Billets" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' }
});