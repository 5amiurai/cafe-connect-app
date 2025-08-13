import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MENU_ITEMS = [
  { id: '1', name: 'Espresso', price: 3.50, category: 'Coffee' },
  { id: '2', name: 'Cappuccino', price: 4.25, category: 'Coffee' },
  { id: '3', name: 'Latte', price: 4.75, category: 'Coffee' },
  { id: '4', name: 'Americano', price: 3.25, category: 'Coffee' },
  { id: '5', name: 'Croissant', price: 2.50, category: 'Food' },
  { id: '6', name: 'Muffin', price: 3.00, category: 'Food' },
  { id: '7', name: 'Sandwich', price: 6.50, category: 'Food' },
  { id: '8', name: 'Orange Juice', price: 3.75, category: 'Drinks' },
];

const CATEGORIES = ['All', 'Coffee', 'Food', 'Drinks'];

export default function MenuScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [cart, setCart] = useState([]);
  const { tableNumber } = route.params;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCart = async (newCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    
    saveCart(newCart);
    Alert.alert('Added to Cart', `${item.name} added to your order`);
  };

  const getFilteredItems = () => {
    let filtered = MENU_ITEMS;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category && styles.selectedCategoryText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tableText}>Table {tableNumber}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart', { tableNumber })}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search menu items..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.categoriesContainer}>
        {CATEGORIES.map(renderCategory)}
      </View>

      <FlatList
        data={getFilteredItems()}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        style={styles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    position: 'relative',
    padding: 10,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5b6f6',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5b6f6',
  },
  selectedCategory: {
    backgroundColor: '#6d5dfc',
  },
  categoryText: {
    color: '#6d5dfc',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#f3a5d0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

