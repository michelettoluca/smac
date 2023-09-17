import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Main from "./components/Main";
import { useFonts } from "expo-font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Rubik One": require("./assets/fonts/RubikOne-Regular.ttf"),
    "Rubik Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik SemiBold": require("./assets/fonts/Rubik-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Main />
      <StatusBar style="auto" />
    </View>
  );
}
