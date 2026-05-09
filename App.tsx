import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

import { createNanoIconSet } from "react-native-nano-icons";
import glyphMap from "./assets/nanoicons/icons.glyphmap.json";

const Icon = createNanoIconSet(glyphMap);

const { width, height } = Dimensions.get("window");

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const icons = ["photo.fill", "camera.fill", "star.fill"];

  const positions = [
    { x: width / 2, y: height * 0.3 },
    { x: width / 2, y: height * 0.5 },
    { x: width / 2, y: height * 0.7 },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  return (
    <View style={styles.container}>
      {icons.map((iconName, index) => (
        <Animated.View
          key={index}
          style={[
            styles.iconContainer,
            {
              left: positions[index].x - 50,
              top: positions[index].y - 50,
              opacity: opacity,
              transform: [{ scale: scale }],
            },
          ]}
        >
          <Icon name={iconName} size={50} color="white" />
        </Animated.View>
      ))}
    </View>
  );
};

const COLORS = {
  background: "black",
  iconBackground: "rgba(0, 0, 255, 0.3)",
  border: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  iconContainer: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: COLORS.iconBackground,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
