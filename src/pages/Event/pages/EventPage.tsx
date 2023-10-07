import React, { useMemo } from "react";
import useAuthen from "../../../core/hooks/useAuthen";

import Loading from "../../../core/components/Loading";
import { StyledView,StyledText, StyledImage} from "../../../core/components/styled";
import EventStackRouter from "../routers/EventStackRouter";
import AccountStackRouter from "../../Account/routers/AccountStackRouter";
const EventPage = () =>{
    // check authentication
    // const auth = useAuthen()
    // if (auth.status == "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    // if (auth.status == "loading") return <Loading />;
    
    // fetch details of events ex posts, comments

    return(
        <>
            <StyledView className="m0 bg-white">
                <StyledText>ITCAMP19</StyledText>
            </StyledView>
            <EventStackRouter user={"admin"}></EventStackRouter>
        </>
    )



}

export default EventPage