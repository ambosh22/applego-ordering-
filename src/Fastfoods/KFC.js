import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext'; 


import origImage from '../assets/orig.png';
import tenderImage from '../assets/tender.png';
import zigImage from '../assets/zig.png';
import kfcmashImage from '../assets/kfcmash.png';

export default function KFC() {
  const navigation = useNavigation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const menuItems = [
    { name: 'Original Recipe', price: '$8.99', image: origImage },
    { name: 'Chicken Tenders', price: '$7.49', image: tenderImage },
    { name: 'Zinger Burger', price: '$6.99', image: zigImage },
    { name: 'Mashed Potatoes', price: '$2.99', image: kfcmashImage },
  ];
  const [pressedMenuItem, setPressedMenuItem] = useState(null);

  const toggleCartIcon = () => {
    navigation.navigate('CartIcon');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton} onPress={toggleCartIcon}>
        <Text style={styles.cartIcon}>
          🛒
          {cartItems.length > 0 && (
            <Text style={styles.cartItemCount}>{cartItems.length}</Text>
          )}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>McDonalds Menu</Text>
      <ScrollView style={styles.foodItemsContainer}>
        {menuItems.map((item, itemIndex) => (
          <TouchableHighlight
            key={itemIndex}
            style={[
              styles.foodItem,
              { backgroundColor: pressedMenuItem === item.name ? '#FFD700' : '#fff' },
            ]}
            underlayColor="#FFD700"
            onPress={() => {
              navigation.navigate('FoodItemDetails', { item });
            }}
            onShowUnderlay={() => setPressedMenuItem(item.name)}
            onHideUnderlay={() => setPressedMenuItem(null)}
          >
            <>
              <Image source={item.image} style={styles.foodItemImage} />
              <Text style={styles.foodItemName}>{item.name}</Text>
              <Text style={styles.foodItemPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 19,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  foodItemsContainer: {
    flex: 1,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  foodItemName: {
    fontSize: 20,
    width:104,

  },
  foodItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 4, 
    paddingVertical: 2,
    fontSize: 10,
  },
  cartIcon: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'transparent',
    fontSize: 24,
    marginTop: 10,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    top: 5,
    backgroundColor: 'transparent',
  },
  foodItemImage: {
    width: 80,
    height: 80,
  },
  addToCartButton: {
    backgroundColor: '#007AFF', 
    padding: 3, 
    borderRadius: 5, 
    marginTop: 5, 
  },
});
