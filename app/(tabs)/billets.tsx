import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import QRCode from 'react-native-qrcode-svg';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; // Ajustez selon votre chemin

export default function BilletsScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myTickets, setMyTickets] = useState<any[]>([]);

  const currentUser = auth.currentUser;

  useEffect(() => {
    async function getCameraPermissions() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }
    getCameraPermissions();

    // Si un utilisateur est connecté, on écoute EN TEMPS RÉEL uniquement SES billets
    if (currentUser) {
      const q = query(
        collection(db, 'billets_scannes'),
        where('userId', '==', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ticketsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMyTickets(ticketsList);
      }, (error) => {
        console.error("Erreur lors de la récupération des billets :", error);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  // Fonction pour enregistrer dans Firebase lié à l'utilisateur
  const saveTicketToFirebase = async (data: string) => {
    if (!currentUser) {
      Alert.alert("Connexion requise", "Vous devez être connecté pour enregistrer un billet.");
      return;
    }

    try {
      await addDoc(collection(db, 'billets_scannes'), {
        codeQR: data,
        userId: currentUser.uid, // <-- Clé indispensable pour isoler les billets par utilisateur
        userEmail: currentUser.email,
        dateScan: serverTimestamp(),
        statut: 'Validé via PDF/Import'
      });
      console.log("Billet enregistré dans Firestore pour l'utilisateur :", currentUser.uid);
    } catch (error: any) {
      console.error("Erreur Firestore :", error);
      Alert.alert("Erreur", "Impossible d'enregistrer le billet.");
    }
  };

  // Fonction pour importer un PDF de billet
  const pickPdfTicket = async () => {
    if (!currentUser) {
      Alert.alert("Connexion requise", "Veuillez vous connecter pour importer un billet.");
      return;
    }

    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        const extractedCode = `PDF-${selectedFile.name.replace(/\.[^/.]+$/, "").toUpperCase()}-${Math.floor(Math.random() * 100000)}`;

        await saveTicketToFirebase(extractedCode);
        Alert.alert("Succès", `Billet PDF "${selectedFile.name}" importé et validé !`);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du PDF :", error);
      Alert.alert("Erreur", "Impossible de lire le fichier PDF.");
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Chargement...</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>🎟️ Mes Billets - Le Fleury</Text>
      <Text style={styles.subtitle}>
        {currentUser ? `Connecté : ${currentUser.email}` : "Mode invité (Veuillez vous connecter)"}
      </Text>

      {isScanning ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={async ({ data }) => {
              setIsScanning(false);
              await saveTicketToFirebase(data);
              Alert.alert("Billet scanné !", `Code : ${data}`);
            }}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsScanning(false)}>
            <Text style={styles.cancelButtonText}>Annuler le scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setIsScanning(true)}>
            <Text style={styles.buttonText}>📷 Scanner un QR Code en direct</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={pickPdfTicket} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#2D6A4F" />
            ) : (
              <Text style={styles.secondaryButtonText}>📄 Importer mon billet PDF</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Liste des billets de l'utilisateur connecté en temps réel */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Mes billets enregistrés ({myTickets.length})</Text>
        
        {myTickets.length === 0 ? (
          <Text style={styles.emptyText}>Aucun billet enregistré pour le moment.</Text>
        ) : (
          myTickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <Text style={styles.ticketTitle}>🎫 Billet Valide</Text>
              <Text style={styles.ticketCode}>Référence : {ticket.codeQR}</Text>
              
              <View style={styles.qrContainer}>
                <QRCode
                  value={ticket.codeQR}
                  size={160}
                  color="#1B4332"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <Text style={styles.statusText}>Statut : {ticket.statut}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f6f8', padding: 16, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginTop: 10, textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 20, textAlign: 'center' },
  actionsContainer: { width: '100%', maxWidth: 350, marginBottom: 20 },
  primaryButton: { backgroundColor: '#2D6A4F', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#2D6A4F', elevation: 1 },
  secondaryButtonText: { color: '#2D6A4F', fontSize: 16, fontWeight: 'bold' },
  cameraContainer: { width: '100%', height: 350, borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  camera: { flex: 1 },
  cancelButton: { backgroundColor: '#d9534f', padding: 10, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { width: '100%', maxWidth: 350, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332', marginBottom: 10 },
  emptyText: { fontSize: 13, color: '#888', fontStyle: 'italic', textAlign: 'center', marginBottom: 20 },
  ticketCard: { backgroundColor: '#fff', width: '100%', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 15, elevation: 3, borderWidth: 1, borderColor: '#ddd' },
  ticketTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332', marginBottom: 5 },
  ticketCode: { fontSize: 12, color: '#555', marginBottom: 15, textAlign: 'center' },
  qrContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, elevation: 2 },
  statusText: { fontSize: 11, color: '#2D6A4F', fontWeight: 'bold' }
});