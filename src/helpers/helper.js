const getDataFromApiAndSetState = async (url, dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(url, {
      method: "GET",
      headers: token !== null && token !== "" ? headers : undefined,
    });

    if (response.status === 200) {
      const dataFromDb = await response.json();
      dispatch({
        type: "UPDATE_DATA",
        payload: {
          data: dataFromDb.results,
        },
      });

      dispatch({
        type: "UPDATE_MAX",
        payload: {
          max: dataFromDb.max,
        },
      });

      dispatch({
        type: "UPDATE_PAGE",
        payload: {
          page: dataFromDb.page,
        },
      });
    }

    dispatch({
      type: "UPDATE_LAST_QUERY",
      payload: {
        lastQuery: url.split("?")[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(url, {
      method: "GET",
      headers: token !== null && token !== "" ? headers : undefined,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getSuggestions = async (phrase) => {
  try {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const url = `${process.env.REACT_APP_API_BASE_URL}/getSuggestion/${phrase}`;

    const response = await fetch(url, {
      method: "GET",
      headers: token !== null && token !== "" ? headers : undefined,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const helper = {
  getDataFromApi: getDataFromApi,
  getDataFromApiAndSetState: getDataFromApiAndSetState,
  getSuggestions: getSuggestions,
};
export default helper;
