import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PlanScreen() {
  // HTML intégré qui affiche l'image en plein écran avec le support tactile natif du zoom (pinch-to-zoom)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: auto;
          }
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Si votre image est en ligne, mettez son URL directe. Si elle est locale dans les assets, l'URL ci-dessous pointe vers le fichier ou l'asset packagé -->
          <img src="https://www.hebergeur-image.fr/uploads/20261109/d0ffd9940a75cc3b495c676d24fe3357764ea2a6.jpg" />
        </div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Plan du Parc Le Fleury</Text>
      <Text style={styles.subtitle}>Pincez l'écran pour zoomer et explorer le parc</Text>

      <View style={styles.mapContainer}>
        <WebView 
          source={{ html: htmlContent }} 
          style={styles.webview}
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
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
    marginBottom: 15, 
    textAlign: 'center' 
  },
  mapContainer: { 
    width: '100%', 
    flex: 1,
    backgroundColor: '#fff', 
    borderRadius: 12, 
    overflow: 'hidden', 
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});