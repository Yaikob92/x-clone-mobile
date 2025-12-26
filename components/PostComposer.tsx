import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

const PostComposer = () => {
  const {
    content,
    setContent,
    selectedImage,
    isCreating,
    pickImageFromGallery,
    takePhoto,
    removeImage,
    createPost,
  } = useCreatePost();

  const { user } = useUser();

  return (
    <View className="border-b border-gray-100 p-4 bg-white">
      <View className="flex-row">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            className="text-gray-900 text-lg"
            placeholder="what's happening"
            placeholderTextColor="#657786"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={280}
          />
        </View>
      </View>

      <View className="flex-row justify-between">
        <View>
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Feather name="image" size={20} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Feather name="camera" size={20} color="1DA1F2" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostComposer;
