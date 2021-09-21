export const setUserInfoInStorage = (userInfo) =>
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

export const getUserInfoFromStorage = () =>
  JSON.parse(localStorage.getItem("userInfo"));

export const removeUserInfoFromStorage = () =>
  localStorage.removeItem("userInfo");
