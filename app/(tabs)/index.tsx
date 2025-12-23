import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutBotton from "@/components/SignOutBotton";
import { useUserSync } from "@/hooks/useUserSync";

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="flex-1">
      <Text>HomeScreen</Text>
      <SignOutBotton />
    </SafeAreaView>
  );
};

export default HomeScreen;
