import React, { useState, useEffect } from "react";
import getFakeUser from "../../services/fakeUser";
import Profile from "./profile";

const ReadOnlyProfile = (props) => {
  const ReadOnlyProfile = true;
  const [stt, setStt] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });
  useEffect(() => {
    // backend function to get user data
    const userData = getFakeUser();

    setStt(userData);
  }, []);
  return <Profile {...stt} ReadOnlyProfile={ReadOnlyProfile} />;
};

export default ReadOnlyProfile;
