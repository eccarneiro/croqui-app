import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import api from '../api/axios';

export default function CreateBoulderModal({ visible, onClose, onCreated, sectorId }: { visible: boolean, onClose: () => void, onCreated: () => void, sectorId: string }) {
  const [nome, setNome] = useState('');
  const [graduacao, setGraduacao] = useState('');
  const [fa, setFa] = useState('');

  const handleCreate = async () => {
    try {
      await api.post('/boulders', { nome, graduacao, fa, sector: sectorId });
      setNome('');
      setGraduacao('');
      setFa('');
      onCreated();
      onClose();
    } catch (err) {
      alert('Erro ao criar boulder');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Novo Boulder</Text>
          <TextInput placeholder="Nome do Boulder" value={nome} onChangeText={setNome} style={styles.input} />
          <TextInput placeholder="Graduação" value={graduacao} onChangeText={setGraduacao} style={styles.input} />
          <TextInput placeholder="FA" value={fa} onChangeText={setFa} style={styles.input} />
          <Button title="Criar" onPress={handleCreate} />
          <Button title="Cancelar" onPress={onClose} color="#888" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0008' },
  modalContent: { backgroundColor: '#fff', padding: 24, borderRadius: 8, width: 300 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
});