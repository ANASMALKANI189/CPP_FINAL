import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const categories = [
  { id: 1, name: "Eye Infection", image: require('../../assets/images/logo.png') },
  { id: 2, name: "Fever", image: require('../../assets/images/logo.png') },
  { id: 3, name: "Stomach Ache", image: require('../../assets/images/logo.png') },
  { id: 4, name: "Cough", image: require('../../assets/images/logo.png') },
  { id: 5, name: "Cold", image: require('../../assets/images/logo.png') },
  { id: 6, name: "Vomiting", image: require('../../assets/images/logo.png') },
  { id: 7, name: "Mouth Ulcers", image: require('../../assets/images/logo.png') },
  { id: 8, name: "Back Ache", image: require('../../assets/images/logo.png') },
  { id: 9, name: "Skin Allergy", image: require('../../assets/images/logo.png') },
  { id: 10, name: "Throat Infection", image: require('../../assets/images/logo.png') },
  { id: 11, name: "Sprain", image: require('../../assets/images/logo.png') },
  { id: 12, name: "Headache", image: require('../../assets/images/logo.png') },
  { id: 13, name: "Others", image: require('../../assets/images/logo.png') },
];

export default function medicine() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose Category</Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, selected === item.id && styles.selectedCard]} 
            onPress={() => setSelected(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#6699FF", 
    paddingVertical: 15, 
    paddingHorizontal: 15 
  },
  menuIcon: { marginRight: 10, marginTop: 20 },
  menuText: { fontSize: 24, color: "#fff" },
  headerText: { fontSize: 20, color: "#fff", fontWeight: "bold" , marginTop:20},
  grid: { paddingHorizontal: 10, paddingTop: 10 },
  card: { 
    flex: 1, 
    margin: 8, 
    alignItems: "center", 
    padding: 10, 
    backgroundColor: "#fff", 
    borderRadius: 15, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 }, 
    elevation: 3 
  },
  selectedCard: { borderWidth: 3, borderColor: "#007BFF" },
  image: { width: 80, height: 80, borderRadius: 15 },
  text: { marginTop: 5, fontSize: 14, textAlign: "center", fontWeight: "600" }
});
