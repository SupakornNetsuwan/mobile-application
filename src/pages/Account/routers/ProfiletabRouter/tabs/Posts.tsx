import React, { useMemo } from "react";
import { StyledImage, StyledText, StyledView } from "../../../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../../../components/EmptyData";
import useGetEvents from "../../../../../core/hooks/Events/useGetEvents";
import EachEvent from "./components/EachEvent";
import { FlatList } from "react-native-gesture-handler";

const Posts = () => {
  const { data, isLoading } = useGetEvents()!;
  const events = useMemo(() => data?.data.data, [data?.data]);

  if (isLoading) return <EmptyData label="You have no events" />;

  return (
    <StyledView>
      <FlatList
        ItemSeparatorComponent={() => <StyledView className="w-full bg-transparent" />}
        renderItem={({ item: event }) => {
          return <EachEvent postId={event.id} />;
        }}
        data={events}
      />
    </StyledView>
  );
};

export default Posts;
