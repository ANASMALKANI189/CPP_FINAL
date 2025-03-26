import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, FlatList } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// import  from "../Home/Homepage.jsx"


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MedReminderApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [frequency, setFrequency] = useState("Once Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const scheduleNotification = async (name, date) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `Time to take your medicine: ${name}`, // Fixed template literal
        sound: true,
      },
      trigger: { seconds: Math.max(0, (date - new Date()) / 1000) }, // Ensure non-negative trigger time
    });
  };
  

  // const handleclick=()=>{
  //   router.push('/Screens/RemainderScreen')
  // }

  const handleAddReminder = () => {
    if (!medicineName) return;

    const newReminder = {
      id: Date.now().toString(),
      name: medicineName,
      frequency: frequency,
      startDate: startDate.toLocaleString(),
      endDate: endDate.toLocaleDateString(),
    };
    setReminders([...reminders, newReminder]);

    scheduleNotification(medicineName, startDate);

    setMedicineName("");
    setFrequency("Once Daily");
    setStartDate(new Date());
    setEndDate(new Date());
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}> 
  <FontAwesome name="arrow-left" size={24} color="#000" />
</TouchableOpacity>
      <Text style={styles.header}>Med Reminder</Text>

      {/* Show Reminder List */}
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>
            {item.name} - {item.startDate} {item.endDate ? `to ${item.endDate}` : ""}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No reminders yet.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/Screens/RemainderScreen')}> 
  <FontAwesome name="arrow-left" size={24} color="#000" />
</TouchableOpacity>
          
            <Text style={styles.modalTitle}>Add New Reminder</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Medicine Name"
              value={medicineName}
              onChangeText={setMedicineName}
            />

            <Text style={styles.label}>Frequency</Text>
            {['Once Daily', 'Every 8 Hours', 'Custom'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.radioButton, frequency === option && styles.radioButtonSelected]}
                onPress={() => setFrequency(option)}
              >
                <Text style={[styles.radioButtonText, frequency === option && styles.radioButtonTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>Start Date/Time</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setStartDatePickerVisible(true)}>
              <Text>{startDate.toLocaleString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              onConfirm={(date) => {
                setStartDate(date);
                setStartDatePickerVisible(false);
              }}
              onCancel={() => setStartDatePickerVisible(false)}
            />

            <Text style={styles.label}>End Date (Optional)</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setEndDatePickerVisible(true)}>
              <Text>{endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setEndDate(date);
                setEndDatePickerVisible(false);
              }}
              onCancel={() => setEndDatePickerVisible(false)}
            />

            <TouchableOpacity style={styles.addReminderButton} onPress={handleAddReminder}>
              <Text style={styles.addReminderButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
         
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  addButton: { position: "absolute", bottom: 70, right: 20, backgroundColor: "#007AFF", padding: 15, borderRadius: 50 },
  addButtonText: { fontSize: 24, color: "#FFFFFF", textAlign: "center" },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, margin: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  radioButton: { padding: 10, borderRadius: 5, borderWidth: 1, borderColor: "#007AFF", marginBottom: 5 },
  radioButtonSelected: { backgroundColor: "#007AFF" },
  radioButtonText: { textAlign: "center", color: "#007AFF" },
  radioButtonTextSelected: { color: "#FFFFFF" },
  dateInput: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  addReminderButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  addReminderButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  reminderItem: { backgroundColor: "#e3f2fd", padding: 10, marginVertical: 5, borderRadius: 5 },
  reminderText: { fontSize: 16 },
  emptyText: { textAlign: "center", color: "gray", marginTop: 20 },
  exit:{marginLeft:300,fontSize:20,fontWeight:'bold'}
});

export default MedReminderApp;
