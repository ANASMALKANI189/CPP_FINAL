import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 200;
const NEWS_API_KEY = "e475def6fd4a4f0bbaa5ceaab8a4a184";
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${NEWS_API_KEY}`;

const NewsCard = ({ item }) => {
    if (!item || !item.urlToImage || !item.title) return null; // Prevent crashes
  
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>
            {item.description ? item.description : "No description available"}
          </Text>
        </View>
      </View>
    );
  };
  

const NewsCarousel = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(NEWS_API_URL);
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />;
  }

  return (
    <Carousel
      data={news}
      renderItem={({ item }) => <NewsCard item={item} />}
      sliderWidth={width}
      itemWidth={CARD_WIDTH}
      loop={true}
      autoplay={true}
      autoplayInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
  },
});

export default NewsCarousel;
