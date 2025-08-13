# Cafe Connect - React Native App

A QR code-based restaurant ordering system built with React Native and Expo.

## Features

- QR Code scanning for table identification
- Menu browsing with search and categories
- Shopping cart with quantity management
- Payment processing with tipping options
- Real-time order status tracking
- Native device integration (camera, vibration, notifications)

## Prerequisites

Before running this app, make sure you have:

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn** package manager
3. **Android Studio** (for Android development)
4. **Expo CLI** (installed globally)

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd CafeConnectNative
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### Web Version (for testing)
```bash
npx expo start --web
```

### Android Development
```bash
npx expo start
```
Then press 'a' to open in Android emulator or scan QR code with Expo Go app.

### iOS Development (requires macOS)
```bash
npx expo start
```
Then press 'i' to open in iOS simulator or scan QR code with Camera app.

## Android Studio Setup

### 1. Install Android Studio
- Download from: https://developer.android.com/studio
- Install with default settings
- Make sure Android SDK is installed

### 2. Set up Android Emulator
1. Open Android Studio
2. Go to Tools > AVD Manager
3. Create Virtual Device
4. Choose a device (e.g., Pixel 4)
5. Download and select a system image (API 30 or higher)
6. Finish setup and start emulator

### 3. Configure Environment Variables
Add to your system PATH:
- `ANDROID_HOME` = path to Android SDK
- Add `platform-tools` to PATH

### 4. Build for Android
```bash
npx expo run:android
```

## Project Structure

```
CafeConnectNative/
├── App.js                 # Main app component with navigation
├── screens/               # Screen components
│   ├── LaunchScreen.js    # QR scanner and table input
│   ├── MenuScreen.js      # Menu browsing and ordering
│   ├── CartScreen.js      # Shopping cart management
│   ├── PaymentScreen.js   # Payment processing
│   └── OrderStatusScreen.js # Order tracking
├── components/            # Reusable components
│   └── QRScanner.js       # QR code scanner component
├── services/              # Business logic services
│   ├── NotificationService.js # Push notifications
│   └── StorageService.js  # Local data storage
└── utils/                 # Utility functions
```

## Key Dependencies

- **@react-navigation/native** - Navigation between screens
- **expo-camera** - Camera access for QR scanning
- **expo-barcode-scanner** - QR code detection
- **@react-native-async-storage/async-storage** - Local data storage
- **react-native-screens** - Native screen management

## Development Workflow

1. **Start development server:**
   ```bash
   npx expo start
   ```

2. **Test on device:**
   - Install Expo Go app on your phone
   - Scan QR code from terminal
   - App will load on your device

3. **Test on emulator:**
   - Start Android emulator in Android Studio
   - Press 'a' in Expo CLI to open on emulator

4. **Build for production:**
   ```bash
   npx expo build:android
   ```

## Troubleshooting

### Common Issues:

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **Android emulator not detected:**
   - Make sure emulator is running
   - Check ANDROID_HOME environment variable

3. **Camera permissions:**
   - App will request camera permission automatically
   - Grant permission for QR scanning to work

4. **Package version conflicts:**
   ```bash
   npx expo install --fix
   ```

## Testing the App

### Manual Testing Checklist:

1. **Launch Screen:**
   - [ ] QR scanner opens camera
   - [ ] Manual table number input works
   - [ ] Navigation to menu works

2. **Menu Screen:**
   - [ ] Items display correctly
   - [ ] Search functionality works
   - [ ] Category filtering works
   - [ ] Add to cart works
   - [ ] Cart badge updates

3. **Cart Screen:**
   - [ ] Items display with correct quantities
   - [ ] Quantity modification works
   - [ ] Remove items works
   - [ ] Total calculation is correct
   - [ ] Proceed to payment works

4. **Payment Screen:**
   - [ ] Order summary displays correctly
   - [ ] Tip selection works
   - [ ] Payment method selection works
   - [ ] Final total calculation is correct
   - [ ] Payment processing works

5. **Order Status Screen:**
   - [ ] Status progression works
   - [ ] Order summary displays
   - [ ] Rating system works
   - [ ] New order navigation works

## Building for Production

### Android APK:
```bash
npx expo build:android
```

### Android App Bundle (recommended for Play Store):
```bash
npx expo build:android --type app-bundle
```

## Deployment Options

1. **Expo Managed Workflow** (current setup)
   - Easy to develop and test
   - Limited native customization
   - Good for most use cases

2. **Expo Bare Workflow**
   - More native control
   - Requires more setup
   - Better for complex native features

3. **React Native CLI**
   - Full native control
   - More complex setup
   - Maximum customization

## Performance Optimization

- Images are optimized for mobile
- Local storage reduces network requests
- Efficient re-rendering with React hooks
- Minimal external dependencies

## Security Considerations

- QR codes include validation
- Local storage for non-sensitive data only
- Payment processing uses secure methods
- Input validation on all forms

## Future Enhancements

- Push notifications for order updates
- User accounts and order history
- Loyalty program integration
- Multi-language support
- Offline functionality
- Kitchen staff interface

## Support

For technical issues:
1. Check this README
2. Review Expo documentation
3. Check React Native documentation
4. Review error logs in development console

## License

This project is for educational purposes as part of a mobile application development course.

