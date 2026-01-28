# React Native App

A React Native application built with Expo.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or newer)
- [Expo Go](https://expo.dev/client) app on your mobile device (available on iOS App Store and Google Play Store)

### Installing bun

If you don't have bun installed:

```bash
npm install -g bun
```

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd <your-project-name>
```

2. Install dependencies:

```bash
bun install
```

## Running the App

### Start the Development Server

```bash
bun start
```

This will start the Metro bundler and display a QR code in your terminal.

### Testing on Your Mobile Device

1. **Install Expo Go** on your mobile device:
   - iOS: Download from the [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Connect to the same network**: Make sure your mobile device and computer are on the same Wi-Fi network.

3. **Scan the QR code**:
   - **iOS**: Open the Camera app and scan the QR code displayed in your terminal. Tap the notification to open in Expo Go.
   - **Android**: Open the Expo Go app and tap "Scan QR code", then scan the QR code from your terminal.

4. The app will load on your device. Any changes you make to the code will automatically reload on your device.

### Available Scripts

- **Start development server**: `bun start`
- **Open on Android**: `bun android` (opens on Android device/emulator)
- **Open on iOS**: `bun ios` (opens on iOS simulator - Mac only)
- **Open in web browser**: `bun web`

### Alternative Methods to Open on Device

If QR code scanning doesn't work:

- Press `s` in the terminal to sign in to your Expo account and access the project from the Expo Go app
- Use the direct scripts: `bun android` or `bun ios`

### Keyboard Shortcuts in Terminal

When the dev server is running:

- `a` - Open on Android device/emulator
- `i` - Open on iOS simulator (Mac only)
- `w` - Open in web browser
- `r` - Reload app
- `m` - Toggle menu
- `j` - Open debugger

## Troubleshooting

### App won't load on device

- Ensure your computer and mobile device are on the same Wi-Fi network
- Try restarting the Metro bundler: `bun start --clear`
- Check your firewall settings aren't blocking connections

### "Unable to resolve module"

Clear the cache and reinstall:

```bash
rm -rf node_modules
bun install
bun start --clear
```

### Slow loading or performance issues

- Close other apps on your device
- Restart the Expo Go app
- Try clearing the cache: `bun start --clear`

### QR code not working

- Manually enter the URL shown in terminal into Expo Go app
- Sign in to Expo and access project from your account
- Use the direct commands: `bun android` or `bun ios`

## Project Structure

```
.
├── app/                # App screens and navigation
├── assets/             # Images, fonts, and other static files
├── components/         # Reusable components
├── constants/          # App constants and configuration
├── hooks/              # Custom React hooks
├── package.json        # Dependencies and scripts
└── app.json           # Expo configuration
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Forums](https://forums.expo.dev/)
