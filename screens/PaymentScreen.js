import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIP_OPTIONS = [
  { label: '10%', value: 0.10 },
  { label: '15%', value: 0.15 },
  { label: '20%', value: 0.20 },
  { label: 'Custom', value: 'custom' }
];

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'apple', name: 'Apple Pay', icon: '📱' },
  { id: 'google', name: 'Google Pay', icon: '📱' },
  { id: 'cash', name: 'Pay at Counter', icon: '💵' }
];

export default function PaymentScreen({ navigation, route }) {
  const { tableNumber, cart, subtotal, tax, total } = route.params;
  const [selectedTip, setSelectedTip] = useState(0.15);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const getTipAmount = () => {
    return subtotal * selectedTip;
  };

  const getFinalTotal = () => {
    return total + getTipAmount();
  };

  const processPayment = async () => {
    try {
      Alert.alert(
        'Confirm Payment',
        `Total: $${getFinalTotal().toFixed(2)}\nPayment Method: ${PAYMENT_METHODS.find(p => p.id === selectedPayment)?.name}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: async () => {
              await AsyncStorage.removeItem('cart');
              
              const orderData = {
                tableNumber,
                items: cart,
                subtotal,
                tax,
                tip: getTipAmount(),
                total: getFinalTotal(),
                paymentMethod: selectedPayment,
                timestamp: new Date().toISOString(),
                status: 'confirmed'
              };
              
              navigation.navigate('OrderStatus', { orderData });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    }
  };

  const renderTipOption = (option) => (
    <TouchableOpacity
      key={option.label}
      style={[
        styles.tipOption,
        selectedTip === option.value && styles.selectedTipOption
      ]}
      onPress={() => setSelectedTip(option.value)}
    >
      <Text style={[
        styles.tipOptionText,
        selectedTip === option.value && styles.selectedTipOptionText
      ]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedPayment === method.id && styles.selectedPaymentMethod
      ]}
      onPress={() => setSelectedPayment(method.id)}
    >
      <Text style={styles.paymentIcon}>{method.icon}</Text>
      <Text style={[
        styles.paymentMethodText,
        selectedPayment === method.id && styles.selectedPaymentMethodText
      ]}>
        {method.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tableText}>Table {tableNumber}</Text>
        <Text style={styles.paymentText}>Payment</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          {cart.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.orderItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Tip</Text>
        <View style={styles.tipContainer}>
          {TIP_OPTIONS.map(renderTipOption)}
        </View>
        <Text style={styles.tipAmount}>
          Tip Amount: ${getTipAmount().toFixed(2)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          {PAYMENT_METHODS.map(renderPaymentMethod)}
        </View>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.finalTotalRow}>
          <Text style={styles.finalTotalLabel}>Final Total:</Text>
          <Text style={styles.finalTotalValue}>
            ${getFinalTotal().toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={processPayment}
      >
        <Text style={styles.payButtonText}>
          Complete Payment - ${getFinalTotal().toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  tableText: {
    fontSize: 16,
    color: '#666',
  },
  paymentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  tipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tipOption: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5b6f6',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTipOption: {
    backgroundColor: '#6d5dfc',
    borderColor: '#6d5dfc',
  },
  tipOptionText: {
    color: '#6d5dfc',
    fontWeight: 'bold',
  },
  selectedTipOptionText: {
    color: 'white',
  },
  tipAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6d5dfc',
    textAlign: 'center',
  },
  paymentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedPaymentMethod: {
    backgroundColor: '#f0f8ff',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedPaymentMethodText: {
    color: '#6d5dfc',
    fontWeight: 'bold',
  },
  totalSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalTotalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  finalTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6d5dfc',
  },
  payButton: {
    backgroundColor: '#6d5dfc',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

