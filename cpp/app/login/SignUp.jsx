import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import 'expo-dev-client';


export default function SignUp() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required.');
      return;
    } else if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return;
    } else if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required.');
      return;
    } else if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name is required.');
      return;
    }

    try {
    console.log('Attempting to create user...');
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    console.log('User created:', user.uid);

    console.log('Showing success alert');
    Alert.alert('Success', 'Account created successfully!', [
      { 
        text: 'OK', 
        onPress: () => {
          console.log('Navigating to SignIn');
          router.push('/login/SignIn');
        }
      }
    ]);

    console.log('Setting Firestore document...');
    await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
      fullName,
      email,
      mobile,
      dateOfBirth: date ? date.toISOString() : null,
    });

   
  } catch (error) {
    console.error('Sign Up Error:', error);
    Alert.alert('Sign Up Failed');
  }
};

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/login/SignIn')}>
        <FontAwesome name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.header}>New Account</Text>
      <Text style={styles.label1}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <Text style={styles.label1}>Email</Text>
 
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Text style={styles.label1}>Mobile Number</Text>
 
      <TextInput style={styles.input} placeholder="Mobile Number (Optional)" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
      <Text style={styles.label1}>Password</Text>
 
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#A0A3BD" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label1}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={{ color: date ? '#000' : '#A0A3BD', marginTop: 15 }}>{date ? date.toLocaleDateString('en-US') : 'Select Date of Birth'}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={date || new Date()} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleDateChange} />
      )}
      
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or sign up with</Text>
      <View style={styles.socialContainer}>
        <FontAwesome name="google" size={24} color="#4285F4" style={styles.icon} />
        <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.icon} />
      </View>
      
      <TouchableOpacity onPress={() => router.push('/login/SignIn')}>
        <Text style={styles.signupText}>Already have an account? <Text style={styles.signupLink}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 50, borderRadius: 10, backgroundColor: '#F5F5F5', paddingHorizontal: 15, marginBottom: 15, marginTop: 5 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10, backgroundColor: '#F5F5F5', paddingHorizontal: 15, marginBottom: 15 },
  passwordInput: { flex: 1 },
  loginButton: { alignSelf: 'center', width: 240, height: 50, borderRadius: 10, backgroundColor: '#4285F4', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { marginBottom: 20 },
  orText: { textAlign: 'center', color: '#A0A3BD', marginBottom: 10 },
  signupText: { textAlign: 'center', color: '#A0A3BD' },
  signupLink: { color: '#4285F4', fontWeight: 'bold' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  icon: { marginHorizontal: 10 },  
  label1: { 
    marginTop: 10, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});