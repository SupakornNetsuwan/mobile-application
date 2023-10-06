import React, { useMemo } from "react";
import useAuthen from "../../../core/hooks/useAuthen";

import Loading from "../../../core/components/Loading";
import { StyledView,StyledText, StyledImage} from "../../../core/components/styled";
import EventStackRouter from "../routers/EventStackRouter";
const EventPage = () =>{
    // check authentication
    // const auth = useAuthen()
    // if (auth.status == "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    // if (auth.status == "loading") return <Loading />;
    
    // fetch details of events ex posts, comments

    return(
        <>
            <StyledView className="m0 bg-white">
                <StyledImage source={require("../../../../assets/profile-backdrop.png")} className="w-full h-44" />
                <StyledText>ITCAMP19</StyledText>
                <StyledView>    
                    <EventStackRouter></EventStackRouter>
                </StyledView>
            </StyledView>
        </>
    )



}

export default EventPage