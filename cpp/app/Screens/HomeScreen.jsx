import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
  
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from '../../assets/images/logo.png';
import Icon from 'react-native-ico-material-design';
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome5,FontAwesome ,Ionicons} from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../login/FirebaseConfig"; 
import DropDownPicker from "react-native-dropdown-picker";
import NewsCarousel from "../Home/NewsCard";

const Tab = createBottomTabNavigator();

const auth = getAuth(FIREBASE_APP);
const db = getFirestore(FIREBASE_APP);

const HomeScreen = () => {
    const router = useRouter();
    
    const handlehospital = () => {
      router.push('/Home/hospital');
    }
    const handleStore = () => {
      router.push('/Home/Store');
    }
  
    const medicine = () => {
      router.push('/Home/Medicine');
    };
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          fetchUserProfile(currentUser.uid);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const fetchUserProfile = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setProfilePic(userDoc.data().profilePic || null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    
 
    return (
      <ScrollView style={styles.container3}>
        {/* Header Section */}
        
        <View style={styles.header3}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: profilePic || "https://via.placeholder.com/50" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
            <Text style={styles.userName}>{user ? user.displayName || "User" : "Guest"}</Text>
          </View>
        </View>
        
        <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.headerIcons}>
        {/* Globe Icon for Language Selection */}
        <TouchableOpacity >
          <FontAwesome name="globe" size={24} color="#4A90E2" style={styles.icon} />
        </TouchableOpacity>

       

        {/* Other Icons */}
        <FontAwesome name="bell" size={24} color="#4A90E2" style={styles.icon} />
        <FontAwesome name="cog" size={24} color="#4A90E2" style={styles.icon} />
      </View>

      {/* MAIN CONTENT */}
    
    </View>
  
        </View>
  
        {/* Search and Actions */}
        <View style={styles.searchActions}>
         
            <TouchableOpacity onPress={medicine}>
            <View style={styles.actionButton}>
              <MaterialIcons name="local-pharmacy" size={40} color="#4A90E2" />
            <Text style={styles.actionText}>Medicine</Text>
            </View>
            </TouchableOpacity>
            
          <TouchableOpacity onPress={()=>{
            router.push('/Home/Scanner');
          }}>
            <View style={styles.actionButton}>
            <MaterialIcons name="qr-code-scanner" size={40} color="#4A90E2" />
            <Text style={styles.actionText}>Scan</Text>
          </View>
          </TouchableOpacity>
          
          
          {/* <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#999"
          /> */}
        
        </View>
  
        {/* Banner Section */}
        <TouchableOpacity onPress={() => router.push('/Home/Medical_hist')}>
        <View style={styles.banner} >
        <View style={styles.bannerContent}>
            
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerText1}> Check your Medical  History </Text>
        
             
        
      </View>
      
      <Image
        source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/medical-report-and-medicine-5378095-4494351.png?f=webp" }} // Replace with banner image
        style={styles.bannerImage}
      />
      
    </View>
    
    
    
          <Text style={styles.knowNowText}>Know now ➔</Text>
        
  </View>
  </TouchableOpacity>
  
         {/* Options */}
         <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={handleStore}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/000/153/588/original/vector-roadmap-location-map.jpg", // Replace with nearby medical store graphic
              }}
              style={styles.optionImage}
            />
           
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={handlehospital}>
            <Image
              source={{
                uri: "https://thumbs.dreamstime.com/b/isometric-hospital-location-isometric-hospital-location-marker-map-233012793.jpg", // Replace with nearby hospital graphic
              }}
              style={styles.optionImage}
            />
            
          </TouchableOpacity>
        </View>
        <View style={styles.optionText}>
        <Text onPress={handleStore} >Nearby Medical Store</Text>
        <Text onPress={handlehospital}>Nearby Hospital</Text>
        </View>
  
        {/* Symptoms Checker */}
        <TouchableOpacity style={styles.symptomsCard}>
          <Text style={styles.symptomsHeader}>Symptoms Checker</Text>
          <Text style={styles.symptomsSubText}>
            Enter Your Symptoms To Get Personalized Recommendations.
          </Text>
          <TouchableOpacity style={styles.checkButton}  onPress={() => router.push('/Home/Symptom_ch')}>
            <Text style={styles.checkButtonText}>Check Symptoms</Text>
          </TouchableOpacity>
          <Text style={styles.timeText}>Takes 2-3 minutes</Text>
        </TouchableOpacity>
  
        {/* Recent Checks */}
        <View style={styles.recentChecksCard}>
          <Text style={styles.cardTitle}>Recent Checks</Text>
          <View style={styles.checkItem}>
            <MaterialIcons name="healing" size={24} color="#4A90E2" />
            <View style={styles.checkDetails}>
              <Text style={styles.checkTitle}>Headache & Cough</Text>
              <Text style={styles.checkTime}>Today, 10:30 AM</Text>
            </View>
          </View>
          <View style={styles.checkItem}>
            <FontAwesome5 name="tooth" size={24} color="#4A90E2" />
            <View style={styles.checkDetails}>
              <Text style={styles.checkTitle}>Tooth Decay</Text>
              <Text style={styles.checkTime}>Today, 2:00 PM</Text>
            </View>
          </View>
        </View>
  
        {/* Know Your Cure */}
        <TouchableOpacity onPress={medicine}>
        <View style={styles.knowYourCureCard} >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} >Know Your Cure</Text >
            <TouchableOpacity>
              <MaterialIcons name="search" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cureScroll} >
            <TouchableOpacity style={styles.cureItem}>
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEbTQpFifrW_qPXNuNhwygIL7UbMrr9t1aA&s" }}
                style={styles.cureImage}
              />
              <Text style={styles.cureText}>Fever</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cureItem}>
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdmf0ugfQ6BJ-tfno95jbY2RVdRepB_nUxQw&s" }}
                style={styles.cureImage}
              />
              <Text style={styles.cureText}>Cold</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cureItem}>
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVnbZ4HZ0650lMtCgdmp1KB19LwM6fh82b64l8aKs119QbpgkaG2ogKtYevePQAixgIo&usqp=CAU" }}
                style={styles.cureImage}
              />
              <Text style={styles.cureText}>Stomach Ache</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cureItem}>
              <Image
                source={{ uri: "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--41f28e9f-8a8f-47b9-b278-68a59c8f8e2a/107182c8-en.jpg?preferwebp=true&quality=80" }}
                style={styles.cureImage}
              />
              <Text style={styles.cureText}>Other</Text>
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.learnMore}>Learn more ➔</Text>
        </View>
        </TouchableOpacity>
  
        {/* News & Updates */}
        <View style={styles.newsCard}>
          <NewsCarousel/>
        </View>        
        </ScrollView>
    );
  
  }
  const styles = StyleSheet.create({
    container3: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    header3: {
      flexDirection: "row", // Ensures the elements are placed side by side
      alignItems: "center",  // Vertically align elements in the center
      marginBottom: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    welcomeText: {
      marginLeft: 10,  // Reduced the margin to position the text closer to the profile
      fontSize: 16,
      color: "#888",
    },
    userName: {
      marginLeft: 10,  // Reduced the margin to position the username closer to the profile
      fontSize: 20,
      fontWeight: "bold",
    },
    
    headerIcons: {
      flexDirection: "row",
      marginLeft:70,
    },
    icon: {
      marginHorizontal: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
    },
    actionText: {
      fontSize:20,
      marginLeft: 15,
      color: "#4A90E2",
    },
    searchActions: {
      flexDirection: "row",
      marginLeft:20,
      // justifyContent: "space-between",

      marginBottom: 20,
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 20,
      padding: 10,
      marginLeft: 10,
      backgroundColor: "#CAD6FF",
    },
    banner: {
      backgroundColor: "#EAF3FF",
      padding: 20,
      borderRadius: 30,
      marginBottom: 20,
      elevation: 5, // Android
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
    },
    banner: {
      backgroundColor: "#EAF3FF",
      borderRadius: 30,
      padding: 10,
      marginBottom: 20,
      height:215,
    },
    bannerContent: {
      flexDirection: "row", // Align content horizontally
      //alignItems: "center", // Center align items vertically
      //justifyContent: "space-between", // Add space between text and image
    },
    bannerTextContainer: {
      flex: 1, // Make text container take up available space
      marginRight: 10, // Add spacing between text and image
    },
    // bannerText: {
    //   marginTop:20,
    //   fontSize: 30,
    //   fontWeight: "bold",
      
    // },
    bannerText1: {
      fontSize: 25,
      fontWeight: "bold",
      marginTop:45,
      textAlign:'center'
    },
    bannerText2: {
      fontSize: 33,
      fontWeight: "bold",
     
    },
    bannerImage: {
      width: 140,
      height: 180,
     // resizeMode: "contain",
    },
    knowNowText: {
      marginLeft:200,
      color: "#4A90E2",
    },
    Text1:{
  fontWeight:'semibold',
    },
    
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    optionCard: {
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      //alignItems: "center",
     // padding: 10,
      width: "48%",
      height: 100,
    },
    optionImage: {
      width: "100%",
      height: 110,
      marginBottom: 10,
      borderRadius: 10,
    },
    optionText: {
      //alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      paddingHorizontal: 38,
    },
    optionText1: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    symptomsCard: {
      backgroundColor: "#EAF3FF",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    symptomsHeader: {
      fontSize: 20,
      fontWeight: "bold",
    },
    symptomsSubText: {
      marginVertical: 10,
      color: "#666",
    },
    checkButton: {
      backgroundColor: "#4A90E2",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
    },
    checkButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    timeText: {
      marginTop: 10,
      color: "#888",
      
    },
   
    recentChecksCard: {
      backgroundColor: "#EAF3FF",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    checkItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    checkDetails: {
      marginLeft: 10,
    },
    checkTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    checkTime: {
      fontSize: 14,
      color: "#666",
    },
    knowYourCureCard: {
      backgroundColor: "#EAF3FF",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cureScroll: {
      marginVertical: 10,
    },
    cureItem: {
      alignItems: "center",
      marginRight: 20,
    },
    cureImage: {
      width: 90,
      height: 90,
      borderRadius: 20,
    },
    cureText: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: "bold",
    },
    learnMore: {
      color: "#4A90E2",
      textAlign: "right",
    },
    newsCard: {
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      padding: 20,
      marginBottom: 90,
    },
    newsImage: {
      width: "100%",
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    newsText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
    },
    footer: {
      width:"100%",
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 95,
      padding:20,
     
    },
    footerText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 5,
    },
    footerIcons: {
      flexDirection: "row",
      marginVertical: 10,
    },
    footerIcon: {
      fontSize: 14,
      color: "#4A90E2",
      marginHorizontal: 5,
    },
    footerLinks: {
      flexDirection: "row",
      marginTop: 10,
    },
    footerLink: {
      fontSize: 14,
      color: "#4A90E2",
      marginHorizontal: 10,
    },
    dropdownContainer: {
      position: "absolute",
      top: 30,
      left: -10,
      width: 180,
      zIndex: 1000,
    },
    dropdown: {
      backgroundColor: "#fff",
    },
    
  });

  export default HomeScreen;