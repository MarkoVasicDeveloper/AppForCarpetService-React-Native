import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function api(path, method, body, role) {
  return new Promise(async (resolve) => {
    const requestData = {
      method: method,
      url: path,
      baseURL: "https://washersoftware.com/",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: await getToken(role),
      },
    };

    axios(requestData)
      .then((res) => responseHandler(res, resolve))
      .catch(async (err) => {
        if (err.response.status === 401) {
          const newToken = await refreshToken(role);

          if (!newToken) {
            const response = {
              status: "login",
              data: null,
            };

            return resolve(response);
          }

          await saveToken(role, newToken);

          requestData.headers["Authorization"] = getToken(role);

          return await repeatRequest(requestData, resolve);
        }

        const response = {
          status: "error",
          data: err,
        };

        resolve(response);
      });
  });
}

async function responseHandler(res, resolve) {
  if (res.status < 200 || res.status >= 300) {
    const response = {
      status: "error",
      data: res.data,
    };

    return resolve(response);
  }

  const response = {
    status: "ok",
    data: res.data,
  };

  return resolve(response);
}

async function getToken(role) {
  try {
    const token = await AsyncStorage.getItem("@api_token" + role);
    return "Bearer " + token;
  } catch (error) {
    return "Bearer ";
  }
}

export async function saveToken(role, token) {
  try {
    await AsyncStorage.setItem("@api_token" + role, token);
  } catch (error) {
    console.log(error);
  }
}

async function getRefreshToken(role) {
  try {
    const token = await AsyncStorage.getItem("@api_refresh_token" + role);
    return token + "";
  } catch (error) {
    return "";
  }
}

export async function saveRefreshToken(role, token) {
  try {
    await AsyncStorage.setItem("@api_refresh_token" + role, token);
  } catch (error) {
    console.log(error);
  }
}

export async function saveIdentity(role, itentity) {
  try {
    await AsyncStorage.setItem("@api_identity" + role, itentity);
  } catch (error) {
    console.log(error);
  }
}

export async function getIdentity(role) {
  try {
    const token = await AsyncStorage.getItem("@api_identity" + role);
    return "Berer " + token;
  } catch (error) {
    console.log(error);
  }
}

export async function removeTokenData(role) {
  try {
    await AsyncStorage.removeItem("@api_token" + role);
    await AsyncStorage.removeItem("@api_refresh_token" + role);
    await AsyncStorage.removeItem("@api_identity" + role);
  } catch (error) {
    console.log(error);
  }
}

async function refreshToken(role) {
  const path = "auth/" + role + "/refresh";
  const data = {
    token: await getRefreshToken(role),
  };

  const refreshTokenRequestData = {
    method: "post",
    url: path,
    baseURL: "https://washersoftware.com/",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const rtr = await axios(refreshTokenRequestData);

  if (!rtr.data.token) {
    return null;
  }

  return rtr.data.token;
}

async function repeatRequest(requestData, resolve) {
  axios(requestData)
    .then((res) => {
      let response;

      if (res.status === 401) {
        response = {
          status: "login",
          data: null,
        };
      } else {
        response = {
          status: "ok",
          data: res.data,
        };
      }

      return resolve(response);
    })
    .catch((err) => {
      const response = {
        status: "error",
        data: err,
      };

      return resolve(response);
    });
}
