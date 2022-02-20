import React, {useEffect, useState} from "react";
import Profile from "./profile";
import ax from "../../services/httpService";
import cfg from "../../config.json";
import getHeader from "../../utils/getHeader";
import {backProfileToProfile, backProfileToStt, backProfileToUserInfo} from "../common/commonUtils/EntitieHandeler";
import getFakeUser from "../../services/fakeUser";

const ReadOnlyProfile = (props) => {
    const ReadOnlyProfile = true;
    const [isLoaded, setIsLoaded] = useState(false)
    const [stt, setStt] = useState({
        name: ""
        , email: "", bio: "", avatar: "",
    });

    let userData = getFakeUser()
    console.log("read only prof " + stt.name === "")
    useEffect((userData) => {
        // todo backend function to get user data
        //extract username from url
        let username = window.location.href.split("/")[4]
        if (stt.name === "") {
            const u = ax.get(cfg.apiUrl + "/users/" + username, getHeader()).then((res) => {
                console.log(res);
                let frontUser = backProfileToStt(res.data)
                console.log("fu " + JSON.stringify(frontUser))
                // setIsLoaded(true)
                setStt(frontUser)
                console.log("stt   " + JSON.stringify(stt))
            });
        }
    }, [window.location]);
    return <Profile {...stt} ReadOnlyProfile={ReadOnlyProfile}/>;
};

export default ReadOnlyProfile;
