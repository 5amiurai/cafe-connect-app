import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

const ORDER_STATUSES = [
  { id: 'confirmed', label: 'Order Confirmed', icon: '✅' },
  { id: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { id: 'ready', label: 'Ready for Pickup', icon: '🔔' },
  { id: 'completed', label: 'Completed', icon: '🎉' }
];

export default function OrderStatusScreen({ navigation, route }) {
  const { orderData } = route.params;
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [estimatedTime, setEstimatedTime] = useState(15);

  useEffect(() => {
    simulateOrderProgress();
  }, []);

  const simulateOrderProgress = () => {
    const statusProgression = ['confirmed', 'preparing', 'ready', 'completed'];
    const timings = [0, 5000, 10000, 15000];
    
    statusProgression.forEach((status, index) => {
      setTimeout(() => {
        setCurrentStatus(status);
        setEstimatedTime(Math.max(0, 15 - (index * 5)));
      }, timings[index]);
    });
  };

  const getCurrentStatusIndex = () => {
    return ORDER_STATUSES.findIndex(status => status.id === currentStatus);
  };

  const showRatingDialog = () => {
    Alert.alert(
      'Rate Your Experience',
      'How was your experience with Cafe Connect?',
      [
        { text: '⭐', onPress: () => submitRating(1) },
        { text: '⭐⭐', onPress: () => submitRating(2) },
        { text: '⭐⭐⭐', onPress: () => submitRating(3) },
        { text: '⭐⭐⭐⭐', onPress: () => submitRating(4) },
        { text: '⭐⭐⭐⭐⭐', onPress: () => submitRating(5) },
      ]
    );
  };

  const submitRating = (rating) => {
    Alert.alert(
      'Thank You!',
      `Thank you for rating us ${rating} stars! We appreciate your feedback.`,
      [
        {
          text: 'New Order',
          onPress: () => navigation.navigate('Launch')
        }
      ]
    );
  };

  const renderStatusItem = (status, index) => {
    const isCompleted = index <= getCurrentStatusIndex();
    const isCurrent = index === getCurrentStatusIndex();
    
    return (
      <View key={status.id} style={styles.statusItem}>
        <View style={[
          styles.statusIcon,
          isCompleted && styles.completedStatusIcon,
          isCurrent && styles.currentStatusIcon
        ]}>
          <Text style={[
            styles.statusIconText,
            isCompleted && styles.completedStatusIconText
          ]}>
            {status.icon}
          </Text>
        </View>
        
        <View style={styles.statusContent}>
          <Text style={[
            styles.statusLabel,
            isCompleted && styles.completedStatusLabel,
            isCurrent && styles.currentStatusLabel
          ]}>
            {status.label}
          </Text>
          
          {isCurrent && currentStatus !== 'completed' && (
            <Text style={styles.statusTime}>
              Estimated time: {estimatedTime} minutes
            </Text>
          )}
          
          {isCurrent && currentStatus === 'ready' && (
            <Text style={styles.pickupText}>
              Please come to the counter to collect your order
            </Text>
          )}
        </View>
        
        {index < ORDER_STATUSES.length - 1 && (
          <View style={[
            styles.statusLine,
            isCompleted && styles.completedStatusLine
          ]} />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tableText}>Table {orderData.tableNumber}</Text>
        <Text style={styles.orderText}>Order Status</Text>
        <Text style={styles.orderNumber}>
          Order #{orderData.timestamp.slice(-6)}
        </Text>
      </View>

      <View style={styles.statusContainer}>
        {ORDER_STATUSES.map(renderStatusItem)}
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        {orderData.items.map(item => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={styles.summaryItemText}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.summaryItemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        
        <View style={styles.summaryDivider} />
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>
            ${orderData.subtotal.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax:</Text>
          <Text style={styles.summaryValue}>
            ${orderData.tax.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tip:</Text>
          <Text style={styles.summaryValue}>
            ${orderData.tip.toFixed(2)}
          </Text>
        </View>
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>
            ${orderData.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {currentStatus === 'completed' && (
        <View style={styles.completedSection}>
          <Text style={styles.completedText}>
            🎉 Thank you for choosing Cafe Connect!
          </Text>
          
          <TouchableOpacity
            style={styles.rateButton}
            onPress={showRatingDialog}
          >
            <Text style={styles.rateButtonText}>Rate Your Experience</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.newOrderButton}
            onPress={() => navigation.navigate('Launch')}
          >
            <Text style={styles.newOrderButtonText}>Place New Order</Text>
          </TouchableOpacity>
        </View>
      )}
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
    alignItems: 'center',
    marginBottom: 30,
  },
  tableText: {
    fontSize: 16,
    color: '#666',
  },
  orderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  orderNumber: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statusItem: {
    position: 'relative',
    paddingBottom: 30,
  },
  statusIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  completedStatusIcon: {
    backgroundColor: '#6d5dfc',
  },
  currentStatusIcon: {
    backgroundColor: '#f3a5d0',
  },
  statusIconText: {
    fontSize: 20,
  },
  completedStatusIconText: {
    color: 'white',
  },
  statusContent: {
    marginLeft: 60,
    marginTop: -50,
    paddingTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  completedStatusLabel: {
    color: '#6d5dfc',
    fontWeight: 'bold',
  },
  currentStatusLabel: {
    color: '#333',
    fontWeight: 'bold',
  },
  statusTime: {
    fontSize: 14,
    color: '#f3a5d0',
    fontWeight: '500',
  },
  pickupText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusLine: {
    position: 'absolute',
    left: 24,
    top: 50,
    width: 2,
    height: 30,
    backgroundColor: '#f0f0f0',
  },
  completedStatusLine: {
    backgroundColor: '#6d5dfc',
  },
  orderSummary: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6d5dfc',
  },
  completedSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  completedText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  rateButton: {
    backgroundColor: '#f3a5d0',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newOrderButton: {
    backgroundColor: '#6d5dfc',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

