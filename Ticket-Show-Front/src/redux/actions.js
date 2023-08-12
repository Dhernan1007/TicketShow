import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENT_ID = "GET_EVENT_ID";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART = "UPDATE_CART";
export const getEvents = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/event/getEvents`);

    const Events = apiData.data;
    dispatch({
      type: GET_EVENTS,
      payload: Events,
    });
  };
};

export const getEventId = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`/event/getEvent/${id}`);
      const detail = apiData.data;
      console.log(apiData.data, "soy api data");
      dispatch({
        type: GET_EVENT_ID,
        payload: detail,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

export const GET_GENRES = "GET_GENRES";

export const getGenres = () => {
  return async (dispatch) => {
    const Data = await axios.get(`/genres/allGenres`);
    const genres = Data.data;
    return dispatch({
      type: GET_GENRES,
      payload: genres,
    });
  };
};

export const ORDER_BY_DATE = "ORDER_BY_DATE";

export const orderByDate = (payload) => {
  return {
    type: ORDER_BY_DATE,
    payload,
  };
};

export const GET_SEARCH_BY_NAME = "GET_SEARCH_BY_NAME";
export const NO_EVENTS = "NO_EVENTS";
export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get(`/event/getEvent/name/${name}`);
      const Events = apiData.data;
      return dispatch({
        type: GET_SEARCH_BY_NAME,
        payload: Events,
      });
    } catch (e) {
      console.log(e.response.data);
      return dispatch({
        type: NO_EVENTS,
        payload: e.response.data,
      });
    }
  };
};

export const GET_ORDER_BY_NAME = "GET_GET_ORDER_BY_NAME";

export const orderByName = (payload) => {
  return {
    type: GET_ORDER_BY_NAME,
    payload,
  };
};

export const FILTER_BY_DATE = "FILTER_BY_DATE";

export const FilterByDate = (payload) => {
  return {
    type: FILTER_BY_DATE,
    payload,
  };
};

export const GET_BY_CITY = "GET_BY_CITY";

export const GetByCity = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/city/allCity`);
    const city = apiData.data;
    return dispatch({
      type: GET_BY_CITY,
      payload: city,
    });
  };
};

export const FILTER_BY_CITY = "FILTER_BY_CITY";

export const FilterByCity = (payload) => {
  return {
    type: FILTER_BY_CITY,
    payload,
  };
};

export const GET_BY_DATE = "GET_BY_DATE";
export const GetByDate = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/date/allDate`);
    const allDate = apiData.data;
    return dispatch({
      type: GET_BY_DATE,
      payload: allDate,
    });
  };
};
// Acción para crear un nuevo usuario en el back-end
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/user/createUser", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_USER_FAILURE, payload: error.message });
    }
  };
};

// Acción para obtener un usuario por su ID desde el back-end

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_USER_BY_EMAIL_SUCCESS = "GET_USER_BY_EMAIL_SUCCESS";
export const GET_USER_BY_EMAIL_FAILURE = "GET_USER_BY_EMAIL_FAILURE";

export const getUserByEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/cart/users/${email}`);

      dispatch({ type: GET_USER_BY_EMAIL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_USER_BY_EMAIL_FAILURE, payload: error.message });
    }
  };
};

//-trae por mail
export const getUserById = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/user/");

      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
  };
};

////////// TRAIGO Y CREO USUARIOS ARTISTAS ////////////////
export const CREATE_ARTIST_SUCCESS = "CREATE_ARTIST_SUCCESS";
export const CREATE_ARTIST_FAILURE = "CREATE_ARTIST_FAILURE";
export const createArtist = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/artist/createArtist", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_ARTIST_FAILURE, payload: error.message });
    }
  };
};

export const CREATE_EVENT_SUCCESS = "GET_ARTIST_SUCCESS";
export const CREATE_EVENT_FAILURE = "GET_ARTIST_FAILURE";
export const createEvent = (eventInfo) => {
  console.log(eventInfo)
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/event/createEvent", eventInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_EVENT_FAILURE, payload: error.message });
    }
  };
};

export const GET_ARTIST_SUCCESS = "GET_ARTIST_SUCCESS";
export const GET_ARTIST_FAILURE = "GET_ARTIST_FAILURE";

export const getArtistById = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/artist/allArtist");

      dispatch({ type: GET_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ARTIST_FAILURE, payload: error.message });
    }
  };
};

export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";
export const editEvent = (eventInfo) => {
  return async (dispatch) => {
    try {
      const { id, ...data } = eventInfo; // Assuming "id" is the event ID to update
      const { data: responseData } = await axios.put(`/event/upeventos/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: UPDATE_EVENT_SUCCESS, payload: responseData });
    } catch (error) {
      // Handle specific error cases or display a generic error message
      dispatch({ type: UPDATE_EVENT_FAILURE, payload: error.message });
    }
  };
};


export const DELETE_EVENT_SUCCESS = "DELETE_ARTIST_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_ARTIST_FAILURE";
export const deleteEvent = (eventId, disabled) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/event/deleteEvent/${eventId}`, {disabled: true}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_EVENT_FAILURE, payload: error.message });
    }
  };
};

export const RESTORE_EVENT_SUCCESS = "RESTORE_EVENT_SUCCESS";
export const RESTORE_EVENT_FAILURE = "RESTORE_EVENT_FAILURE";
export const RestoreEvent = (eventId, disabled) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/event/restoreEvent/${eventId}`, {disabled: false}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: RESTORE_EVENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: RESTORE_EVENT_FAILURE, payload: error.message });
    }
  };
};














////nodemailer
export const CREATE_MAIL_SUCCESS = "CREATE_ARTIST_SUCCESS";
export const CREATE_MIAL_FAILURE = "CREATE_ARTIST_FAILURE";
export const sendMail = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/send/mail", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_ARTIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_ARTIST_FAILURE, payload: error.message });
    }
  };
};

////// TERMINO DE CREAR ARTISTAS Y LOS REQUIERO ////////////

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const updateUser = (updateData) => async (dispatch) => {
  try {
    const response = await axios.put(`/user/stateUser/${updateData.email}`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = response.data;

    dispatch(updateUserSuccess(updatedUser.user));

    // ¡No necesitas dispatch(getUserById()); aquí!
    // En su lugar, actualiza el estado de users en updateUserSuccess
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const GET_RESET = "GET_RESET";
export const getReset = () => {
  return {
    type: GET_RESET,
  };
};
export const GET_RESET_ORDER = "GET_RESET_ORDER";
export const getResetOrder = () => {
  return {
    type: GET_RESET_ORDER,
  };
};

export const POST_PAYPAL = "POST_PAYPAL";
export const postPaypal = () => {
  return async (dispatch) => {
    const apiData = await axios.post(`/create-order`);
    const allData = apiData.data;
    return dispatch({
      type: POST_PAYPAL,
      payload: allData,
    });
  };
};

export const GET_CAPTURE_ORDER = "GET_CAPTURE_ORDER";

export const getCaptureOrder = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/capture-order`);
    const allData = apiData.data;
    return dispatch({
      type: GET_CAPTURE_ORDER,
      payload: allData,
    });
  };
};

export const GET_CANCEL_ORDER = "GET_CANCEL_ORDER";

export const getCancelOrder = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/cancel-order`);
    const allData = apiData.data;
    return dispatch({
      type: GET_CANCEL_ORDER,
      payload: allData,
    });
  };
};

export const UPDATE_QUOTAS = 'UPDATE_QUOTAS'

export const updateQuotas = (id) => {

  return async (dispatch) => {
    const apiDate = await axios.put(`/event/updateEvent/${id}`, quotas)
    const allDate = apiDate.data
    return dispatch({
      type: UPDATE_QUOTAS,
      payload:allDate
    })
  }
}


=======
//comentarios

export const POST_USER_COMMENT = "POST_USER_COMMENT";

export function postComment() {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/comment/postComments`);

      // Aquí dispatch la acción que actualiza el estado en Redux
      dispatch({
        type: POST_USER_COMMENT,
        payload: response.data, // Actualiza el estado con los datos de la respuesta
      });

      return response;
    } catch (error) {
      alert(error.message);
    }
  };
}

export const GET_COMMENT = "GET_COMMENT";

export function getComment() {
  return async function (dispatch) {
      const response = await axios.get(`/comment/getComments/`);
      const comentario = response.data
      return dispatch({
        type: GET_COMMENT,
        payload: comentario, // Actualiza el estado con los datos de la respuesta
      });
    }

  }

