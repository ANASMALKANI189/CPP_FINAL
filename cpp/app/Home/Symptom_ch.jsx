import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SymptomChecker() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const handleCheckSymptom = async () => {
      if (!text) return;
      setLoading(true);
      setPrediction(null);
  
      try {
          const API_KEY = "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"; // Replace with your OpenAI key
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${API_KEY}`
              },
              body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: [
                      { role: "system", content: "You are a medical assistant providing disease diagnosis based on symptoms." },
                      { role: "user", content: `Based on these symptoms: ${text}, what could be the possible disease? Provide a diagnosis along with precautions and medication recommendations.` }
                  ],
                  temperature: 0.7,
                  max_tokens: 200
              })
          });
  
          const data = await response.json();
          const diagnosis = data?.choices?.[0]?.message?.content || "No reliable prediction found.";
          setPrediction(diagnosis);
      } catch (error) {
          console.error("Error fetching AI prediction:", error);
          setPrediction("Error fetching prediction. Try again later.");
      } finally {
          setLoading(false);
      }
  };
  
  
  
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Home/Homepage')}>
                <FontAwesome name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.header}>AI-Powered Symptom Checker</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your symptoms"
                value={text}
                onChangeText={setText}
            />

            <TouchableOpacity style={styles.checkButton} onPress={handleCheckSymptom}>
                <Text style={styles.checkButtonText}>Check Symptom</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Common Symptoms</Text>
            <View style={styles.buttonContainer}>
                {['itching', 'skin rash', 'headache', 'nausea', 'fatigue', 'restlessness'].map((symptom) => (
                    <TouchableOpacity key={symptom} style={styles.symptomButton} onPress={() => handlePress(symptom)}>
                        <Text style={styles.buttonText}>{symptom}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading && <ActivityIndicator size="large" color="#4285F4" style={{ marginTop: 20 }} />}

            {prediction && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>AI Prediction:</Text>
                    <Text style={styles.resultText}>{prediction}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    backButton: { marginTop: 30, marginBottom: 40 },
    header: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
    input: { height: 50, borderRadius: 10, backgroundColor: '#F5F5F5', paddingHorizontal: 15, marginBottom: 15 },
    checkButton: {
        width: '100%', height: 50, borderRadius: 10, backgroundColor: '#4285F4',
        justifyContent: 'center', alignItems: 'center', marginTop: 10
    },
    checkButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    label: { marginTop: 20, fontWeight: 'bold', fontSize: 20 },
    buttonContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    symptomButton: { backgroundColor: '#e0e0e0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, margin: 5 },
    buttonText: { fontSize: 16, textAlign: 'center' },
    resultContainer: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 10, marginTop: 20 },
    resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1' },
    resultText: { fontSize: 16, color: '#333', marginTop: 5 },
});
 