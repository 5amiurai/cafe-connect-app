import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  static async saveCart(cart) {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  }

  static async getCart() {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  static async clearCart() {
    try {
      await AsyncStorage.removeItem('cart');
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  static async saveOrder(orderData) {
    try {
      const orders = await this.getOrders();
      orders.push(orderData);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));
      return true;
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  }

  static async getOrders() {
    try {
      const orders = await AsyncStorage.getItem('orders');
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  }

  static async saveUserPreferences(preferences) {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return false;
    }
  }

  static async getUserPreferences() {
    try {
      const preferences = await AsyncStorage.getItem('userPreferences');
      return preferences ? JSON.parse(preferences) : {
        notifications: true,
        vibration: true,
        defaultTip: 0.15
      };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {
        notifications: true,
        vibration: true,
        defaultTip: 0.15
      };
    }
  }

  static async clearAllData() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }
}

export default StorageService;

