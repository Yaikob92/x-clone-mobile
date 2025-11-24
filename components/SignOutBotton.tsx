import { TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSignOut } from "@/hooks/useSignOut";

const SignOutBotton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name="log-out" size={20} color={"#E0245E"} />
    </TouchableOpacity>
  );
};

export default SignOutBotton;
