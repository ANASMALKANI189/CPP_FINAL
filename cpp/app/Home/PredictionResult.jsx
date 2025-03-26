import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PredictionResult() {
  const { disease, description, precautions, medication } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prediction Result</Text>
      <Text style={styles.title}>Disease: {disease}</Text>
      <Text>Description: {description}</Text>
      <Text>Precautions: {JSON.parse(precautions).join(', ')}</Text>
      <Text>Medication: {JSON.parse(medication).join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});
