const getHeader = () => {
  //todo oooooooooo cheat jwt
  return {
    headers: {
      // jwt: localStorage.getItem("jwt") || "",
      jwt: "cheat-amm266" || "",
      "Content-Type": "application/json",
    },
  };
};

export default getHeader;
