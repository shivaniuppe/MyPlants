import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "/Users/shivaniuppe/Desktop/MyPlants/src/firebaseConfig.js";

export default function PlantListScreen({ route }) {
  const { plantsData } = route.params || {};
  const [plants, setPlants] = useState(plantsData || []);

  console.log("🚀 Navigated to PlantListScreen with data:", plantsData);

  useEffect(() => {
    async function fetchPlants() {
      if (!plantsData) {
        console.log("No plant data provided, fetching from Firestore...");
        try {
          const querySnapshot = await getDocs(collection(db, "plants"));
          let plantList = [];
          querySnapshot.forEach((doc) => {
            console.log("📄 Document fetched:", doc.id, doc.data());
            plantList.push({ id: doc.id, ...doc.data() });
          });
          console.log("✅ Final plant list:", plantList);
          setPlants(plantList);
        } catch (error) {
          console.error("❌ Error fetching plants:", error);
        }
      } else {
        console.log("Using provided plant data...");
      }
    }
    fetchPlants();
  }, []);

  // 🗑️ Delete Plant from Firestore
  const deletePlant = async (id) => {
    try {
      await deleteDoc(doc(db, "plants", id));
      Alert.alert("Plant deleted successfully!");

      // Update UI after deletion
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    } catch (error) {
      console.error("❌ Error deleting plant:", error);
      Alert.alert("Failed to delete plant.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌱 Plant List</Text>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>🌱 {item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Location: {item.location}</Text>
            {item.notes && <Text>Notes: {item.notes}</Text>}
            {item.dateAdded && (
              <Text>
                Date Added: {new Date(item.dateAdded).toLocaleDateString()}
              </Text>
            )}

            {/* 🗑️ Delete Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  "Confirm Delete",
                  `Are you sure you want to delete ${item.name}?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: () => deletePlant(item.id) },
                  ]
                )
              }
            >
              <Text style={styles.deleteText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {plants.length === 0 && <Text>No plants available.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
