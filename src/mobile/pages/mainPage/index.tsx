import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.mainPage}>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPage: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
});
