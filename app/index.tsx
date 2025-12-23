import { useClerk } from "@clerk/clerk-expo";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const { signOut } = useClerk();
  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>Logout</TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
