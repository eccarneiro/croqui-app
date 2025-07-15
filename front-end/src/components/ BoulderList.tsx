import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import api from '../api/axios';
import CreateBoulderModal from './CreateBoulderModal';

interface Boulder {
  _id: string;
  nome: string;
  graduacao: string;
  fa: string;
}

export default function BoulderList({ sectorId }: { sectorId: string }) {
  const [boulders, setBoulders] = useState<Boulder[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBoulders = async () => {
    const res = await api.get(`/boulders?sector=${sectorId}`);
    setBoulders(res.data.filter((b: Boulder) => b.sector === sectorId));
  };

  useEffect(() => {
    fetchBoulders();
  }, []);

  return (
    <View style={{ marginLeft: 16 }}>
      <Button title="Criar Boulder" onPress={() => setShowModal(true)} />
      <FlatList
        data={boulders}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text style={{ color: '#666' }}>Graduação: {item.graduacao} | FA: {item.fa}</Text>
          </View>
        )}
      />
      <CreateBoulderModal visible={showModal} onClose={() => setShowModal(false)} onCreated={fetchBoulders} sectorId={sectorId} />
    </View>
  );
}