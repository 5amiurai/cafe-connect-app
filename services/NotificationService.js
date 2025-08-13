import { Alert, Vibration } from 'react-native';

class NotificationService {
  static showOrderUpdate(status, message) {
    Vibration.vibrate(200);
    
    Alert.alert(
      'Order Update',
      message,
      [{ text: 'OK', style: 'default' }],
      { cancelable: true }
    );
  }

  static showOrderConfirmation(orderNumber) {
    Vibration.vibrate([100, 200, 100]);
    
    Alert.alert(
      'Order Confirmed! 🎉',
      `Your order #${orderNumber} has been confirmed and sent to the kitchen.`,
      [{ text: 'Great!', style: 'default' }]
    );
  }

  static showOrderReady(orderNumber) {
    Vibration.vibrate([200, 100, 200, 100, 200]);
    
    Alert.alert(
      'Order Ready! 🔔',
      `Your order #${orderNumber} is ready for pickup at the counter.`,
      [{ text: 'On my way!', style: 'default' }]
    );
  }

  static showPaymentSuccess(amount) {
    Vibration.vibrate(300);
    
    Alert.alert(
      'Payment Successful! ✅',
      `Payment of $${amount.toFixed(2)} has been processed successfully.`,
      [{ text: 'Thank you!', style: 'default' }]
    );
  }

  static showError(title, message) {
    Vibration.vibrate([100, 100, 100]);
    
    Alert.alert(
      title,
      message,
      [{ text: 'OK', style: 'default' }]
    );
  }

  static vibrateFeedback() {
    Vibration.vibrate(50);
  }

  static vibrateSuccess() {
    Vibration.vibrate([100, 50, 100]);
  }

  static vibrateError() {
    Vibration.vibrate([200, 100, 200, 100, 200]);
  }
}

export default NotificationService;

