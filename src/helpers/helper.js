exports.getDataFromApiAndSetState = async (
  url,
  updateData,
  updateMax,
  updatePage,
  updateLastQuery
) => {
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
      updateData(dataFromDb.results);
      updateMax(dataFromDb.max);
      updatePage(dataFromDb.page);
    }

    updateLastQuery(url.split("?")[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.getDataFromApi = async (url) => {
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
