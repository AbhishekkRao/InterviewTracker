const backendUrl = "http://localhost:8080";

export const apiWrapWithErrorWithData = (apiPromise) =>
  new Promise((resolve) => {
    apiPromise
      .then((res) =>
        resolve({
          ...res.data,
          httpCode: res.status,
        })
      )
      .catch((error) => {
        if (error.response) {
          resolve({
            ...error.response.data,
            httpCode: error.response.status,
            error: error,
          });
        } else {
          resolve(undefined);
        }
      });
  });

export const headersProvider = () => {
  let authData = null;
  try {
    authData = getToken();
  } catch (e) {
    console.error("Failed to parse existing cookie", e);
  }
  return {
    Authorization: `Bearer ${authData}`,
  };
};

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedDELETERequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(backendUrl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

const getToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token;
};
