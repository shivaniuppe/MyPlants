import {
  and,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "/Users/shivaniuppe/Desktop/MyPlants/src/firebaseConfig.js";


export default function HomeScreen({navigation}) {
  const [name, setName] = useState(""); 
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");


  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");


  function clearFields() {
    setName("");
    setType("");
    setLocation("");
  }
  // check if the plant already exists in the specified location
  async function checkIfPlantExists(plantName, plantLocation) {
    console.log("checking if plant exists");
    // Reference to the plants collection
    const plantsRef = collection(db, "plants");
    console.log("Collection reference: ", plantsRef);

    const q = query(
      plantsRef,
      and(
        where("name", "==", plantName),
        where("location", "==", plantLocation)
      )
    );
    console.log("Query: ", q);

    // Query to find a plant with the given name
    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot: ", querySnapshot);
    console.log(plantName);

    // Check if the query returned any documents
    if (querySnapshot.empty) {
      console.log(
        `No plant with the name ${name} exists in the ${location} location.`
      );
      return false;
    } else {
      console.log("Plant with that name already exists in that location.");
      return true;
    }
  }

    // function to insert new plant in db
    async function insertNewPlant() {
        console.log("Insert function called");
    
        console.log("Name: ", name);
        console.log("Location: ", location);
        console.log("Notes: ", notes);
    
        if (await checkIfPlantExists(name, location)) {
        console.log(`Plant ${name} already exists in the ${location} location.`);
        clearFields();
        } else {
        console.log(
            `Plant ${name} does not exist yet in the ${location} location - adding plant ${name}`
        );
        try {
            const docRef = doc(collection(db, "plants"));
            await setDoc(docRef, {
            name: name,
            type: type,
            location: location,
            notes: notes, // New "notes" field
            dateAdded: new Date().toISOString(), // Auto-generated date
            });
    
            console.log("Document written with ID: ", docRef.id);
    
            // Clear input fields after successful insertion
            setName("");
            setType("");
            setLocation("");
            setNotes(""); // Clear the notes field
    
            Alert.alert(`Plant "${name}" in "${location}" location inserted into db.`);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        }
    }
    

  // function to retrieve all plants from the database
 // Fetch and navigate to the Plant List screen
 const getPlants = async () => {
    try {
      console.log("Fetching plants from Firestore...");
      const querySnapshot = await getDocs(collection(db, "plants"));

      let allPlants = [];
      querySnapshot.forEach((doc) => {
        console.log("Document found:", doc.id, doc.data());
        allPlants.push({ id: doc.id, ...doc.data() });
      });

      console.log("All plants collected:", allPlants);
      navigation.navigate("Plant List", { plantsData: allPlants });
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };
  
  // function to filter plants by name, type or location
  async function filterPlants() {

        let whereArr = [];

        if (filterName) whereArr.push(where("name", "==", filterName));
        if (filterType) whereArr.push(where("type", "==", filterType));
        if (filterLocation) whereArr.push(where("location", "==", filterLocation));
        
        const q = query(collection(db, "plants"), ...whereArr);
        const querySnapshot = await getDocs(q);
        
        let filteredPlants = [];
        querySnapshot.forEach((doc) => {
            filteredPlants.push({ id: doc.id, ...doc.data() });
        });
        
        navigation.navigate("Plant List", { plantsData: filteredPlants });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>My Plants</Text>

      <TouchableOpacity onPress={insertNewPlant} style={styles.buttons}>
        <Text>Add Plant</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter plant name"
      />

      <TextInput
        style={styles.input}
        onChangeText={setType}
        value={type}
        placeholder="Enter plant type"
      />

      <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
        placeholder="Enter plant location"
      />
      <TextInput
        placeholder="Enter notes (optional)"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        style={styles.input}
        />


      <TouchableOpacity onPress={getPlants} style={styles.buttons}>
        <Text>Show ALL Plants</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={filterPlants} style={styles.buttons}>
        <Text>Filter Plants</Text>
      </TouchableOpacity>

      <View style={styles.filterInputs}>
        <TextInput
          style={styles.input}
          onChangeText={setFilterName}
          value={filterName}
          placeholder="Enter plant name"
        />

        <TextInput
          style={styles.input}
          onChangeText={setFilterType}
          value={filterType}
          placeholder="Enter plant type"
        />

        <TextInput
          style={styles.input}
          onChangeText={setFilterLocation}
          value={filterLocation}
          placeholder="Enter plant location"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titleText: {
    marginTop: 35,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "gray",
    margin: 10,
    marginBotton: 10,
    padding: 10,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5cba7",
    height: 50,
    padding: 5,
    margin: 10,
  },
  filterInputs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  outputText: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  resultsText: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
});
