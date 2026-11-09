import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { EVENEMENTS_INITIAL, Evenement } from '../../constants/fleuryData';

export default function InfoScreen() {
  const [openingHours, setOpeningHours] = useState('10h00 - 18h30');
  const [events, setEvents] = useState<Evenement[]>(EVENEMENTS_INITIAL);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateTime = (id: string, newTime: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, time: newTime } : ev));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>ℹ️ Infos & Événements</Text>

      {/* Bouton bascule Mode Admin */}
      <TouchableOpacity style={styles.adminToggle} onPress={() => setIsAdmin(!isAdmin)}>
        <Text style={styles.adminToggleText}>{isAdmin ? '🔒 Quitter Mode Admin' : '🔐 Mode Admin (Équipe)'}</Text>
      </TouchableOpacity>

      {/* Horaires d'ouverture */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕒 Horaires d'ouverture du jour</Text>
        {isAdmin ? (
          <TextInput 
            style={styles.input} 
            value={openingHours} 
            onChangeText={setOpeningHours} 
            placeholder="Ex: 10h00 - 19h00"
          />
        ) : (
          <Text style={styles.hoursText}>Aujourd'hui : {openingHours}</Text>
        )}
      </View>

      {/* Événements du jour */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>✨ Événements du Jour</Text>
        {events.map((ev) => (
          <View key={ev.id} style={styles.eventRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eventTitle}>{ev.title}</Text>
              <Text style={styles.eventLoc}>📍 {ev.location}</Text>
            </View>
            {isAdmin ? (
              <TextInput 
                style={styles.inputSmall} 
                value={ev.time} 
                onChangeText={(text) => updateTime(ev.id, text)} 
              />
            ) : (
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{ev.time}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B4332', marginTop: 10, marginBottom: 10 },
  adminToggle: { backgroundColor: '#2D6A4F', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  adminToggleText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B4332', marginBottom: 10 },
  hoursText: { fontSize: 15, color: '#333', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, fontSize: 14 },
  inputSmall: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 6, width: 80, textAlign: 'center' },
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  eventTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  eventLoc: { fontSize: 12, color: '#666' },
  timeBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  timeText: { color: '#2D6A4F', fontWeight: 'bold', fontSize: 12 }
});