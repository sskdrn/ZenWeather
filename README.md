
<img src="https://github.com/user-attachments/assets/57630bd9-f25b-430a-8225-dca617d59458" alt="Logo" width="698" height="139">

ZenWeather is a minimalist weather app built with React Native, designed to deliver exactly what you need — the weather — with no distractions. Whether you're checking the current conditions, planning for the next few hours, or switching between Celsius and Fahrenheit, ZenWeather keeps it clean and simple.


Runs on both **Android** and **iOS**.

<img src="https://github.com/user-attachments/assets/1108add5-5528-4285-b773-3b7620c6b8bc" width="300">
<img src="https://github.com/user-attachments/assets/5225de2f-7733-47db-848a-125ba724824a" width="300">
<img src="https://github.com/user-attachments/assets/9f23557c-52b4-4690-8af5-d8f31656fd57" width="300">
<img src="https://github.com/user-attachments/assets/9d383c40-44db-4468-bdb2-7fc7e7a26c9a" width="300">
<img src="https://github.com/user-attachments/assets/1a3033b2-3d13-4e61-8e98-aecf2c079f84" width="300">
<img src="https://github.com/user-attachments/assets/20e6d3d7-e067-425c-9255-40ad5b8384de" width="300">


# Features

- 📍 **Location Detection & Search**  
  Automatically detects your location or allows manual searches.

- 🌤️ **Basic Weather Info**  
  View real-time temperature, condition, and location in a clean, uncluttered interface, the color scheme of the app will change according to current weather!

- 🕒 **10-Hour Forecast**  
  Get a quick view of how the weather will change in the next 10 hours.

- 🌡️ **Unit Toggle**  
  Seamlessly switch between Fahrenheit and Celsius.


## Tech, Tools and Assets

- [**React Native**](https://reactnative.dev) – Cross-platform mobile development  
- [**Google APIs**](https://mapsplatform.google.com/maps-products/) – Weather and location services  
- [**Figma**](https://www.figma.com) – Interface and experience design  
- [**Google Fonts**](https://fonts.google.com/) – Typography and minimal iconography


# Running the App

## Step 1: Make sure React Native Environment is ready

Follow the instructions on the following link to setup react native environment:
https://reactnative.dev/docs/environment-setup

## Step 2: Clone the repo and install the necessary dependencies

Run the following commands to clone to your location machine:

```bash
git clone https://github.com/sskdrn/zenweather.git
cd zenweather
```

Install the `npm` dependencies:

```bash
npm install
```

## Step 3: Configure API keys 

Create a file `.env` at the root of the project directory, and paste the below code snippet and save (after adding your own API key).

```env
GOOGLE_MAPS_API_KEY=<YOUR API KEY HERE>
GOOGLE_PLACES_URL=https://places.googleapis.com
GOOGLE_MAPS_URL=https://maps.googleapis.com
GOOGLE_WEATHER_URL=https://weather.googleapis.com
```

## Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
npm run android
```

### For iOS

```bash
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ or devices shortly provided you have set up your emulator/simulator/devices correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
