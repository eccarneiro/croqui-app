import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import SectorList from '../components/SectorList';

export default function LocationScreen({ route }: any) {
  const { location } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: location.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{location.name}</Text>
      <Text style={styles.description}>{location.description}</Text>
      <SectorList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, color: '#666', marginBottom: 16 },
});