import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// Profile Screen
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to change your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Profile Header */}
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileContainer}>
        <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/logo.png')} style={styles.profileImage} />
        <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
          <FontAwesome5 name="pen" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>John Doe</Text>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ProfileDetails")}>
        <FontAwesome5 name="user" size={20} color="#4A90E2" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PrivacyPolicy")}>
        <FontAwesome5 name="lock" size={20} color="#4A90E2" />
        <Text style={styles.menuText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
        <FontAwesome5 name="cogs" size={20} color="#4A90E2" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Help")}>
        <FontAwesome5 name="question-circle" size={20} color="#4A90E2" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => alert("Logging Out...")}>
        <FontAwesome5 name="sign-out-alt" size={20} color="#4A90E2" />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Placeholder Screens
const ProfileDetailsScreen = () => <View style={styles.screen}><Text>Profile Details</Text></View>;
const PrivacyPolicyScreen = () => <View style={styles.screen}><Text>Privacy Policy</Text></View>;
const SettingsScreen = () => <View style={styles.screen}><Text>Settings</Text></View>;
const HelpScreen = () => <View style={styles.screen}><Text>Help</Text></View>;

// Navigation Stack
const Stack = createStackNavigator();

const Profile = () => {
  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingTop: 50 },
  backButton: { position: "absolute", left: 20, top: 50 },
  title: { fontSize: 22, fontWeight: "bold", color: "#007AFF", marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  profileContainer: { alignItems: "center", position: "relative", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: { position: "absolute", bottom: 5, right: 5, backgroundColor: "#007AFF", borderRadius: 15, padding: 5 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "90%",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: { marginLeft: 15, fontSize: 16, fontWeight: "500" },
  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
});

export default Profile;