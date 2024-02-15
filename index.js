import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import { enableScreens } from "react-native-screens";
enableScreens();

// Register the app component
AppRegistry.registerComponent(appName, () => App);

// Run the app
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("root"),
});
