import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import api from '../api/axios';
import CreateSectorModal from './ CreateSectorModal';
import BoulderList from './ BoulderList';

interface Sector {
  _id: string;
  nome: string;
  localizacao: string;
  imagem?: string;
}

export default function SectorList({ locationId }: { locationId: string }) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const fetchSectors = async () => {
    const res = await api.get(`/sectors?location=${locationId}`);
    setSectors(res.data);
  };

  useEffect(() => {
    fetchSectors();
  }, [locationId, showModal]);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Criar Setor" onPress={() => setShowModal(true)} />
      <FlatList
        data={sectors}
        keyExtractor={item => item._id}
        style={{ marginTop: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedSector(selectedSector === item._id ? null : item._id)}
          >
            <Image
              source={{ uri: item.imagem || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.location}>{item.localizacao}</Text>
              {selectedSector === item._id && (
                <BoulderList sectorId={item._id} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <CreateSectorModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onCreated={fetchSectors}
        locationId={locationId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});