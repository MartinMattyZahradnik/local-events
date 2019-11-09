import { request } from "utils/request";
import { takeLatest, put } from "redux-saga/effects";

// Actions
import { fetchCountyListSuccess, fetchCountyListError } from "./actions";

// Constants
import { actionTypes as applicationActionTypes } from "./constants";

function* fetchCountryListWatcher() {
  try {
    const resp = yield request.get("/app/countries");
    yield put(fetchCountyListSuccess(resp.data.result));
  } catch (error) {
    if (error.response.status) {
      yield put(fetchCountyListError(error.response.status));
    }
  }
}

export default function* userSaga() {
  yield takeLatest(
    applicationActionTypes.FETCH_COUNTRY_LIST,
    fetchCountryListWatcher
  );
}
