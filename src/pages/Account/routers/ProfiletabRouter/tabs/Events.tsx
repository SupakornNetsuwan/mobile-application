import React, { useMemo } from "react";
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../../../components/EmptyData";
import useGetEvents from "../../../../../core/hooks/Events/useGetEvents";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootPostStackParamsList } from "../../../../Event/routers/PostStackRouter";
import { FlatList } from "react-native";

const Events = () => {
  const navigation = useNavigation<StackNavigationProp<RootPostStackParamsList>>();
  const { data, isLoading } = useGetEvents()!;
  const events = useMemo(() => data?.data.data, [data?.data]);

  if (isLoading) return <EmptyData label="You have no events" />;

  return (
    <StyledView className="bg-white p-2 m-4 space-y-2">
      <FlatList
        ItemSeparatorComponent={() => <StyledView className="w-full h-2 bg-transparent" />}
        renderItem={({ item: event }) => {
          return (
            <StyledView className="flex-row justify-between items-center bg-amber-200 border-2 border-amber-300 p-2">
              <StyledView className="flex-row items-center space-x-2">
                <StyledImage
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${event.attributes.cover?.data.attributes.url}`,
                  }}
                  className="w-16 aspect-square rounded-full"
                />
                <StyledText className="text-lg font-noto-semibold">{event.attributes.name}</StyledText>
              </StyledView>
              <MaterialCommunityIcons name="trophy-award" size={24} color="#bca317" />
            </StyledView>
          );
        }}
        data={events}
      />
    </StyledView>
  );
};

export default Events;
