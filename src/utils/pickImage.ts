import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) return;

    return {
        imageName: uri.split("/").pop()!,
        imageUri: uri,
    };
};

export default pickImage