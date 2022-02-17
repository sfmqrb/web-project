const getHeader = () => {
  return {
    headers: {
      jwt: localStorage.getItem("jwt") || "",
      "Content-Type": "application/json",
    },
  };
};

export default getHeader;
