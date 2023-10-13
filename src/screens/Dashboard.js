import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback, ScrollView, BackHandler } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Dashboard({ navigation }) {
  const [scaleValue] = useState(new Animated.Value(1));
  const [isEditing, setIsEditing] = useState(false);

  const handlePlusButtonPress = () => {
    setIsEditing(!isEditing);
  };

  const toggleProfileIcon = () => {
    navigation.navigate('ProfileIcon');
  };

  const toggleCartIcon = () => {
    navigation.navigate('CartIcon');
  };

  const handlePress = (menu) => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      if (menu === 'McDonalds') {
        navigation.navigate(menu + 'Menu');
      } else if (menu === 'Subway') {
        navigation.navigate(menu);
      } else if (menu === 'KFC') {
        navigation.navigate(menu);
      }
    });
  };

  const cartItems = [];

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Background>
        <Logo />
        <View style={styles.headerContainer}>
          <Header style={styles.welcomeText}>Welcome to APPLEGO Express</Header>
        </View>

        <TouchableOpacity style={styles.profileButton} onPress={toggleProfileIcon}>
          <View style={styles.iconCircle}>
            <Icon name="user" size={30} color="#FFF" />
          </View>
        </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => handlePress('McDonalds')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>McDonald's</Text>
              <Text style={styles.salesQuote}>
                "I'm lovin' it!" - McDonald's
              </Text>
              
              <Text style={styles.additionalInfo}>
                Serving Happiness Since 1955
              </Text>
              <Text style={styles.additionalInfo}>
                Find us at 1234 Fast Food Lane
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#C70039" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress('Subway')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>Subway</Text>
              <Text style={styles.salesQuote}>
                "Eat Fresh!" - Subway
              </Text>
              <Text style={styles.additionalInfo}>
                Fresh Subs and Sandwiches
              </Text>
              <Text style={styles.additionalInfo}>
                Visit us at 8765 Sub Avenue
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#C70039" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress('KFC')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>KFC</Text>
              <Text style={styles.salesQuote}>
                "Finger Lickin' Good!" - KFC
              </Text>
              <Text style={styles.additionalInfo}>
                Original Recipe Chicken since 1939
              </Text>
              <Text style={styles.additionalInfo}>
                Visit us at 4321 Fried Chicken Street
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#C70039" />
          </Animated.View>
          </TouchableWithoutFeedback>
  
          <TouchableOpacity style={styles.cartButton} onPress={toggleCartIcon}>
            <View style={styles.iconCircle}>
              <Text style={styles.cartIcon}>🛒</Text>
              {cartItems.length > 0 && (
                <Text style={styles.cartItemCount}>{cartItems.length}</Text>
              )}
            </View>
          </TouchableOpacity>
        </Background>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 27,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    
    brandButton: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: 1,
      marginBottom: 20,
      height: 180,
      width: 300,
      borderWidth: 0.1,
      shadowOffset: { width: 4, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
    },
    brandButtonText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#C70039',
    },
    salesQuote: {
      fontSize: 18,
      fontStyle: 'italic',
      textAlign: 'center',
    },
    additionalInfo: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
      color: '#333',
    },
    cartButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      backgroundColor: 'transparent',
    },
    cartIcon: {
      fontSize: 24,
    },
    cartItemCount: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'red',
      color: 'white',
      borderRadius: 10,
      paddingHorizontal: 4,
      paddingVertical: 2,
      fontSize: 10,
    },
    profileButton: {
      position: 'absolute',
      top: 50,
      left: 20,
    },
    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#C70039',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  