import UserInfo from "./userInfo";
import React, { useState, useEffect } from "react";
import getFakeInfos from "../../../services/fakeUserInfos";

const UserInfoList = () => {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
      //todo gat data back
    setUserInfos(getFakeInfos());
  }, []);

  return (
    <>
      <h1 className="display-4 center-text m-2"> Followers/Followings </h1>
      <div className="container">
        {userInfos.map((userInfo) => {
          return (
            <div className="row" key={userInfo.id}>
              <UserInfo user={userInfo} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserInfoList;
