export const parseJwt = (token: string) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const parseSessionToken = (token: string | null) => {
  if (token) {
    let userData = parseJwt(token);

    return {
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      type: userData.type,
      email: userData.email,
      profilePicture: userData.profilePicture,
      sessionId: token
    };
  } else {
    return { sessionId: "" };
  }
};
