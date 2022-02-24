import UserInfo from "./userInfo";
import { useHistory } from "react-router-dom";
import React, {useEffect, useState} from "react";
import getFakeInfos from "../../../services/fakeUserInfos";
import ax from "../../../services/httpService"
import cfg from "../../../config.json";
import getHeader from "../../../utils/getHeader";
import {backProfileToUserInfo} from "../commonUtils/EntitieHandeler";
import {TokenIsExpires} from "../../../services/Tools";
import EasyButton from "../Buttons/easyButton";
import {useNavigate} from 'react-router'

const UserInfoList = () => {
    const [userInfos, setUserInfos] = useState([]);
    const username = window.location.href.split("/")[3]
    const reqType = window.location.href.split("/")[4] + "s"

    useEffect(() => {
        console.log(username)
        let users = []
        let backUsers = null
        ax.get(cfg.apiUrl + "/users/" + username + "/" + reqType, getHeader()).then(res => {
            console.log("res   ", res)
            if (res.status === 203) {
                TokenIsExpires()
                return
            }
            console.log("res 0 ", backProfileToUserInfo(res.data[0]))
            backUsers = res.data.map(item => backProfileToUserInfo(item))
            console.log('users    ', users)
            console.log('back users    ', backUsers)
            console.log('fake users    ', getFakeInfos())
            setUserInfos(backUsers);
        });
    }, []);
    console.log(window.history)
    let navigation = useNavigate();
    return (
        <>
            <h1 className="display-4 center-text m-2"> {reqType} </h1>
            <div className="container">
                {userInfos.map((userInfo) => {
                    return (
                        <div className="row" key={userInfo.id}>
                            <UserInfo user={userInfo}/>
                        </div>
                    );
                })}
            </div>
            <div style={{position:"absolute", marginBottom: "10px"}}>
            </div>
                {/*<EasyButton title = "back" style={{position:"absolute", marginTop: "100px"}} onClick={() => navigation.goBack()}/>*/}
        </>
    );
};

export default UserInfoList;
