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

  // GetUseFavoriteVideoData: "[GetUseFavoriteVideoData] Action",
  // GetUseFavoriteVideoDataResponse: "[GetUseFavoriteVideoDataResponse] Action",

  UpdateProfile: "[UpdateProfile] Action",
  UpdateProfileResponse: "[UpdateProfileResponse] Action",
  //#endregion End Manage Profile

  //#region Manage Application
  AddApplication: "[AddApplication] Action",
  AddApplicationResponse: "[AddApplicationResponse] Action",

  GetApplication: "[GetApplication] Action",
  GetApplicationResponse: "[GetApplicationResponse] Action",

  DeleteApplicationById: "[DeleteApplicationById] Action",
  DeleteApplicationByIdResponse: "[DeleteApplicationByIdResponse] Action",

  GetApplicationInfoById: "[GetApplicationInfoById] Action",
  GetApplicationInfoByIdResponse: "[GetApplicationInfoByIdResponse] Action",
  //#endregion Manage Application 

  //#region Manage Image
  AddImage: "[AddImage] Action",
  AddImageResponse: "[AddImageResponse] Action",
  
  AddSubCategoryImage: "[AddSubCategoryImage] Action",
  AddSubCategoryImageResponse: "[AddSubCategoryImageResponse] Action",

  AddSubCategoryThumbnailImage: "[AddSubCategoryThumbnailImage] Action",
  AddSubCategoryThumbnailImageResponse: "[AddSubCategoryThumbnailImageResponse] Action",

  // GetApplication: "[GetApplication] Action",
  // GetApplicationResponse: "[GetApplicationResponse] Action",

  // DeleteApplicationById: "[DeleteApplicationById] Action",
  // DeleteApplicationByIdResponse: "[DeleteApplicationByIdResponse] Action",

  // GetApplicationInfoById: "[GetApplicationInfoById] Action",
  // GetApplicationInfoByIdResponse: "[GetApplicationInfoByIdResponse] Action",
  //#endregion Manage Image 

  //#region Manage Category
  AddCategory: "[AddCategory] Action",
  AddCategoryResponse: "[AddCategoryResponse] Action",

  GetCategory: "[GetCategory] Action",
  GetCategoryResponse: "[GetCategoryResponse] Action",

  GetCategoryById: "[GetCategoryById] Action",
  GetCategoryByIdResponse: "[GetCategoryByIdResponse] Action",
  
  GetCategoryInfoByID: "[GetCategoryInfoByID] Action",
  GetCategoryInfoByIDResponse: "[GetCategoryInfoByIDResponse] Action",

  DeleteCategoryById: "[DeleteCategoryById] Action",
  DeleteCategoryByIdResponse: "[DeleteCategoryByIdResponse] Action",

  //#endregion End Manage Category

  //#region Manage SubCategory

  AddSubCategory: "[AddSubCategory] Action",
  AddSubCategoryResponse: "[AddSubCategoryResponse] Action",

  GetSubCategory: "[GetSubCategory] Action",
  GetSubCategoryResponse: "[GetSubCategoryResponse] Action",

  DeleteSubCategoryById: "[DeleteSubCategoryById] Action",
  DeleteSubCategoryByIdResponse: "[DeleteSubCategoryByIdResponse] Action",

  GetSubCategoryInfoById: "[GetSubCategoryInfoById] Action",
  GetSubCategoryInfoByIdResponse: "[GetSubCategoryInfoByIdResponse] Action",

  //#endregion Manage SubCategory 

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

// const BASE_URL = "http://megaminds-001-site9.itempurl.com/api/";
const BASE_URL = "http://localhost:4200/api/"


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

      //#region Mange Image
      case actionTypes.AddImage: {
        debugger
        const { categoryImage } = action.payload;
        return { ...state, categoryImage };
      }
      case actionTypes.AddImageResponse: {
        debugger
        const imageResponse = action.payload.imageResponse.data && action.payload.imageResponse.data;
        return { ...state, imageResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }
      
      case actionTypes.AddSubCategoryThumbnailImage: {
        const { thumbnailImage } = action.payload;
        return { ...state, thumbnailImage };
      }
      case actionTypes.AddSubCategoryThumbnailImageResponse: {
        const thumbnailImageResponse = action.payload.thumbnailImageResponse.data && action.payload.thumbnailImageResponse.data;
        return { ...state, thumbnailImageResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }
      
      case actionTypes.AddSubCategoryImage: {
        const { subCategoryImage } = action.payload;
        return { ...state, subCategoryImage };
      }
      case actionTypes.AddSubCategoryImageResponse: {
        const subCategoryImageResponse = action.payload.subCategoryImageResponse.data && action.payload.subCategoryImageResponse.data;
        return { ...state, subCategoryImageResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }
      //#endregion Manage Image

      //#region Manage Application
      //--------------------------------------------------------//
      case actionTypes.AddApplication: {
        const { application } = action.payload;
        return { ...state, application };
      }
      case actionTypes.AddApplicationResponse: {
        const applicationResponse = action.payload.applicationResponse.data && action.payload.applicationResponse.data;
        return { ...state, applicationResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.GetApplication: {
        const { RequestParmApplication } = action.payload;
        return { ...state, RequestParmApplication };
      }
      case actionTypes.GetApplicationResponse: {
        const GetApplicationResponse = action.payload.GetApplicationResponse.data && action.payload.GetApplicationResponse.data;
        return { ...state, GetApplicationResponse };
      }

      case actionTypes.DeleteApplicationById: {
        const RequestParmDeleteApplicationId = action.payload;
        return { ...state, RequestParmDeleteApplicationId };
      }
      
      case actionTypes.DeleteApplicationByIdResponse: {
        const DeleteApplicationByIdResponse = action.payload.DeleteApplicationByIdResponse && action.payload.DeleteApplicationByIdResponse;
        return { ...state, DeleteApplicationByIdResponse };
      }
      //--------------------------------------------------------//

      //#endregion Manage Application

      //#region Manage Sub Category

      case actionTypes.AddSubCategory: {
        const { subCategory } = action.payload;
        return { ...state, subCategory };
      }
      case actionTypes.AddSubCategoryResponse: {
        const subCategoryResponse = action.payload.subCategoryResponse.data && action.payload.subCategoryResponse.data;
        return { ...state, subCategoryResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.GetSubCategory: {
        const { RequestParmSubCategory } = action.payload;
        return { ...state, RequestParmSubCategory };
      }
      case actionTypes.GetSubCategoryResponse: {
        const GetSubCategoryResponse = action.payload.GetSubCategoryResponse.data && action.payload.GetSubCategoryResponse.data;
        return { ...state, GetSubCategoryResponse };
      }

      case actionTypes.DeleteSubCategoryById: {
        const RequestParmDeleteSubCategoryId = action.payload;
        return { ...state, RequestParmDeleteSubCategoryId };
      }

      case actionTypes.DeleteSubCategoryByIdResponse: {
        const DeleteSubCategoryByIdResponse = action.payload.DeleteSubCategoryByIdResponse && action.payload.DeleteSubCategoryByIdResponse;
        return { ...state, DeleteSubCategoryByIdResponse };
      }

      case actionTypes.GetSubCategoryInfoByIdResponse: {
        const GetSubCategoryInfoByIdResponse = action.payload.GetSubCategoryInfoByIdResponse.data && action.payload.GetSubCategoryInfoByIdResponse.data;
        return { ...state, GetSubCategoryInfoByIdResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const GetSubCategoryInfoByIdResponse = action.payload.ResetInsuranceTypeResponse && action.payload.ResetInsuranceTypeResponse;
        return { ...state, GetSubCategoryInfoByIdResponse };
      }
//#endregion Manage Sub Category



      //#region  Manage Category
      //--------------------------------------------------------//
      case actionTypes.AddCategory: {
        const { category } = action.payload;
        return { ...state, category };
      }
      case actionTypes.AddCategoryResponse: {
        const categoryResponse = action.payload.categoryResponse.data && action.payload.categoryResponse.data;
        return { ...state, categoryResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      }

      case actionTypes.GetCategory: {
        const { RequestParmTag } = action.payload;
        return { ...state, RequestParmTag };
      }
      case actionTypes.GetCategoryResponse: {
        const GetCategoryResponse = action.payload.GetCategoryResponse.data && action.payload.GetCategoryResponse.data;
        return { ...state, GetCategoryResponse };
      }

      case actionTypes.GetCategoryById: {
        const { RequestParmInsuranceTypeData } = action.payload;
        return { ...state, RequestParmInsuranceTypeData };
      }
      case actionTypes.GetCategoryByIdResponse: {
        const getInsuranceTypeByIdResponse = action.payload.GetCategoryByIdResponse.data && action.payload.GetCategoryByIdResponse.data;
        return { ...state, getInsuranceTypeByIdResponse };
      }

       case actionTypes.DeleteCategoryById: {
        const RequestParmDeleteCategoryId = action.payload;
        return { ...state, RequestParmDeleteCategoryId };
      }

      case actionTypes.DeleteCategoryByIdResponse: {
        const DeleteCategoryByIdResponse = action.payload.DeleteCategoryByIdResponse && action.payload.DeleteCategoryByIdResponse;
        return { ...state, DeleteCategoryByIdResponse };
      }

      case actionTypes.GetCategoryInfoByIDResponse: {
        const GetCategoryInfoByIDResponse = action.payload.GetCategoryInfoByIDResponse.data && action.payload.GetCategoryInfoByIDResponse.data;
        return { ...state, GetCategoryInfoByIDResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const GetCategoryInfoByIDResponse = action.payload.ResetInsuranceTypeResponse && action.payload.ResetInsuranceTypeResponse;
        return { ...state, GetCategoryInfoByIDResponse };
      }

      case actionTypes.GetApplicationInfoByIdResponse: {
        const GetApplicationInfoByIdResponse = action.payload.GetApplicationInfoByIdResponse.data && action.payload.GetApplicationInfoByIdResponse.data;
        return { ...state, GetApplicationInfoByIdResponse };
      }

      // case actionTypes.ResetInsuranceTypeResponse: {

      //   const GetCategoryInfoByIDResponse = action.payload.ResetInsuranceTypeResponse && action.payload.ResetInsuranceTypeResponse;
      //   return { ...state, GetCategoryInfoByIDResponse };
      // }

      case actionTypes.GetInsuranceTypes: {
        const { RequestParmInsuranceTypeName } = action.payload;
        return { ...state, RequestParmInsuranceTypeName };
      }
      case actionTypes.GetInsuranceTypeResponse: {
        const GetInsuranceTypeResponse = action.payload.data && action.payload.data;
        return { ...state, GetInsuranceTypeResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const getInsuranceTypeByIdResponse = action.payload.ResetInsuranceTypeResponse && action.payload.ResetInsuranceTypeResponse;
        return { ...state, getInsuranceTypeByIdResponse };
      }
     
      //#endregion End Manage Category

      //#region Manage Videos
      // case actionTypes.GetVideos: {
      //   const { RequestParmVideo } = action.payload;
      //   return { ...state, RequestParmVideo };
      // }

      // case actionTypes.GetVideosResponse: {
      //   const GetVideosResponse = action.payload.GetVideosResponse.data && action.payload.GetVideosResponse.data;
      //   return { ...state, GetVideosResponse };
      // }

      // case actionTypes.GetVideoById: {
      //   const { RequestParmVideoByIdData } = action.payload;
      //   return { ...state, RequestParmVideoByIdData };
      // }

      // case actionTypes.GetVideoByIdResponse: {
      //   const GetVideoByIdResponse = action.payload.GetVideoByIdResponse.data && action.payload.GetVideoByIdResponse.data;
      //   return { ...state, GetVideoByIdResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      // }


      // case actionTypes.GetMasterTags: {
      //   const { RequestParmTagData } = action.payload;
      //   return { ...state, RequestParmTagData };
      // }

      // case actionTypes.GetMasterTagsResponse: {
      //   const GetMasterTagsResponse = action.payload.GetMasterTagsResponse.data && action.payload.GetMasterTagsResponse.data;
      //   return { ...state, GetMasterTagsResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      // }

      // case actionTypes.ResetVideo: {
      //   const { ResetVideo } = action.payload;
      //   return { ...state, ResetVideo };
      // }


      // case actionTypes.ResetVideo: {
      //   const { ResetVideo } = action.payload;
      //   return { ...state, ResetVideo };
      // }

      // case actionTypes.ResetVideoResponse: {

      //   const GetVideoByIdResponse = action.payload.ResetVideoResponse && action.payload.ResetVideoResponse;
      //   return { ...state, GetVideoByIdResponse };
      // }


      // case actionTypes.AddEditVideo: {
      //   const { addeditVideo } = action.payload;
      //   return { ...state, addeditVideo };
      // }
      // case actionTypes.AddEditVideoResponse: {
      //   const addEditVideoResponse = action.payload.addEditVideoResponse.data && action.payload.addEditVideoResponse.data;
      //   return { ...state, addEditVideoResponse, randomNumbers: 1 + Math.random() * (100 - 1) };
      // }


      // case actionTypes.DeleteVideoById: {
      //   const RequestParmDeleteVideoId = action.payload;
      //   return { ...state, RequestParmDeleteVideoId };
      // }

      // case actionTypes.DeleteVideoByIdResponse: {
      //   const DeleteVideoByIdResponse = action.payload.DeleteVideoByIdResponse && action.payload.DeleteVideoByIdResponse;
      //   return { ...state, DeleteVideoByIdResponse };
      // }
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

  // SaveCarrier: (carrier) => ({ type: actionTypes.SaveCarrier, payload: { carrier } }),
  // SaveCarrierResponse: (carrierResponse) => ({ type: actionTypes.SaveCarrierResponse, payload: { carrierResponse } }),

  // UpdateCarrier: (carrier) => ({ type: actionTypes.UpdateCarrier, payload: { carrier } }),
  // UpdateCarrierResponse: (UpdateCarrierResponse) => ({ type: actionTypes.UpdateCarrierResponse, payload: { UpdateCarrierResponse } }),

  // SaveRewardSetting: (RewardSetting) => ({ type: actionTypes.SaveRewardSetting, payload: { RewardSetting } }),
  // SaveRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.SaveRewardSettingResponse, payload: { RewardSettingResponse } }),

  SaveProfile: (ProfileSetting) => ({ type: actionTypes.SaveProfile, payload: { ProfileSetting } }),
  SaveProfileResponse: (SaveProfileResponse) => ({ type: actionTypes.SaveProfileResponse, payload: { SaveProfileResponse } }),

  // ResetRewardSetting: (RewardSetting) => ({ type: actionTypes.ResetRewardSetting, payload: { RewardSetting } }),
  // ResetRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.ResetRewardSettingResponse, payload: { RewardSettingResponse } }),

  // GetRewardSetting: (RewardSetting) => ({ type: actionTypes.GetRewardSetting, payload: { RewardSetting } }),
  // GetRewardSettingResponse: (RewardSettingResponse) => ({ type: actionTypes.GetRewardSettingResponse, payload: { RewardSettingResponse } }),

  // GetCarrier: (RequestParmCarrierName) => ({ type: actionTypes.GetCarrier, payload: { RequestParmCarrierName } }),
  // GetCarrierResponse: (getCarrierResponse) => ({ type: actionTypes.GetCarrierResponse, payload: { getCarrierResponse } }),

  // GetCarrierById: (RequestParmCarrierData) => ({ type: actionTypes.GetCarrierById, payload: { RequestParmCarrierData } }),
  // GetCarrierByIdResponse: (getCarrierByIdResponse) => ({ type: actionTypes.GetCarrierByIdResponse, payload: { getCarrierByIdResponse } }),

  // ResetCarrier: (ResetCarrier) => ({ type: actionTypes.ResetCarrier, payload: { ResetCarrier } }),
  // ResetCarrierResponse: (ResetCarrierResponse) => ({ type: actionTypes.ResetCarrierResponse, payload: { ResetCarrierResponse } }),

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

  // GetUseFavoriteVideoData: (userFavoriteData) => ({ type: actionTypes.GetUseFavoriteVideoData, payload: { userFavoriteData } }),
  // GetUseFavoriteVideoDataResponse: (GetUseFavoriteVideoDataResponse) => ({ type: actionTypes.GetUseFavoriteVideoDataResponse, payload: { GetUseFavoriteVideoDataResponse } }),

  UpdateProfile: (profile) => ({ type: actionTypes.UpdateProfile, payload: { profile } }),
  UpdateProfileResponse: (updateResponse) => ({ type: actionTypes.UpdateProfileResponse, payload: { updateResponse } }),
  //#endregion Manage Profile

  //#region Manage Application
  AddApplication: (application) => ({ type: actionTypes.AddApplication, payload: { application } }),
  AddApplicationResponse: (applicationResponse) => ({ type: actionTypes.AddApplicationResponse, payload: { applicationResponse } }),

  GetApplication: (RequestParmApplication) => ({ type: actionTypes.GetApplication, payload: { RequestParmApplication } }),
  GetApplicationResponse: (GetApplicationResponse) => ({ type: actionTypes.GetApplicationResponse, payload: { GetApplicationResponse } }),

  DeleteApplicationById: (RequestParmDeleteApplicationId) => ({ type: actionTypes.DeleteApplicationById, payload: { RequestParmDeleteApplicationId } }),
  DeleteApplicationByIdResponse: (DeleteApplicationByIdResponse) => ({ type: actionTypes.DeleteApplicationByIdResponse, payload: { DeleteApplicationByIdResponse } }),

  GetApplicationInfoById: (RequestApplicationInfoByID) => ({ type: actionTypes.GetApplicationInfoById, payload: { RequestApplicationInfoByID } }),
  GetApplicationInfoByIdResponse: (GetApplicationInfoByIdResponse) => ({ type: actionTypes.GetApplicationInfoByIdResponse, payload: { GetApplicationInfoByIdResponse } }),
  //#endregion Manage Application
  
  //#region Manage Image
  AddImage: (categoryImage) => ({ type: actionTypes.AddImage, payload: { categoryImage } }),
  AddImageResponse: (imageResponse) => ({ type: actionTypes.AddImageResponse, payload: { imageResponse } }),

  AddSubCategoryThumbnailImage: (thumbnailImage) => ({ type: actionTypes.AddSubCategoryThumbnailImage, payload: { thumbnailImage } }),
  AddSubCategoryThumbnailImageResponse: (thumbnailImageResponse) => ({ type: actionTypes.AddImageResponse, payload: { thumbnailImageResponse } }),

  AddSubCategoryImage: (subCategoryImage) => ({ type: actionTypes.AddSubCategoryImage, payload: { subCategoryImage } }),
  AddSubCategoryImageResponse: (subCategoryImageResponse) => ({ type: actionTypes.AddSubCategoryImageResponse, payload: { subCategoryImageResponse } }),
  //#endregion Manage Image

  //#region Manage Sub Category
  AddSubCategory: (subCategory) => ({ type: actionTypes.AddSubCategory, payload: { subCategory } }),
  AddSubCategoryResponse: (subCategoryResponse) => ({ type: actionTypes.AddSubCategoryResponse, payload: { subCategoryResponse } }),

  GetSubCategory: (RequestParmSubCategory) => ({ type: actionTypes.GetSubCategory, payload: { RequestParmSubCategory } }),
  GetSubCategoryResponse: (GetSubCategoryResponse) => ({ type: actionTypes.GetSubCategoryResponse, payload: { GetSubCategoryResponse } }),

  DeleteSubCategoryById: (RequestParmDeleteSubCategoryId) => ({ type: actionTypes.DeleteSubCategoryById, payload: { RequestParmDeleteSubCategoryId } }),
  DeleteSubCategoryByIdResponse: (DeleteSubCategoryByIdResponse) => ({ type: actionTypes.DeleteSubCategoryByIdResponse, payload: { DeleteSubCategoryByIdResponse } }),

  GetSubCategoryInfoById: (RequestSubCategoryInfoById) => ({ type: actionTypes.GetSubCategoryInfoById, payload: { RequestSubCategoryInfoById } }),
  GetSubCategoryInfoByIdResponse: (GetSubCategoryInfoByIdResponse) => ({ type: actionTypes.GetSubCategoryInfoByIdResponse, payload: { GetSubCategoryInfoByIdResponse } }),
  //#endregion Manage Sub Category

  //#region  Manage Category
  AddCategory: (category) => ({ type: actionTypes.AddCategory, payload: { category } }),
  AddCategoryResponse: (categoryResponse) => ({ type: actionTypes.AddCategoryResponse, payload: { categoryResponse } }),

  GetCategory: (RequestParmTag) => ({ type: actionTypes.GetCategory, payload: { RequestParmTag } }),
  GetCategoryResponse: (GetCategoryResponse) => ({ type: actionTypes.GetCategoryResponse, payload: { GetCategoryResponse } }),

  GetInsuranceTypes: (RequestParmInsuranceTypeName) => ({ type: actionTypes.GetInsuranceTypes, payload: { RequestParmInsuranceTypeName } }),
  GetInsuranceTypeResponse: (GetInsuranceTypeResponse) => ({ type: actionTypes.GetInsuranceTypeResponse, payload: { GetInsuranceTypeResponse } }),

  GetCategoryById: (RequestCategoryData) => ({ type: actionTypes.GetCategoryById, payload: { RequestCategoryData } }),
  GetCategoryByIdResponse: (GetCategoryByIdResponse) => ({ type: actionTypes.GetCategoryByIdResponse, payload: { GetCategoryByIdResponse } }),

  DeleteCategoryById: (RequestParmDeleteCategoryId) => ({ type: actionTypes.DeleteCategoryById, payload: { RequestParmDeleteCategoryId } }),
  DeleteCategoryByIdResponse: (DeleteCategoryByIdResponse) => ({ type: actionTypes.DeleteCategoryByIdResponse, payload: { DeleteCategoryByIdResponse } }),

  GetCategoryInfoByID: (RequestApplicationInfoByID) => ({ type: actionTypes.GetCategoryInfoByID, payload: { RequestApplicationInfoByID } }),
  GetCategoryInfoByIDResponse: (GetCategoryInfoByIDResponse) => ({ type: actionTypes.GetCategoryInfoByIDResponse, payload: { GetCategoryInfoByIDResponse } }),
  //#endregion End Manage Category

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

  // yield takeLatest(actionTypes.GetUseFavoriteVideoData, function* getUseFavoriteVideoDataRequested(payload) {
  //   const response = yield call(getUseFavoriteVideoDataRequestApi, payload.payload);
  //   console.log(response)
  //   if (response)
  //     yield put(actions.GetUseFavoriteVideoDataResponse(response));
  // });

  yield takeLatest(actionTypes.UpdateProfile, function* updateProfileRequested(payload) {
    const response = yield call(updateProfileRequestApi, payload.payload);
    if (response)
      yield put(actions.UpdateProfileResponse(response));
  });

  //#endregion Manage Profile 

  //#region  Manage Category
  yield takeLatest(actionTypes.GetCategory, function* getCategoryRequested(payload) {
    const response = yield call(getCategoryRequestedApi, payload.payload);
    yield put(actions.GetCategoryResponse(response));
  });

  yield takeLatest(actionTypes.GetCategoryInfoByID, function* GetCategoryInfoByIDRequest(payload) {
    const response = yield call(GetCategoryInfoByIDRequestedApi, payload.payload);
    yield put(actions.GetCategoryInfoByIDResponse(response));

  });

  yield takeLatest(actionTypes.GetCategoryById, function* GetInsuranceTypeByIdRequest(payload) {
    const response = yield call(getCategoryByIdRequestedApi, payload.payload);
    yield put(actions.GetCategoryByIdResponse(response));
  });

  yield takeLatest(actionTypes.AddCategory, function* addCategoryRequested(payload) {
    const response = yield call(addCategoryRequestApi, payload.payload);
    if (response)
      yield put(actions.AddCategoryResponse(response));
  });

  yield takeLatest(actionTypes.DeleteCategoryById, function* deleteTagRequested(payload) {
    const response = yield call(deleteCategoryApi, payload.payload);
    if (response)
      yield put(actions.DeleteCategoryByIdResponse(response));
  });

  //#endregion Manage Category

  //#region Manage Image 
  yield takeLatest(actionTypes.AddImage, function* addImageRequested(payload) {
    const response = yield call(addCategoryImageRequestApi, payload.payload);
    if (response)
      yield put(actions.AddImageResponse(response));
  });
 
  yield takeLatest(actionTypes.AddSubCategoryThumbnailImage, function* addSubCategoryThumbnailImageRequested(payload) {
    const response = yield call(addSubCategoryThumbnailImageRequestApi, payload.payload);
    if (response)
      yield put(actions.AddSubCategoryThumbnailImageResponse(response));
  });
 
  yield takeLatest(actionTypes.AddSubCategoryImage, function* addSubCategoryImageRequested(payload) {
    const response = yield call(addSubCategoryImageRequestApi, payload.payload);
    if (response)
      yield put(actions.AddSubCategoryImageResponse(response));
  });
  //#endregion Manage Image

  //#region Manage Application
  yield takeLatest(actionTypes.AddApplication, function* addApplicationRequested(payload) {
    const response = yield call(addApplicationRequestApi, payload.payload);
    if (response)
      yield put(actions.AddApplicationResponse(response));
  });

  yield takeLatest(actionTypes.GetApplication, function* getApplicationRequested(payload) {
    const response = yield call(getApplicationRequestedApi, payload.payload);
    yield put(actions.GetApplicationResponse(response));
  });

  yield takeLatest(actionTypes.DeleteApplicationById, function* deleteTagRequested(payload) {
    const response = yield call(deleteApplicationApi, payload.payload);
    if (response)
      yield put(actions.DeleteApplicationByIdResponse(response));
  });

  yield takeLatest(actionTypes.GetApplicationInfoById, function* GetApplicationInfoByIDRequest(payload) {
    const response = yield call(GetApplicationInfoByIDRequestedApi, payload.payload);
    yield put(actions.GetApplicationInfoByIdResponse(response));
  });
  //#endregion Mange Application

  //#region Manage Sub Category
  yield takeLatest(actionTypes.AddSubCategory, function* addSubCategoryRequested(payload) {
    const response = yield call(addSubCategoryRequestApi, payload.payload);
    if (response)
      yield put(actions.AddSubCategoryResponse(response));
  });
  yield takeLatest(actionTypes.GetSubCategory, function* getSubCategoryRequested(payload) {
    const response = yield call(getSubCategoryRequestedApi, payload.payload);
    yield put(actions.GetSubCategoryResponse(response));
  });

  yield takeLatest(actionTypes.DeleteSubCategoryById, function* deleteSubCategoryRequested(payload) {
    const response = yield call(deleteSubCategoryApi, payload.payload);
    if (response)
      yield put(actions.DeleteSubCategoryByIdResponse(response));
  });

  yield takeLatest(actionTypes.GetSubCategoryInfoById, function* GetSubCategoryInfoByIDRequest(payload) {
    const response = yield call(GetSubCategoryInfoByIDRequestedApi, payload.payload);
    yield put(actions.GetSubCategoryInfoByIdResponse(response));
  });
  //#endregion Mange Sub Category

  yield takeLatest(actionTypes.ResetVideo, function* ResetVideosRequested(payload) {

    yield put(actions.ResetVideoResponse(payload.payload.GetVideoByIdResponse));

  });
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
//#region Manage Category
const addCategoryRequestApi = async (payload) => {
  var data = payload.category;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.post(`${BASE_URL}Category/addEditCategory`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const getCategoryRequestedApi = async (payload) => {
  // var data = payload.RequestParmTag;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}Category/GetAllCategory`, options);
  return respo;
};

const getCategoryByIdRequestedApi = async (payload) => {
  var data = payload.RequestCategoryData;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
  };
  const respo = instance.get(`${BASE_URL}Category/GetAllCategory`, options);
  return respo;
};

const deleteCategoryApi = async (payload) => {
  var data = payload.RequestParmDeleteCategoryId;
  console.log(data,"::::::::");
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.delete(`${BASE_URL}Category/DeleteCategory?inCategoryId=${data}&inModifiedBy=22`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetCategoryInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestApplicationInfoByID;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.get(`${BASE_URL}Category/GetCategoryById?inCategoryId=${data}`, options);
  console.log(respo,">>>>>");
  return respo;
};



//#endregion End Manage Category

//#region 
// const sendNotificationApi = async (payload) => {
//   var data = payload.addeditVideo;
//   const instance = await axios.create({
//   });
//   const options = {
//     headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).token}` }
//     //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }
//   };
//   const respo = instance.post(`${BASE_URL}Notification/Send`, data, options)
//     .catch((e) => {
//       return e.response;
//     });
//   return respo;
// };
//#endregion

//#region Manage Image
const addCategoryImageRequestApi = async (payload) => {
  debugger
  var data = payload.categoryImage;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  console.log(data,"????????????");
  const respo = instance.post(`${BASE_URL}Image/addEditImage`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

const addSubCategoryImageRequestApi = async (payload) => {
  var data = payload.subCategoryImage;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.post(`${BASE_URL}Image/addEditSubCategroyImage`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const addSubCategoryThumbnailImageRequestApi = async (payload) => {
  debugger
  var data = payload.thumbnailImage;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  console.log(data,"????????????");
  const respo = instance.post(`${BASE_URL}Image/AddEditSubCategoryThumbnailImage`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

//#endregion Manage Image
//#region Manage Application
const addApplicationRequestApi = async (payload) => {
  var data = payload.application;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.post(`${BASE_URL}Application/addEditApplication`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

const getApplicationRequestedApi = async (payload) => {
  // var data = payload.RequestParmTag;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}Application/GetAllApplication`, options);
  return respo;
};

const deleteApplicationApi = async (payload) => {
  var data = payload.RequestParmDeleteApplicationId;
  console.log(data,"::::::::");
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.delete(`${BASE_URL}Application/DeleteApplication?inApplicationId=${data}&inModifiedBy=22`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetApplicationInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestApplicationInfoByID;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.get(`${BASE_URL}Application/GetApplicationById?inApplicationId=${data}`, options);
  console.log(respo,">>>>>");
  return respo;
};
//#endregion Manage Application

//#region Manage Sub Category
const addSubCategoryRequestApi = async (payload) => {
  var data = payload.subCategory;
  console.log(data,"????????????");
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.post(`${BASE_URL}SubCategory/addEditSubCategory`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

const getSubCategoryRequestedApi = async (payload) => {
  debugger
  var data = payload.GetSubCategoryResponse;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}SubCategory/GetAllSubCategory`, options);
  return respo;
};

const deleteSubCategoryApi = async (payload) => {
  var data = payload.RequestParmDeleteSubCategoryId;
  console.log(data,"::::::::");
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.delete(`${BASE_URL}SubCategory/DeleteSubCategory?inSubCategoryId=${data}&inModifiedBy=22`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetSubCategoryInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestSubCategoryInfoById;
  const instance = await axios.create({
  });
  const options = {
    headers: { 'authorization': `Bearer ${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).data.token}` }
  };
  const respo = instance.get(`${BASE_URL}SubCategory/GetSubCategoryById?inSubCategoryId=${data}`, options);
  console.log(respo,">>>>>");
  return respo;
};
//#endregion Manage Sub Category