import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet, Text } from "react-native";
import api from "../api/axios";

export default function CreateSectorModal({
  visible,
  onClose,
  onCreated,
}: {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
  locationName: string;
}) {
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/sectors", { nome, localizacao });
      setNome("");
      setLocalizacao("");
      onCreated();
      onClose();
    } catch (err) {
      alert("Erro ao criar setor");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Novo Setor</Text>
          <TextInput
            placeholder="Nome do Setor"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInput
            placeholder="Localização"
            value={localizacao}
            onChangeText={setLocalizacao}
            style={styles.input}
          />
          <Button title="Criar" onPress={handleCreate} />
          <Button title="Cancelar" onPress={onClose} color="#888" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    width: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
});
