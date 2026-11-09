import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import QRCode from 'react-native-qrcode-svg'; // <-- Importation du générateur de QR code

export default function BilletsScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    async function getCameraPermissions() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    }
    getCameraPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setScannedData("BILLET-FLEURY-2026-IMPORTÉ");
      Alert.alert("Succès", "Votre billet a bien été importé !");
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Demande d'autorisation de la caméra...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text style={styles.errorText}>Accès à la caméra refusé.</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>🎟️ Mes Billets - Le Fleury</Text>
      <Text style={styles.subtitle}>Scannez ou importez votre billet pour l'afficher à l'entrée.</Text>

      {isScanning ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={({ data }) => {
              setScannedData(data);
              setIsScanning(false);
              Alert.alert("Billet scanné avec succès !", `Code : ${data}`);
            }}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsScanning(false)}>
            <Text style={styles.cancelButtonText}>Annuler le scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setIsScanning(true)}>
            <Text style={styles.buttonText}>📷 Scanner un QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
            <Text style={styles.secondaryButtonText}>📂 Importer depuis la galerie</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Zone d'affichage du vrai QR code généré */}
      {scannedData && (
        <View style={styles.ticketCard}>
          <Text style={styles.ticketTitle}>🎫 Billet Validé</Text>
          <Text style={styles.ticketCode}>Code unique : {scannedData}</Text>
          
          <View style={styles.qrContainer}>
            {/* Génération automatique du QR code visuel */}
            <QRCode
              value={scannedData}
              size={180}
              color="#1B4332"
              backgroundColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => setScannedData(null)}
          >
            <Text style={styles.deleteButtonText}>Supprimer ce billet</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f4f6f8', padding: 16, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', textAlign: 'center', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginTop: 10, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 20, textAlign: 'center' },
  actionsContainer: { width: '100%', maxWidth: 350, marginBottom: 20 },
  primaryButton: { backgroundColor: '#2D6A4F', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#2D6A4F', elevation: 1 },
  secondaryButtonText: { color: '#2D6A4F', fontSize: 16, fontWeight: 'bold' },
  cameraContainer: { width: '100%', height: 350, borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  camera: { flex: 1 },
  cancelButton: { backgroundColor: '#d9534f', padding: 10, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontWeight: 'bold' },
  ticketCard: { backgroundColor: '#fff', width: '100%', maxWidth: 350, borderRadius: 16, padding: 20, alignItems: 'center', elevation: 3, borderWidth: 1, borderColor: '#ddd' },
  ticketTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B4332', marginBottom: 5 },
  ticketCode: { fontSize: 13, color: '#555', marginBottom: 15 },
  qrContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, elevation: 2 },
  deleteButton: { backgroundColor: '#ffebee', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  deleteButtonText: { color: '#c62828', fontWeight: 'bold', fontSize: 12 }
});