import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { call, put, takeLatest } from "redux-saga/effects";
// import { getUserByToken } from "./authCrud";
import axios from "axios";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  // UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  //#region  Insurance Type

  //:: For the Save Insurance type::


  //::Get Insurance Type By Id::


  //::for Reset Insurance Type :://
  ResetInsuranceType: "[ResetInsuranceType] Action",
  ResetInsuranceTypeResponse: "[ResetInsuranceTypeResponse] Action",

  DeleteInsuranceTypeById: "[DeleteInsuranceTypeById] Action",
  DeleteInsuranceTypeByIdResponse: "[DeleteInsuranceTypeByIdResponse] Action",

  //#endregion

  //#endregion

  //#region Manage Profile
  GetUserData: "[GetUserData] Action",
  GetUserDataResponse: "[GetUserDataResponse] Action",

  GetUseFavoriteVideoData: "[GetUseFavoriteVideoData] Action",
  GetUseFavoriteVideoDataResponse: "[GetUseFavoriteVideoDataResponse] Action",

  UpdateProfile: "[UpdateProfile] Action",
  UpdateProfileResponse: "[UpdateProfileResponse] Action",
  //#endregion End Manage Profile

  //#region Manage Tags
  GetTags: "[GetTags] Action",
  GetTagResponse: "[GetTagResponse] Action",

  GetInsuranceTypes: "[GetInsuranceTypes] Action",
  GetInsuranceTypeResponse: "[GetInsuranceTypeResponse] Action",

  GetInsuranceTypeById: "[GetInsuranceTypeById] Action",
  GetInsuranceTypeByIdResponse: "[GetInsuranceTypeByIdResponse] Action",

  AddTag: "[AddTag] Action",
  AddTagResponse: "[AddTagResponse] Action",

  DeleteTagById: "[DeleteTagById] Action",
  DeleteTagByIdResponse: "[DeleteTagByIdResponse] Action",

  //#endregion End Manage Tags


  //#region Manage Video
  GetVideos: "[GetVideos] Action",
  GetVideosResponse: "[GetVideosResponse] Action",

  GetVideoById: "[GetVideoById] Action",
  GetVideoByIdResponse: "[GetVideoByIdResponse] Action",

  GetMasterTags: "[GetMasterTags] Action",
  GetMasterTagsResponse: "[GetMasterTagsResponse] Action",

  ResetVideo: "[ResetVideo] Action",
  ResetVideoResponse: "[ResetVideoResponse] Action",

  AddEditVideo: "[AddEditVideo] Action",
  AddEditVideoResponse: "[AddEditVideoResponse] Action",

  DeleteVideoById: "[DeleteVideoById] Action",
  DeleteVideoByIdResponse: "[DeleteVideoByIdResponse] Action",

  //#endregion End Manage Video 


};

const BASE_URL = "http://megaminds-001-site9.itempurl.com/api/";
// const BASE_URL = "http://localhost:4200/api/"


const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const authToken = action.payload.data.accessToken;
        const user = action.payload.data;

        return { authToken, user: user };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      //#region Manage Carrier
      case actionTypes.Savecarrier: {
        const { carrier } = action.payload;
        return { ...state, carrier };
      }

      case actionTypes.SaveCarrierResponse: {
        const carrierResponse = action.payload.carrierResponse.data && action.payload.carrierResponse.data;
        return { ...state, carrierResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.UpdateCarrier: {
        const { carrier } = action.payload;
        return { ...state, carrier };
      }

      case actionTypes.UpdateCarrierResponse: {

        const UpdateCarrierResponse = action.payload.UpdateCarrierResponse.data && action.payload.UpdateCarrierResponse.data;
        return { ...state, UpdateCarrierResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.GetCarrier: {
        const { RequestParmCarrierName } = action.payload;
        return { ...state, RequestParmCarrierName };
      }

      case actionTypes.GetCarrierResponse: {
        const getCarrierResponse = action.payload.getCarrierResponse.data && action.payload.getCarrierResponse.data;
        return { ...state, getCarrierResponse };
      }

      case actionTypes.GetCarrierById: {
        const { RequestParmCarrierData } = action.payload;
        return { ...state, RequestParmCarrierData };
      }

      case actionTypes.GetCarrierByIdResponse: {
        const getCarrierByIdResponse = action.payload.getCarrierByIdResponse.data && action.payload.getCarrierByIdResponse.data;
        return { ...state, getCarrierByIdResponse };
      }

      case actionTypes.ResetCarrier: {
        const { ResetCarrier } = action.payload;
        return { ...state, ResetCarrier };
      }

      case actionTypes.ResetCarrierResponse: {
        const getCarrierByIdResponse = action.payload.ResetCarrierResponse && action.payload.ResetCarrierResponse;
        return { ...state, getCarrierByIdResponse };
      }

      // for the delete carrier 
      case actionTypes.DeleteCarrierById: {
        const RequestParmuiCarrier = action.payload;
        return { ...state, RequestParmuiCarrier };
      }

      case actionTypes.DeleteCarrierByIdResponse: {
        const DeleteCarrierByIdResponse = action.payload.DeleteCarrierByIdResponse && action.payload.DeleteCarrierByIdResponse;
        return { ...state, DeleteCarrierByIdResponse };
      }

      //#endregion Manage Carrier

      //#region Insurance Type

      //::For the Save Insurance Type::



      // //:: for the reset insurance type:://
      // case actionTypes.ResetInsuranceType: {
      //   const { ResetInsuranceType } = action.payload;
      //   return { ...state, ResetInsuranceType };
      // }

      // //:: End reset insurance type:://

      // case actionTypes.DeleteInsuranceTypeById: {
      //   const RequestParmInsuranceTypeId = action.payload;
      //   return { ...state, RequestParmInsuranceTypeId };
      // }

      // case actionTypes.DeleteInsuranceTypeByIdResponse: {
      //   const DeleteInsuranceTypeByIdResponse = action.payload.DeleteInsuranceTypeByIdResponse && action.payload.DeleteInsuranceTypeByIdResponse;
      //   return { ...state, DeleteInsuranceTypeByIdResponse };
      // }

      //#endregion

      //#region Manage User



      case actionTypes.GetErrorlogs: {
        const { RequestParmUserData } = action.payload;
        return { ...state, RequestParmUserData };
      }

      case actionTypes.GetErrorlogsResponse: {

        const GetErrorlogsResponse = action.payload.GetErrorlogsResponse.data && action.payload.GetErrorlogsResponse.data;
        return { ...state, GetErrorlogsResponse };
      }

      case actionTypes.GetUserById: {
        const { RequestParmUserByIdData } = action.payload;
        return { ...state, RequestParmUserByIdData };
      }

      case actionTypes.GetUserByIdResponse: {
        const GetUserByIdResponse = action.payload.GetUserByIdResponse.data && action.payload.GetUserByIdResponse.data;
        return { ...state, GetUserByIdResponse };
      }

      case actionTypes.GetUserPaymentMethods: {

        const { RequestParmUserPaymentMethodsData } = action.payload;
        return { ...state, RequestParmUserPaymentMethodsData };
      }

      case actionTypes.GetUserPaymentMethodsResponse: {

        const GetUserPaymentMethodsResponse = action.payload.GetUserPaymentMethodsResponse.data && action.payload.GetUserPaymentMethodsResponse.data;
        return { ...state, GetUserPaymentMethodsResponse };
      }

      //#endregion


      //#region Manage Profile 

      case actionTypes.GetUserData: {
        const { userData } = action.payload;
        return { ...state, userData };
      }
      case actionTypes.GetUserDataResponse: {
        const GetUserDataResponse = action.payload.GetUserDataResponse.data && action.payload.GetUserDataResponse.data;
        return { ...state, GetUserDataResponse };
      }

      case actionTypes.GetUseFavoriteVideoData: {
        const { userFavoriteData } = action.payload;
        return { ...state, userFavoriteData };
      }
      case actionTypes.GetUseFavoriteVideoDataResponse: {
        const GetUseFavoriteVideoDataResponse = action.payload.GetUseFavoriteVideoDataResponse.data && action.payload.GetUseFavoriteVideoDataResponse.data;
        return { ...state, GetUseFavoriteVideoDataResponse };
      }

      case actionTypes.UpdateProfile: {
        const { profile } = action.payload;
        return { ...state, profile };
      }
      case actionTypes.UpdateProfileResponse: {
        const updateResponse = action.payload.updateResponse.data && action.payload.updateResponse.data;
        return { ...state, updateResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }
      //#endregion End Manage Profile 

      //#region  Manage Tags
      case actionTypes.GetTags: {
        const { RequestParmTag } = action.payload;
        return { ...state, RequestParmTag };
      }

      case actionTypes.GetTagResponse: {
        const GetTagResponse = action.payload.GetTagResponse.data && action.payload.GetTagResponse.data;
        return { ...state, GetTagResponse };
      }

      case actionTypes.GetInsuranceTypes: {
        const { RequestParmInsuranceTypeName } = action.payload;
        return { ...state, RequestParmInsuranceTypeName };
      }

      case actionTypes.GetInsuranceTypeResponse: {
        const GetInsuranceTypeResponse = action.payload.data && action.payload.data;
        return { ...state, GetInsuranceTypeResponse };
      }


      case actionTypes.GetInsuranceTypeById: {
        const { RequestParmInsuranceTypeData } = action.payload;
        return { ...state, RequestParmInsuranceTypeData };
      }

      case actionTypes.GetInsuranceTypeByIdResponse: {
        const getInsuranceTypeByIdResponse = action.payload.GetInsuranceTypeByIdResponse.data && action.payload.GetInsuranceTypeByIdResponse.data;
        return { ...state, getInsuranceTypeByIdResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {

        const getInsuranceTypeByIdResponse = action.payload.ResetInsuranceTypeResponse && action.payload.ResetInsuranceTypeResponse;
        return { ...state, getInsuranceTypeByIdResponse };
      }

      case actionTypes.AddTag: {
        const { tag } = action.payload;
        return { ...state, tag };
      }
      case actionTypes.AddTagResponse: {
        const tagResponse = action.payload.tagResponse.data && action.payload.tagResponse.data;
        return { ...state, tagResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.DeleteTagById: {
        const RequestParmDeleteTagId = action.payload;
        return { ...state, RequestParmDeleteTagId };
      }

      case actionTypes.DeleteTagByIdResponse: {
        const DeleteTagByIdResponse = action.payload.DeleteTagByIdResponse && action.payload.DeleteTagByIdResponse;
        return { ...state, DeleteTagByIdResponse };
      }


      //#endregion End Manage Tags


      //#region Manage Videos
      case actionTypes.GetVideos: {
        const { RequestParmVideo } = action.payload;
        return { ...state, RequestParmVideo };
      }

      case actionTypes.GetVideosResponse: {
        const GetVideosResponse = action.payload.GetVideosResponse.data && action.payload.GetVideosResponse.data;
        return { ...state, GetVideosResponse };
      }

      case actionTypes.GetVideoById: {
        const { RequestParmVideoByIdData } = action.payload;
        return { ...state, RequestParmVideoByIdData };
      }

      case actionTypes.GetVideoByIdResponse: {
        const GetVideoByIdResponse = action.payload.GetVideoByIdResponse.data && action.payload.GetVideoByIdResponse.data;
        return { ...state, GetVideoByIdResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }


      case actionTypes.GetMasterTags: {
        const { RequestParmTagData } = action.payload;
        return { ...state, RequestParmTagData };
      }

      case actionTypes.GetMasterTagsResponse: {
        const GetMasterTagsResponse = action.payload.GetMasterTagsResponse.data && action.payload.GetMasterTagsResponse.data;
        return { ...state, GetMasterTagsResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.ResetVideo: {
        const { ResetVideo } = action.payload;
        return { ...state, ResetVideo };
      }


      case actionTypes.ResetVideo: {
        const { ResetVideo } = action.payload;
        return { ...state, ResetVideo };
      }

      case actionTypes.ResetVideoResponse: {

        const GetVideoByIdResponse = action.payload.ResetVideoResponse && action.payload.ResetVideoResponse;
        return { ...state, GetVideoByIdResponse };
      }


      case actionTypes.AddEditVideo: {
        const { addeditVideo } = action.payload;
        return { ...state, addeditVideo };
      }
      case actionTypes.AddEditVideoResponse: {
        const addEditVideoResponse = action.payload.addEditVideoResponse.data && action.payload.addEditVideoResponse.data;
        return { ...state, addEditVideoResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }


      case actionTypes.DeleteVideoById: {
        const RequestParmDeleteVideoId = action.payload;
        return { ...state, RequestParmDeleteVideoId };
      }

      case actionTypes.DeleteVideoByIdResponse: {
        const DeleteVideoByIdResponse = action.payload.DeleteVideoByIdResponse && action.payload.DeleteVideoByIdResponse;
        return { ...state, DeleteVideoByIdResponse };
      }



      //#endregion End Manage Videos

      default:
        return state;
    }
  }
);

export const actions = {
  login: (data) => ({ type: actionTypes.Login, payload: { data } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  // requestUser: (user) => ({
  //   type: actionTypes.UserRequested,
  //   payload: { user },
  // }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  SaveCarrier: (carrier) => ({ type: actionTypes.SaveCarrier, payload: { carrier } }),
  SaveCarrierResponse: (carrierResponse) => ({ type: actionTypes.SaveCarrierResponse, payload: { carrierResponse } }),

  UpdateCarrier: (carrier) => ({ type: actionTypes.UpdateCarrier, payload: { carrier } }),
  UpdateCarrierResponse: (UpdateCarrierResponse) => ({ type: actionTypes.UpdateCarrierResponse, payload: { UpdateCarrierResponse } }),

  SaveRewardSetting: (RewardSetting) => ({ type: actionTypes.SaveRewardSetting, payload: { RewardSetting } }),
  SaveRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.SaveRewardSettingResponse, payload: { RewardSettingResponse } }),

  SaveProfile: (ProfileSetting) => ({ type: actionTypes.SaveProfile, payload: { ProfileSetting } }),
  SaveProfileResponse: (SaveProfileResponse) => ({ type: actionTypes.SaveProfileResponse, payload: { SaveProfileResponse } }),

  ResetRewardSetting: (RewardSetting) => ({ type: actionTypes.ResetRewardSetting, payload: { RewardSetting } }),
  ResetRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.ResetRewardSettingResponse, payload: { RewardSettingResponse } }),
  GetRewardSetting: (RewardSetting) => ({ type: actionTypes.GetRewardSetting, payload: { RewardSetting } }),
  GetRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.GetRewardSettingResponse, payload: { RewardSettingResponse } }),


  GetCarrier: (RequestParmCarrierName) => ({ type: actionTypes.GetCarrier, payload: { RequestParmCarrierName } }),
  GetCarrierResponse: (getCarrierResponse) => ({ type: actionTypes.GetCarrierResponse, payload: { getCarrierResponse } }),

  GetCarrierById: (RequestParmCarrierData) => ({ type: actionTypes.GetCarrierById, payload: { RequestParmCarrierData } }),
  GetCarrierByIdResponse: (getCarrierByIdResponse) => ({ type: actionTypes.GetCarrierByIdResponse, payload: { getCarrierByIdResponse } }),

  ResetCarrier: (ResetCarrier) => ({ type: actionTypes.ResetCarrier, payload: { ResetCarrier } }),
  ResetCarrierResponse: (ResetCarrierResponse) => ({ type: actionTypes.ResetCarrierResponse, payload: { ResetCarrierResponse } }),

  // for the delete carrier 

  DeleteCarrierById: (RequestParmDeleteCarrierData) => ({ type: actionTypes.DeleteCarrierById, payload: { RequestParmDeleteCarrierData } }),
  DeleteCarrierByIdResponse: (DeleteCarrierByIdResponse) => ({ type: actionTypes.DeleteCarrierByIdResponse, payload: { DeleteCarrierByIdResponse } }),


  //#region Insurance Type

  //::For the Save Insurance Type::

  //::for reset insurance type :://
  ResetInsuranceType: (ResetInsuranceType) => ({ type: actionTypes.ResetInsuranceType, payload: { ResetInsuranceType } }),
  ResetInsuranceTypeResponse: (ResetInsuranceTypeResponse) => ({ type: actionTypes.ResetInsuranceTypeResponse, payload: { ResetInsuranceTypeResponse } }),
  //::end insurance type :://
  DeleteInsuranceTypeById: (RequestParmDeleteInsuranceTypeData) => ({ type: actionTypes.DeleteInsuranceTypeById, payload: { RequestParmDeleteInsuranceTypeData } }),
  DeleteInsuranceTypeByIdResponse: (DeleteInsuranceTypeByIdResponse) => ({ type: actionTypes.DeleteInsuranceTypeByIdResponse, payload: { DeleteInsuranceTypeByIdResponse } }),
  //#endregion

  //#region Manage Users


  GetErrorlogs: (RequestParmErrorlogsData) => ({ type: actionTypes.GetErrorlogs, payload: { RequestParmErrorlogsData } }),
  GetErrorlogsResponse: (GetErrorlogsResponse) => ({ type: actionTypes.GetErrorlogsResponse, payload: { GetErrorlogsResponse } }),

  GetUserById: (RequestParmUserByIdData) => ({ type: actionTypes.GetUserById, payload: { RequestParmUserByIdData } }),
  GetUserByIdResponse: (GetUserByIdResponse) => ({ type: actionTypes.GetUserByIdResponse, payload: { GetUserByIdResponse } }),

  GetUserPaymentMethods: (RequestParmUserPaymentMethods) => ({ type: actionTypes.GetUserPaymentMethods, payload: { RequestParmUserPaymentMethods } }),
  GetUserPaymentMethodsResponse: (GetUserPaymentMethodsResponse) => ({ type: actionTypes.GetUserPaymentMethodsResponse, payload: { GetUserPaymentMethodsResponse } }),


  //#endregion


  //#region Manage Profile

  GetUserData: (userData) => ({ type: actionTypes.GetUserData, payload: { userData } }),
  GetUserDataResponse: (GetUserDataResponse) => ({ type: actionTypes.GetUserDataResponse, payload: { GetUserDataResponse } }),

  GetUseFavoriteVideoData: (userFavoriteData) => ({ type: actionTypes.GetUseFavoriteVideoData, payload: { userFavoriteData } }),
  GetUseFavoriteVideoDataResponse: (GetUseFavoriteVideoDataResponse) => ({ type: actionTypes.GetUseFavoriteVideoDataResponse, payload: { GetUseFavoriteVideoDataResponse } }),

  UpdateProfile: (profile) => ({ type: actionTypes.UpdateProfile, payload: { profile } }),
  UpdateProfileResponse: (updateResponse) => ({ type: actionTypes.UpdateProfileResponse, payload: { updateResponse } }),
  //#endregion Manage Profile

  //#region  Manage Tags
  GetTags: (RequestParmTag) => ({ type: actionTypes.GetTags, payload: { RequestParmTag } }),
  GetTagResponse: (GetTagResponse) => ({ type: actionTypes.GetTagResponse, payload: { GetTagResponse } }),

  GetInsuranceTypes: (RequestParmInsuranceTypeName) => ({ type: actionTypes.GetInsuranceTypes, payload: { RequestParmInsuranceTypeName } }),
  GetInsuranceTypeResponse: (GetInsuranceTypeResponse) => ({ type: actionTypes.GetInsuranceTypeResponse, payload: { GetInsuranceTypeResponse } }),

  GetInsuranceTypeById: (RequestInsuranceTypeData) => ({ type: actionTypes.GetInsuranceTypeById, payload: { RequestInsuranceTypeData } }),
  GetInsuranceTypeByIdResponse: (GetInsuranceTypeByIdResponse) => ({ type: actionTypes.GetInsuranceTypeByIdResponse, payload: { GetInsuranceTypeByIdResponse } }),

  AddTag: (tag) => ({ type: actionTypes.AddTag, payload: { tag } }),
  AddTagResponse: (tagResponse) => ({ type: actionTypes.AddTagResponse, payload: { tagResponse } }),

  DeleteTagById: (RequestParmDeleteTagId) => ({ type: actionTypes.DeleteTagById, payload: { RequestParmDeleteTagId } }),
  DeleteTagByIdResponse: (DeleteTagByIdResponse) => ({ type: actionTypes.DeleteTagByIdResponse, payload: { DeleteTagByIdResponse } }),

  //#endregion End Manage Tags

  //#region Manage Videos
  GetVideos: (RequestParmVideo) => ({ type: actionTypes.GetVideos, payload: { RequestParmVideo } }),
  GetVideosResponse: (GetVideosResponse) => ({ type: actionTypes.GetVideosResponse, payload: { GetVideosResponse } }),

  GetVideoById: (RequestParmVideoByIdData) => ({ type: actionTypes.GetVideoById, payload: { RequestParmVideoByIdData } }),
  GetVideoByIdResponse: (GetVideoByIdResponse) => ({ type: actionTypes.GetVideoByIdResponse, payload: { GetVideoByIdResponse } }),

  GetMasterTags: (RequestParmTagData) => ({ type: actionTypes.GetMasterTags, payload: { RequestParmTagData } }),
  GetMasterTagsResponse: (GetMasterTagsResponse) => ({ type: actionTypes.GetMasterTagsResponse, payload: { GetMasterTagsResponse } }),

  ResetVideo: (ResetVideo) => ({ type: actionTypes.ResetVideo, payload: { ResetVideo } }),
  ResetVideoResponse: (ResetVideoResponse) => ({ type: actionTypes.ResetVideoResponse, payload: { ResetVideoResponse } }),

  AddEditVideo: (addeditVideo) => ({ type: actionTypes.AddEditVideo, payload: { addeditVideo } }),
  AddEditVideoResponse: (addEditVideoResponse) => ({ type: actionTypes.AddEditVideoResponse, payload: { addEditVideoResponse } }),

  DeleteVideoById: (RequestParmDeleteVideoId) => ({ type: actionTypes.DeleteVideoById, payload: { RequestParmDeleteVideoId } }),
  DeleteVideoByIdResponse: (DeleteVideoByIdResponse) => ({ type: actionTypes.DeleteVideoByIdResponse, payload: { DeleteVideoByIdResponse } }),
  //#endregion End Manage Videos

  
};

export function* saga() {

  //:: reset insurance type:://

  yield takeLatest(actionTypes.ResetInsuranceType, function* ResetInsuranceTypeRequested(payload) {

    yield put(actions.ResetInsuranceTypeResponse(payload.payload.ResetInsuranceType));

  });
  //::end reset insurance type :://
  //#endregion Dashbards


  //#region Manage Profile 

  yield takeLatest(actionTypes.GetUserData, function* getUserDataRequested(payload) {
    const response = yield call(getUserDataRequestApi, payload.payload);
    console.log(response)
    if (response)
      yield put(actions.GetUserDataResponse(response));
  });

  yield takeLatest(actionTypes.GetUseFavoriteVideoData, function* getUseFavoriteVideoDataRequested(payload) {
    const response = yield call(getUseFavoriteVideoDataRequestApi, payload.payload);
    console.log(response)
    if (response)
      yield put(actions.GetUseFavoriteVideoDataResponse(response));
  });

  yield takeLatest(actionTypes.UpdateProfile, function* updateProfileRequested(payload) {
    const response = yield call(updateProfileRequestApi, payload.payload);
    if (response)
      yield put(actions.UpdateProfileResponse(response));
  });

  //#endregion Manage Profile 

  //#region  Manage Tags
  yield takeLatest(actionTypes.GetTags, function* getTagRequested(payload) {
    const response = yield call(getTagsRequestedApi, payload.payload);
    yield put(actions.GetTagResponse(response));

  });

  yield takeLatest(actionTypes.GetInsuranceTypes, function* getInsuranceTypeRequested(payload) {
    const response = yield call(getInsuranceTypeRequestedApi, payload.payload);
    yield put(actions.GetInsuranceTypeResponse(response));

  });

  yield takeLatest(actionTypes.GetInsuranceTypeById, function* GetInsuranceTypeByIdRequest(payload) {
    const response = yield call(getInsuranceTypeByIdRequestedApi, payload.payload);
    yield put(actions.GetInsuranceTypeByIdResponse(response));

  });

  yield takeLatest(actionTypes.AddTag, function* addTagRequested(payload) {
    const response = yield call(addTagRequestApi, payload.payload);
    if (response)
      yield put(actions.AddTagResponse(response));
  });

  yield takeLatest(actionTypes.DeleteTagById, function* deleteTagRequested(payload) {
    const response = yield call(deleteTagRequestApi, payload.payload);
    if (response)
      yield put(actions.DeleteTagByIdResponse(response));
  });

  //#endregion Manage Tags

  //#region Manage Videos
  yield takeLatest(actionTypes.GetVideos, function* getVideosRequested(payload) {
    const response = yield call(getVdeosRequestedApi, payload.payload);
    yield put(actions.GetVideosResponse(response));

  });

  yield takeLatest(actionTypes.GetVideoById, function* GetVideoByIdRequest(payload) {
    const response = yield call(getVideoByIdRequestedApi, payload.payload);
    yield put(actions.GetVideoByIdResponse(response));

  });

  yield takeLatest(actionTypes.GetMasterTags, function* GetTagsRequested(payload) {
    const response = yield call(getmasterTagsRequestedApi, payload.payload);
    yield put(actions.GetMasterTagsResponse(response));

  });

  yield takeLatest(actionTypes.ResetVideo, function* ResetVideosRequested(payload) {

    yield put(actions.ResetVideoResponse(payload.payload.GetVideoByIdResponse));

  });

  yield takeLatest(actionTypes.AddEditVideo, function* addEditRequested(payload) {
    const response = yield call(addEditVideoRequestApi, payload.payload);
    if (response.status == 200) {
      yield put(actions.AddEditVideoResponse(response));
      sendNotificationApi(payload.payload)
      console.log('true');
    } else {
      console.log('fail');
    }
  });

  yield takeLatest(actionTypes.DeleteVideoById, function* deleteVideoRequested(payload) {
    const response = yield call(deleteVideoRequestApi, payload.payload);
    if (response)
      yield put(actions.DeleteVideoByIdResponse(response));
  });

  //#endregion End Manage Videos
}

//#region Manage Profile 
const getUserDataRequestApi = async (payload) => {
  var data = payload.userData;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.post(`${BASE_URL}Profile/GetUsers`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const getUseFavoriteVideoDataRequestApi = async (payload) => {
  debugger
  var data = payload.userFavoriteData;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.post(`${BASE_URL}video/FetchUserTagsVideos`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const updateProfileRequestApi = async (payload) => {
  var data = payload.profile;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.post(`${BASE_URL}Profile/EditProfile`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

//#endregion Manage Profile 
//#region Manage Tags
const addTagRequestApi = async (payload) => {
  var data = payload.tag;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.post(`${BASE_URL}Tag/addEditTag`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const getInsuranceTypeByIdRequestedApi = async (payload) => {
  var data = payload.RequestInsuranceTypeData;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.get(`${BASE_URL}Tag/GetTagById?inTagId=${data}`, options);
  return respo;
};


const getInsuranceTypeRequestedApi = async (payload) => {
  var data = payload.RequestParmInsuranceTypeName;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  //const respo = instance.get(`${BASE_URL}admin/InsuranceType/GetInsuranceTypes?InsuranceTypeName=${data}&stClientTimeZone=${usertimezone}`, options);
  const respo = instance.get(`${BASE_URL}Tag/FetchTags?stSearch=${data}`, options);
  return respo;
};

const getTagsRequestedApi = async (payload) => {
  var data = payload.RequestParmTag;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}Tag/FetchTags?stSearch=${data}`, options);
  return respo;
};


const getVdeosRequestedApi = async (payload) => {
  var data = payload.RequestParmVideo;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}video/FetchVideos?stSearch=${data}`, options);
  return respo;
};
const getVideoByIdRequestedApi = async (payload) => {
  var data = payload.RequestParmVideoByIdData;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}video/GetVideoById?inVideoId=${data}`, options);
  return respo;
};

const getmasterTagsRequestedApi = async (payload) => {
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}video/GetTags`, options);
  return respo;
};

const addEditVideoRequestApi = async (payload) => {
  var data = payload.addeditVideo;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }
  };
  const respo = instance.post(`${BASE_URL}video/saveVideo`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const deleteVideoRequestApi = async (payload) => {
  var data = payload.RequestParmDeleteVideoId;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.delete(`${BASE_URL}video/DeleteVideo?inVideoId=${data}`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};


const deleteTagRequestApi = async (payload) => {
  var data = payload.RequestParmDeleteTagId;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.delete(`${BASE_URL}Tag/DeleteTag?inTagId=${data}`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

//#endregion End Manage Tags

//#region 
const sendNotificationApi = async (payload) => {
  var data = payload.addeditVideo;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }
  };
  const respo = instance.post(`${BASE_URL}Notification/Send`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};
//#endregion