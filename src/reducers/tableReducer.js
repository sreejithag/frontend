const initialData = {
  data: [],
  limit: 10,
  max: 0,
  page: 0,
  lastQuery: "",
};

const reducer = (state = initialData, action) => {
  const { type, payload } = action;
  if (type === "UPDATE_DATA") {
    return {
      ...state,
      data: payload.data,
    };
  } else if (type === "UPDATE_LIMIT") {
    return {
      ...state,
      limit: payload.limit,
    };
  } else if (type === "UPDATE_MAX") {
    return {
      ...state,
      max: payload.max,
    };
  } else if (type === "UPDATE_PAGE") {
    return {
      ...state,
      page: payload.page,
    };
  } else if (type === "UPDATE_LAST_QUERY") {
    return {
      ...state,
      lastQuery: payload.lastQuery,
    };
  }

  return state;
};

export default reducer;
