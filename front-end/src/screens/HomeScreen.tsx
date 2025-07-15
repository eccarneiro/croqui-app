import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { Location } from '../types';
import { DrawerActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'App'>;


const locations: Location[] = [
  { _id: '1', name: 'Parque Estadual Serra dos Pireneus', description: 'Clássico local com visual incrível e muitos boulders.', imageUrl: 'https://portal6.com.br/wp-content/uploads/2023/07/Escalada-1.jpg' },
  { _id: '2', name: 'Cristalina', description: 'Setor local com linhas novas e desafiadoras.', imageUrl: 'https://escalango.com/wp-content/uploads/2014/05/10177272_777470438939473_6408958702751322058_n.jpg' },
  { _id: '3', name: 'Pedra do Baú', description: 'Local icônico, várias rotas clássicas.', imageUrl: 'https://www.viagensecaminhos.com/wp-content/uploads/2023/03/pedra-do-bau.jpg' },
  { _id: '4', name: 'Serra da Canastra', description: 'Boulders e vias esportivas.', imageUrl: 'https://mercadocanastra.blog.br/wp-content/uploads/2023/11/a80e4-serradacanastra-vidasemparedes-5.jpg.webp' },
  { _id: '5', name: 'Chapada dos Veadeiros', description: 'Local com vistas incríveis e blocos desafiadores.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpaMb20YP0AmhF5Oalvr0fTE0_aa_buy_Ntw&s' },
  { _id: '6', name: 'Igatu Boulder', description: 'Cliff de pedra com várias vias esportivas.', imageUrl: 'https://27crags.s3.amazonaws.com/photos/000/093/93019/size_xl-4c21dbc429be.jpg' },
];

export default function HomeScreen({ navigation }: Props) {
  const { logout } = useContext(AuthContext);

  const handleLocationPress = (location: Location) => {
    navigation.navigate('Location', { location });

  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ flex: 1 }}>
      {/* Header com botão hamburguer */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Croqui</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Morro_do_Cabeludo_vista_frontal_1.jpg' }}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Conheça os melhores picos de escalada com o nosso croqui digital!</Text>
        </View>

        <Text style={styles.sectionTitle}>Locais de Escalada</Text>

        {locations.map((item) => (
          <TouchableOpacity key={item._id} onPress={() => handleLocationPress(item)} style={styles.locationCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.locationImage} />
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationDesc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonText: {
    fontSize: 28,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  locationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationDesc: {
    fontSize: 14,
    color: '#666',
  },
});
