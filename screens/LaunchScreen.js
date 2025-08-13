import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal
} from 'react-native';
import QRScanner from '../components/QRScanner';

export default function LaunchScreen({ navigation }) {
  const [tableNumber, setTableNumber] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleStartOrdering = () => {
    if (!tableNumber.trim()) {
      Alert.alert('Error', 'Please enter a table number');
      return;
    }
    
    navigation.navigate('Menu', { tableNumber: tableNumber.trim() });
  };

  const handleQRScan = () => {
    setShowScanner(true);
  };

  const handleScanResult = (scannedTableNumber) => {
    setTableNumber(scannedTableNumber);
    setShowScanner(false);
    navigation.navigate('Menu', { tableNumber: scannedTableNumber });
  };

  const handleScanClose = () => {
    setShowScanner(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>Cafe Connect</Text>
        <Text style={styles.subtitle}>Scan QR code or enter table number</Text>
      </View>

      <View style={styles.qrSection}>
        <TouchableOpacity style={styles.qrButton} onPress={handleQRScan}>
          <Text style={styles.qrIcon}>📱</Text>
          <Text style={styles.qrText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Enter Table Number</Text>
        <TextInput
          style={styles.input}
          value={tableNumber}
          onChangeText={setTableNumber}
          placeholder="e.g., 5"
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={handleStartOrdering}
      >
        <Text style={styles.startButtonText}>Start Ordering</Text>
      </TouchableOpacity>

      <Modal
        visible={showScanner}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <QRScanner
          onScan={handleScanResult}
          onClose={handleScanClose}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#666',
    marginBottom: 5,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6d5dfc',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrButton: {
    backgroundColor: '#6d5dfc',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  qrIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  qrText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 16,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5b6f6',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#f3a5d0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

