import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { call, put, takeLatest } from "redux-saga/effects";
// import { getUserByToken } from "./authCrud";
import axios from "axios";
import { any } from "prop-types";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  // UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  //#region  Insurance Type

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

  GetAdminUserData: "[GetAdminUserData] Action",
  GetAdminUserDataResponse: "[GetAdminUserDataResponse] Action",

  GetUseFavoriteVideoData: "[GetUseFavoriteVideoData] Action",
  GetUseFavoriteVideoDataResponse: "[GetUseFavoriteVideoDataResponse] Action",

  GetAdminUserById: "[GetAdminUserById] Action",
  GetAdminUserByIdResponse: "[GetAdminUserByIdResponse] Action",

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

  //#region Manage Image Test -------------------------------
  AddImageTest: "[AddImageTest] Action",
  AddImageResponseTest: "[AddImageResponseTest] Action",
  //#region Manage Image Test -------------------------------

  //#region Manage Image
  AddImage: "[AddImage] Action",
  AddImageResponse: "[AddImageResponse] Action",

  AddSubCategoryImage: "[AddSubCategoryImage] Action",
  AddSubCategoryImageResponse: "[AddSubCategoryImageResponse] Action",

  AddSubCategoryImageNotification: "[AddSubCategoryImageNotification] Action",
  AddSubCategoryImageNotificationResponse:
    "[AddSubCategoryImageNotificationResponse] Action",

  AddSubCategoryThumbnailImage: "[AddSubCategoryThumbnailImage] Action",
  AddSubCategoryThumbnailImageResponse:
    "[AddSubCategoryThumbnailImageResponse] Action",

  GetImageByCategory: "[GetImageByCategory] Action",
  GetImageByCategoryResponse: "[GetImageByCategoryResponse] Action",

  GetImageBySubCategory: "[GetImageByCatGetImageBySubCategoryegory] Action",
  GetImageBySubCategoryResponse: "[GetImageBySubCategoryResponse] Action",

  // DeleteApplicationById: "[DeleteApplicationById] Action",
  // DeleteApplicationByIdResponse: "[DeleteApplicationByIdResponse] Action",

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

  DeleteCategoryImage: "[DeleteCategoryImage] Action",
  DeleteCategoryImageResponse: "[DeleteCategoryImageResponse] Action",

  DeleteSubCategoryImage: "[DeleteSubCategoryImage] Action",
  DeleteSubCategoryImageResponse: "[DeleteSubCategoryImageResponse] Action",

  UpdateCategoryPriority: "[UpdateCategoryPriority] Action",
  UpdateCategoryPriorityResponse: "[UpdateCategoryPriorityResponse] Action",

  CheckCategoryPriority: "[CheckCategoryPriority] Action",
  CheckCategoryPriorityResponse: "[CheckCategoryPriorityResponse] Action",

  UpdateCategoryStatus: "[UpdateCategoryStatus] Action",
  UpdateCategoryStatusResponse: "[UpdateCategoryStatusResponse] Action",

  //#endregion End Manage Category

  AddAdminUser: "[AddAdminUser] Action",
  AddAdminUserResponse: "[AddAdminUserResponse] Action",

  //#region Manage SubCategory

  AddSubCategory: "[AddSubCategory] Action",
  AddSubCategoryResponse: "[AddSubCategoryResponse] Action",

  GetSubCategory: "[GetSubCategory] Action",
  GetSubCategoryResponse: "[GetSubCategoryResponse] Action",

  GetSubCategoryData: "[GetSubCategoryData] Action",
  GetSubCategoryDataResponse: "[GetSubCategoryDataResponse] Action",

  DeleteSubCategoryById: "[DeleteSubCategoryById] Action",
  DeleteSubCategoryByIdResponse: "[DeleteSubCategoryByIdResponse] Action",

  DeleteSubCategoryByCategoryId: "[DeleteSubCategoryByCategoryId] Action",
  DeleteSubCategoryByCategoryIdResponse:
    "[DeleteSubCategoryByCategoryIdResponse] Action",

  GetSubCategoryInfoById: "[GetSubCategoryInfoById] Action",
  GetSubCategoryInfoByIdResponse: "[GetSubCategoryInfoByIdResponse] Action",

  GetSubCategoryByCategoryId: "[GetSubCategoryByCategoryId] Action",
  GetSubCategoryByCategoryIdResponse:
    "[GetSubCategoryByCategoryIdResponse] Action",

  CheckSubCategory: "[CheckSubCategory] Action",
  CheckSubCategoryResponse: "[CheckSubCategoryResponse] Action",

  UpdateSubCategoryPriority: "[UpdateSubCategoryPriority] Action",
  UpdateSubCategoryPriorityResponse:
    "[UpdateSubCategoryPriorityResponse] Action",

  CheckSubCategoryPriority: "[CheckSubCategoryPriority] Action",
  CheckSubCategoryPriorityResponse: "[CheckSubCategoryPriorityResponse] Action",

  UpdateSubCategoryStatus: "[UpdateSubCategoryStatus] Action",
  UpdateSubCategoryStatusResponse: "[UpdateSubCategoryStatusResponse] Action",

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

const BASE_URL = "http://megaminds-001-site12.itempurl.com/api/";
// const BASE_URL = "http://localhost:4200/api/"

const initialAuthState = {
  user: undefined,
  authToken: undefined,
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
        const carrierResponse =
          action.payload.carrierResponse.data &&
          action.payload.carrierResponse.data;
        return {
          ...state,
          carrierResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.UpdateCarrier: {
        const { carrier } = action.payload;
        return { ...state, carrier };
      }

      case actionTypes.UpdateCarrierResponse: {
        const UpdateCarrierResponse =
          action.payload.UpdateCarrierResponse.data &&
          action.payload.UpdateCarrierResponse.data;
        return {
          ...state,
          UpdateCarrierResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.GetCarrier: {
        const { RequestParmCarrierName } = action.payload;
        return { ...state, RequestParmCarrierName };
      }

      case actionTypes.GetCarrierResponse: {
        const getCarrierResponse =
          action.payload.getCarrierResponse.data &&
          action.payload.getCarrierResponse.data;
        return { ...state, getCarrierResponse };
      }

      case actionTypes.GetCarrierById: {
        const { RequestParmCarrierData } = action.payload;
        return { ...state, RequestParmCarrierData };
      }

      case actionTypes.GetCarrierByIdResponse: {
        const getCarrierByIdResponse =
          action.payload.getCarrierByIdResponse.data &&
          action.payload.getCarrierByIdResponse.data;
        return { ...state, getCarrierByIdResponse };
      }

      case actionTypes.ResetCarrier: {
        const { ResetCarrier } = action.payload;
        return { ...state, ResetCarrier };
      }

      case actionTypes.ResetCarrierResponse: {
        const getCarrierByIdResponse =
          action.payload.ResetCarrierResponse &&
          action.payload.ResetCarrierResponse;
        return { ...state, getCarrierByIdResponse };
      }

      // for the delete carrier
      case actionTypes.DeleteCarrierById: {
        const RequestParmuiCarrier = action.payload;
        return { ...state, RequestParmuiCarrier };
      }

      case actionTypes.DeleteCarrierByIdResponse: {
        const DeleteCarrierByIdResponse =
          action.payload.DeleteCarrierByIdResponse &&
          action.payload.DeleteCarrierByIdResponse;
        return { ...state, DeleteCarrierByIdResponse };
      }

      //#endregion Manage Carrier

      //#region Manage User
      case actionTypes.GetErrorlogs: {
        const { RequestParmUserData } = action.payload;
        return { ...state, RequestParmUserData };
      }

      case actionTypes.GetErrorlogsResponse: {
        const GetErrorlogsResponse =
          action.payload.GetErrorlogsResponse.data &&
          action.payload.GetErrorlogsResponse.data;
        return { ...state, GetErrorlogsResponse };
      }

      case actionTypes.GetUserById: {
        const { RequestParmUserByIdData } = action.payload;
        return { ...state, RequestParmUserByIdData };
      }

      case actionTypes.GetUserByIdResponse: {
        const GetUserByIdResponse =
          action.payload.GetUserByIdResponse.data &&
          action.payload.GetUserByIdResponse.data;
        return { ...state, GetUserByIdResponse };
      }

      case actionTypes.GetUserPaymentMethods: {
        const { RequestParmUserPaymentMethodsData } = action.payload;
        return { ...state, RequestParmUserPaymentMethodsData };
      }

      case actionTypes.GetUserPaymentMethodsResponse: {
        const GetUserPaymentMethodsResponse =
          action.payload.GetUserPaymentMethodsResponse.data &&
          action.payload.GetUserPaymentMethodsResponse.data;
        return { ...state, GetUserPaymentMethodsResponse };
      }

      //#endregion

      //#region Manage Profile

      case actionTypes.GetUserData: {
        const { userData } = action.payload;
        return { ...state, userData };
      }
      case actionTypes.GetUserDataResponse: {
        const GetUserDataResponse =
          action.payload.GetUserDataResponse.data &&
          action.payload.GetUserDataResponse.data;
        return { ...state, GetUserDataResponse };
      }

      case actionTypes.GetAdminUserData: {
        const { adminUserData } = action.payload;
        return { ...state, adminUserData };
      }
      case actionTypes.GetAdminUserDataResponse: {
        const GetAdminUserDataResponse =
          action.payload.GetAdminUserDataResponse.data &&
          action.payload.GetAdminUserDataResponse.data;
        return { ...state, GetAdminUserDataResponse };
      }

      case actionTypes.GetUseFavoriteVideoData: {
        const { userFavoriteData } = action.payload;
        return { ...state, userFavoriteData };
      }
      case actionTypes.GetUseFavoriteVideoDataResponse: {
        const GetUseFavoriteVideoDataResponse =
          action.payload.GetUseFavoriteVideoDataResponse.data &&
          action.payload.GetUseFavoriteVideoDataResponse.data;
        return { ...state, GetUseFavoriteVideoDataResponse };
      }

      case actionTypes.GetAdminUserById: {
        const { getAdminUserById } = action.payload;
        return { ...state, getAdminUserById };
      }
      case actionTypes.GetAdminUserByIdResponse: {
        const GetAdminUserByIdResponse =
          action.payload.GetAdminUserByIdResponse.data &&
          action.payload.GetAdminUserByIdResponse.data;
        return { ...state, GetAdminUserByIdResponse };
      }

      case actionTypes.UpdateProfile: {
        const { profile } = action.payload;
        return { ...state, profile };
      }
      case actionTypes.UpdateProfileResponse: {
        const updateResponse =
          action.payload.updateResponse.data &&
          action.payload.updateResponse.data;
        return {
          ...state,
          updateResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }
      //#endregion End Manage Profile

      //#region Mange Image
      case actionTypes.AddImageTest: {
        const { categoryImageTest } = action.payload;
        return { ...state, categoryImageTest };
      }
      case actionTypes.AddImageResponseTest: {
        const imageResponseTest =
          action.payload.imageResponseTest.data &&
          action.payload.imageResponseTest.data;
        return {
          ...state,
          imageResponseTest,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      //#region Mange Image
      case actionTypes.AddImage: {
        const { categoryImage } = action.payload;
        return { ...state, categoryImage };
      }
      case actionTypes.AddImageResponse: {
        const imageResponse =
          action.payload.imageResponse.data &&
          action.payload.imageResponse.data;
        return {
          ...state,
          imageResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.AddSubCategoryThumbnailImage: {
        const { thumbnailImage } = action.payload;
        return { ...state, thumbnailImage };
      }
      case actionTypes.AddSubCategoryThumbnailImageResponse: {
        const thumbnailImageResponse =
          action.payload.thumbnailImageResponse.data &&
          action.payload.thumbnailImageResponse.data;
        return {
          ...state,
          thumbnailImageResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.AddSubCategoryImage: {
        const { subCategoryImage } = action.payload;
        return { ...state, subCategoryImage };
      }
      case actionTypes.AddSubCategoryImageResponse: {
        const subCategoryImageResponse =
          action.payload.subCategoryImageResponse.data &&
          action.payload.subCategoryImageResponse.data;
        return {
          ...state,
          subCategoryImageResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.AddSubCategoryImageNotification: {
        const { addSubCategoryImageNotification } = action.payload;
        return { ...state, addSubCategoryImageNotification };
      }
      case actionTypes.AddSubCategoryImageNotificationResponse: {
        const addSubCategoryImageNotificationResponse =
          action.payload.addSubCategoryImageNotificationResponse.data &&
          action.payload.addSubCategoryImageNotificationResponse.data;
        return {
          ...state,
          addSubCategoryImageNotificationResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }
      //#endregion Manage Image

      //#region Manage Application
      //--------------------------------------------------------//
      case actionTypes.AddApplication: {
        const { application } = action.payload;
        return { ...state, application };
      }
      case actionTypes.AddApplicationResponse: {
        const applicationResponse =
          action.payload.applicationResponse.data &&
          action.payload.applicationResponse.data;
        return {
          ...state,
          applicationResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.GetApplication: {
        const { RequestParmApplication } = action.payload;
        return { ...state, RequestParmApplication };
      }
      case actionTypes.GetApplicationResponse: {
        const GetApplicationResponse =
          action.payload.GetApplicationResponse.data &&
          action.payload.GetApplicationResponse.data;
        return { ...state, GetApplicationResponse };
      }

      case actionTypes.DeleteApplicationById: {
        const RequestParmDeleteApplicationId = action.payload;
        return { ...state, RequestParmDeleteApplicationId };
      }

      case actionTypes.DeleteApplicationByIdResponse: {
        const DeleteApplicationByIdResponse =
          action.payload.DeleteApplicationByIdResponse &&
          action.payload.DeleteApplicationByIdResponse;
        return { ...state, DeleteApplicationByIdResponse };
      }
      //--------------------------------------------------------//

      //#endregion Manage Application

      case actionTypes.AddAdminUser: {
        const { addAdminUser } = action.payload;
        return { ...state, addAdminUser };
      }
      case actionTypes.AddAdminUserResponse: {
        const addAdminUserResponse =
          action.payload.addAdminUserResponse.data &&
          action.payload.addAdminUserResponse.data;
        return {
          ...state,
          addAdminUserResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      //#region Manage Sub Category

      case actionTypes.AddSubCategory: {
        const { subCategory } = action.payload;
        return { ...state, subCategory };
      }
      case actionTypes.AddSubCategoryResponse: {
        const subCategoryResponse =
          action.payload.subCategoryResponse.data &&
          action.payload.subCategoryResponse.data;
        return {
          ...state,
          subCategoryResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.GetSubCategory: {
        const { RequestParmSubCategory } = action.payload;
        return { ...state, RequestParmSubCategory };
      }
      case actionTypes.GetSubCategoryResponse: {
        const GetSubCategoryResponse =
          action.payload.GetSubCategoryResponse.data &&
          action.payload.GetSubCategoryResponse.data;
        return { ...state, GetSubCategoryResponse };
      }

      case actionTypes.GetSubCategoryData: {
        const { getSubCategoryData } = action.payload;
        return { ...state, getSubCategoryData };
      }
      case actionTypes.GetSubCategoryDataResponse: {
        const getSubCategoryDataResponse =
          action.payload.getSubCategoryDataResponse.data &&
          action.payload.getSubCategoryDataResponse.data;
        return { ...state, getSubCategoryDataResponse };
      }

      case actionTypes.GetSubCategoryByCategoryId: {
        const { getSubCategoryByCategoryId } = action.payload;
        return { ...state, getSubCategoryByCategoryId };
      }
      case actionTypes.GetSubCategoryByCategoryIdResponse: {
        const getSubCategoryByCategoryIdResponse =
          action.payload.getSubCategoryByCategoryIdResponse.data &&
          action.payload.getSubCategoryByCategoryIdResponse.data;
        return { ...state, getSubCategoryByCategoryIdResponse };
      }

      case actionTypes.DeleteSubCategoryById: {
        const RequestParmDeleteSubCategoryId = action.payload;
        return { ...state, RequestParmDeleteSubCategoryId };
      }

      case actionTypes.DeleteSubCategoryByIdResponse: {
        const DeleteSubCategoryByIdResponse =
          action.payload.DeleteSubCategoryByIdResponse &&
          action.payload.DeleteSubCategoryByIdResponse;
        return { ...state, DeleteSubCategoryByIdResponse };
      }

      case actionTypes.DeleteSubCategoryByCategoryId: {
        const deleteSubCategoryByCategoryId = action.payload;
        return { ...state, deleteSubCategoryByCategoryId };
      }

      case actionTypes.DeleteSubCategoryByCategoryIdResponse: {
        const deleteSubCategoryByCategoryIdResponse =
          action.payload.deleteSubCategoryByCategoryIdResponse &&
          action.payload.deleteSubCategoryByCategoryIdResponse;
        return { ...state, deleteSubCategoryByCategoryIdResponse };
      }

      case actionTypes.GetSubCategoryInfoByIdResponse: {
        const GetSubCategoryInfoByIdResponse =
          action.payload.GetSubCategoryInfoByIdResponse.data &&
          action.payload.GetSubCategoryInfoByIdResponse.data;
        return { ...state, GetSubCategoryInfoByIdResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const GetSubCategoryInfoByIdResponse =
          action.payload.ResetInsuranceTypeResponse &&
          action.payload.ResetInsuranceTypeResponse;
        return { ...state, GetSubCategoryInfoByIdResponse };
      }

      case actionTypes.UpdateSubCategoryPriority: {
        const { updateSubCategoryPriority } = action.payload;
        return { ...state, updateSubCategoryPriority };
      }
      case actionTypes.UpdateSubCategoryPriorityResponse: {
        const updateSubCategoryPriorityResponse =
          action.payload.updateSubCategoryPriorityResponse.data &&
          action.payload.updateSubCategoryPriorityResponse.data;
        return {
          ...state,
          updateSubCategoryPriorityResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      //#endregion Manage Sub Category

      //#region  Manage Category
      //--------------------------------------------------------//
      case actionTypes.AddCategory: {
        const { category } = action.payload;
        return { ...state, category };
      }
      case actionTypes.AddCategoryResponse: {
        const categoryResponse =
          action.payload.categoryResponse.data &&
          action.payload.categoryResponse.data;
        return {
          ...state,
          categoryResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.UpdateCategoryPriority: {
        const { updateCategoryPriority } = action.payload;
        return { ...state, updateCategoryPriority };
      }
      case actionTypes.UpdateCategoryPriorityResponse: {
        const updateCategoryPriorityResponse =
          action.payload.updateCategoryPriorityResponse.data &&
          action.payload.updateCategoryPriorityResponse.data;
        return {
          ...state,
          updateCategoryPriorityResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.CheckCategoryPriority: {
        const { checkCategoryPriority } = action.payload;
        return { ...state, checkCategoryPriority };
      }
      case actionTypes.CheckCategoryPriorityResponse: {
        const checkCategoryPriorityResponse =
          action.payload.checkCategoryPriorityResponse.data &&
          action.payload.checkCategoryPriorityResponse.data;
        return {
          ...state,
          checkCategoryPriorityResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.UpdateCategoryStatus: {
        const { updateCategoryStatus } = action.payload;
        return { ...state, updateCategoryStatus };
      }
      case actionTypes.UpdateCategoryStatusResponse: {
        const updateCategoryStatusResponse =
          action.payload.updateCategoryStatusResponse.data &&
          action.payload.updateCategoryStatusResponse.data;
        return {
          ...state,
          updateCategoryStatusResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.UpdateSubCategoryStatus: {
        const { updateSubCategoryStatus } = action.payload;
        return { ...state, updateSubCategoryStatus };
      }
      case actionTypes.UpdateSubCategoryStatusResponse: {
        const updateSubCategoryStatusResponse =
          action.payload.updateSubCategoryStatusResponse.data &&
          action.payload.updateSubCategoryStatusResponse.data;
        return {
          ...state,
          updateSubCategoryStatusResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.GetCategory: {
        const { RequestParmTag } = action.payload;
        return { ...state, RequestParmTag };
      }
      case actionTypes.GetCategoryResponse: {
        const GetCategoryResponse =
          action.payload.GetCategoryResponse.data &&
          action.payload.GetCategoryResponse.data;
        return { ...state, GetCategoryResponse };
      }

      case actionTypes.GetImageByCategory: {
        const { getImageByCategory } = action.payload;
        return { ...state, getImageByCategory };
      }
      case actionTypes.GetImageByCategoryResponse: {
        const getImageByCategoryResponse =
          action.payload.getImageByCategoryResponse.data &&
          action.payload.getImageByCategoryResponse.data;
        return { ...state, getImageByCategoryResponse };
      }

      case actionTypes.GetImageBySubCategory: {
        const { getImageBySubCategory } = action.payload;
        return { ...state, getImageBySubCategory };
      }
      case actionTypes.GetImageBySubCategoryResponse: {
        const getImageBySubCategoryResponse =
          action.payload.getImageBySubCategoryResponse.data &&
          action.payload.getImageBySubCategoryResponse.data;
        return { ...state, getImageBySubCategoryResponse };
      }

      case actionTypes.CheckSubCategoryPriority: {
        const { checkSubCategoryPriority } = action.payload;
        return { ...state, checkSubCategoryPriority };
      }
      case actionTypes.CheckSubCategoryPriorityResponse: {
        const checkSubCategoryPriorityResponse =
          action.payload.checkSubCategoryPriorityResponse.data &&
          action.payload.checkSubCategoryPriorityResponse.data;
        return {
          ...state,
          checkSubCategoryPriorityResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.CheckSubCategory: {
        const { checkSubCategory } = action.payload;
        return { ...state, checkSubCategory };
      }
      case actionTypes.CheckSubCategoryResponse: {
        const CheckSubCategoryResponse =
          action.payload.CheckSubCategoryResponse.data &&
          action.payload.CheckSubCategoryResponse.data;
        return {
          ...state,
          CheckSubCategoryResponse,
          randomNumbers: 1 + Math.random() * (100 - 1),
        };
      }

      case actionTypes.DeleteSubCategoryImage: {
        const deleteSubCategoryImage = action.payload;
        return { ...state, deleteSubCategoryImage };
      }

      case actionTypes.DeleteSubCategoryImageResponse: {
        const deleteSubCategoryImageResponse =
          action.payload.deleteSubCategoryImageResponse &&
          action.payload.deleteSubCategoryImageResponse;
        return { ...state, deleteSubCategoryImageResponse };
      }

      case actionTypes.DeleteCategoryImage: {
        const deleteCategoryImage = action.payload;
        return { ...state, deleteCategoryImage };
      }

      case actionTypes.DeleteCategoryImageResponse: {
        const deleteCategoryImageResponse =
          action.payload.deleteCategoryImageResponse &&
          action.payload.deleteCategoryImageResponse;
        return { ...state, deleteCategoryImageResponse };
      }

      case actionTypes.GetCategoryById: {
        const { RequestParmInsuranceTypeData } = action.payload;
        return { ...state, RequestParmInsuranceTypeData };
      }
      case actionTypes.GetCategoryByIdResponse: {
        const getInsuranceTypeByIdResponse =
          action.payload.GetCategoryByIdResponse.data &&
          action.payload.GetCategoryByIdResponse.data;
        return { ...state, getInsuranceTypeByIdResponse };
      }

      case actionTypes.DeleteCategoryById: {
        const RequestParmDeleteCategoryId = action.payload;
        return { ...state, RequestParmDeleteCategoryId };
      }

      case actionTypes.DeleteCategoryByIdResponse: {
        const DeleteCategoryByIdResponse =
          action.payload.DeleteCategoryByIdResponse &&
          action.payload.DeleteCategoryByIdResponse;
        return { ...state, DeleteCategoryByIdResponse };
      }

      case actionTypes.GetCategoryInfoByIDResponse: {
        const GetCategoryInfoByIDResponse =
          action.payload.GetCategoryInfoByIDResponse.data &&
          action.payload.GetCategoryInfoByIDResponse.data;
        return { ...state, GetCategoryInfoByIDResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const GetCategoryInfoByIDResponse =
          action.payload.ResetInsuranceTypeResponse &&
          action.payload.ResetInsuranceTypeResponse;
        return { ...state, GetCategoryInfoByIDResponse };
      }

      case actionTypes.GetApplicationInfoByIdResponse: {
        const GetApplicationInfoByIdResponse =
          action.payload.GetApplicationInfoByIdResponse.data &&
          action.payload.GetApplicationInfoByIdResponse.data;
        return { ...state, GetApplicationInfoByIdResponse };
      }
      case actionTypes.ResetInsuranceTypeResponse: {
        const GetApplicationInfoByIdResponse =
          action.payload.ResetInsuranceTypeResponse &&
          action.payload.ResetInsuranceTypeResponse;
        return { ...state, GetApplicationInfoByIdResponse };
      }

      case actionTypes.GetInsuranceTypes: {
        const { RequestParmInsuranceTypeName } = action.payload;
        return { ...state, RequestParmInsuranceTypeName };
      }
      case actionTypes.GetInsuranceTypeResponse: {
        const GetInsuranceTypeResponse =
          action.payload.data && action.payload.data;
        return { ...state, GetInsuranceTypeResponse };
      }

      case actionTypes.ResetInsuranceTypeResponse: {
        const getInsuranceTypeByIdResponse =
          action.payload.ResetInsuranceTypeResponse &&
          action.payload.ResetInsuranceTypeResponse;
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

  SaveProfile: (ProfileSetting) => ({
    type: actionTypes.SaveProfile,
    payload: { ProfileSetting },
  }),
  SaveProfileResponse: (SaveProfileResponse) => ({
    type: actionTypes.SaveProfileResponse,
    payload: { SaveProfileResponse },
  }),

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

  DeleteCarrierById: (RequestParmDeleteCarrierData) => ({
    type: actionTypes.DeleteCarrierById,
    payload: { RequestParmDeleteCarrierData },
  }),
  DeleteCarrierByIdResponse: (DeleteCarrierByIdResponse) => ({
    type: actionTypes.DeleteCarrierByIdResponse,
    payload: { DeleteCarrierByIdResponse },
  }),

  //#region Insurance Type

  //::For the Save Insurance Type::

  //::for reset insurance type :://
  ResetInsuranceType: (ResetInsuranceType) => ({
    type: actionTypes.ResetInsuranceType,
    payload: { ResetInsuranceType },
  }),
  ResetInsuranceTypeResponse: (ResetInsuranceTypeResponse) => ({
    type: actionTypes.ResetInsuranceTypeResponse,
    payload: { ResetInsuranceTypeResponse },
  }),
  //::end insurance type :://
  DeleteInsuranceTypeById: (RequestParmDeleteInsuranceTypeData) => ({
    type: actionTypes.DeleteInsuranceTypeById,
    payload: { RequestParmDeleteInsuranceTypeData },
  }),
  DeleteInsuranceTypeByIdResponse: (DeleteInsuranceTypeByIdResponse) => ({
    type: actionTypes.DeleteInsuranceTypeByIdResponse,
    payload: { DeleteInsuranceTypeByIdResponse },
  }),
  //#endregion

  //#region Manage Users
  GetErrorlogs: (RequestParmErrorlogsData) => ({
    type: actionTypes.GetErrorlogs,
    payload: { RequestParmErrorlogsData },
  }),
  GetErrorlogsResponse: (GetErrorlogsResponse) => ({
    type: actionTypes.GetErrorlogsResponse,
    payload: { GetErrorlogsResponse },
  }),

  GetUserById: (RequestParmUserByIdData) => ({
    type: actionTypes.GetUserById,
    payload: { RequestParmUserByIdData },
  }),
  GetUserByIdResponse: (GetUserByIdResponse) => ({
    type: actionTypes.GetUserByIdResponse,
    payload: { GetUserByIdResponse },
  }),

  GetUserPaymentMethods: (RequestParmUserPaymentMethods) => ({
    type: actionTypes.GetUserPaymentMethods,
    payload: { RequestParmUserPaymentMethods },
  }),
  GetUserPaymentMethodsResponse: (GetUserPaymentMethodsResponse) => ({
    type: actionTypes.GetUserPaymentMethodsResponse,
    payload: { GetUserPaymentMethodsResponse },
  }),

  //#endregion

  //#region Manage Profile
  GetAdminUserData: (adminUserData) => ({
    type: actionTypes.GetAdminUserData,
    payload: { adminUserData },
  }),
  GetAdminUserDataResponse: (GetAdminUserDataResponse) => ({
    type: actionTypes.GetAdminUserDataResponse,
    payload: { GetAdminUserDataResponse },
  }),

  GetUserData: (userData) => ({
    type: actionTypes.GetUserData,
    payload: { userData },
  }),
  GetUserDataResponse: (GetUserDataResponse) => ({
    type: actionTypes.GetUserDataResponse,
    payload: { GetUserDataResponse },
  }),

  GetUseFavoriteVideoData: (userFavoriteData) => ({
    type: actionTypes.GetUseFavoriteVideoData,
    payload: { userFavoriteData },
  }),
  GetUseFavoriteVideoDataResponse: (GetUseFavoriteVideoDataResponse) => ({
    type: actionTypes.GetUseFavoriteVideoDataResponse,
    payload: { GetUseFavoriteVideoDataResponse },
  }),

  GetAdminUserById: (getAdminUserById) => ({
    type: actionTypes.GetAdminUserById,
    payload: { getAdminUserById },
  }),
  GetAdminUserByIdResponse: (GetAdminUserByIdResponse) => ({
    type: actionTypes.GetAdminUserByIdResponse,
    payload: { GetAdminUserByIdResponse },
  }),

  UpdateProfile: (profile) => ({
    type: actionTypes.UpdateProfile,
    payload: { profile },
  }),
  UpdateProfileResponse: (updateResponse) => ({
    type: actionTypes.UpdateProfileResponse,
    payload: { updateResponse },
  }),
  //#endregion Manage Profile

  //#region Manage Application
  AddApplication: (application) => ({
    type: actionTypes.AddApplication,
    payload: { application },
  }),
  AddApplicationResponse: (applicationResponse) => ({
    type: actionTypes.AddApplicationResponse,
    payload: { applicationResponse },
  }),

  GetApplication: (RequestParmApplication) => ({
    type: actionTypes.GetApplication,
    payload: { RequestParmApplication },
  }),
  GetApplicationResponse: (GetApplicationResponse) => ({
    type: actionTypes.GetApplicationResponse,
    payload: { GetApplicationResponse },
  }),

  DeleteApplicationById: (RequestParmDeleteApplicationId) => ({
    type: actionTypes.DeleteApplicationById,
    payload: { RequestParmDeleteApplicationId },
  }),
  DeleteApplicationByIdResponse: (DeleteApplicationByIdResponse) => ({
    type: actionTypes.DeleteApplicationByIdResponse,
    payload: { DeleteApplicationByIdResponse },
  }),

  GetApplicationInfoById: (RequestApplicationInfoByID) => ({
    type: actionTypes.GetApplicationInfoById,
    payload: { RequestApplicationInfoByID },
  }),
  GetApplicationInfoByIdResponse: (GetApplicationInfoByIdResponse) => ({
    type: actionTypes.GetApplicationInfoByIdResponse,
    payload: { GetApplicationInfoByIdResponse },
  }),
  //#endregion Manage Application

  //#region Manage Image
  AddImageTest: (categoryImageTest) => ({
    type: actionTypes.AddImageTest,
    payload: { categoryImageTest },
  }),
  AddImageResponseTest: (imageResponseTest) => ({
    type: actionTypes.AddImageResponseTest,
    payload: { imageResponseTest },
  }),

  //#region Manage Image
  AddImage: (categoryImage) => ({
    type: actionTypes.AddImage,
    payload: { categoryImage },
  }),
  AddImageResponse: (imageResponse) => ({
    type: actionTypes.AddImageResponse,
    payload: { imageResponse },
  }),

  AddSubCategoryThumbnailImage: (thumbnailImage) => ({
    type: actionTypes.AddSubCategoryThumbnailImage,
    payload: { thumbnailImage },
  }),
  AddSubCategoryThumbnailImageResponse: (thumbnailImageResponse) => ({
    type: actionTypes.AddSubCategoryThumbnailImageResponse,
    payload: { thumbnailImageResponse },
  }),

  AddSubCategoryImage: (subCategoryImage) => ({
    type: actionTypes.AddSubCategoryImage,
    payload: { subCategoryImage },
  }),
  AddSubCategoryImageResponse: (subCategoryImageResponse) => ({
    type: actionTypes.AddSubCategoryImageResponse,
    payload: { subCategoryImageResponse },
  }),

  AddSubCategoryImageNotification: (addSubCategoryImageNotification) => ({
    type: actionTypes.AddSubCategoryImageNotification,
    payload: { addSubCategoryImageNotification },
  }),
  AddSubCategoryImageNotificationResponse: (
    addSubCategoryImageNotificationResponse
  ) => ({
    type: actionTypes.AddSubCategoryImageNotificationResponse,
    payload: { addSubCategoryImageNotificationResponse },
  }),
  //#endregion Manage Image

  AddAdminUser: (addAdminUser) => ({
    type: actionTypes.AddAdminUser,
    payload: { addAdminUser },
  }),
  AddAdminUserResponse: (addAdminUserResponse) => ({
    type: actionTypes.AddAdminUserResponse,
    payload: { addAdminUserResponse },
  }),

  //#region Manage Sub Category
  AddSubCategory: (subCategory) => ({
    type: actionTypes.AddSubCategory,
    payload: { subCategory },
  }),
  AddSubCategoryResponse: (subCategoryResponse) => ({
    type: actionTypes.AddSubCategoryResponse,
    payload: { subCategoryResponse },
  }),

  GetSubCategory: (RequestParmSubCategory) => ({
    type: actionTypes.GetSubCategory,
    payload: { RequestParmSubCategory },
  }),
  GetSubCategoryResponse: (GetSubCategoryResponse) => ({
    type: actionTypes.GetSubCategoryResponse,
    payload: { GetSubCategoryResponse },
  }),

  GetSubCategoryData: (getSubCategoryData) => ({
    type: actionTypes.GetSubCategoryData,
    payload: { getSubCategoryData },
  }),
  GetSubCategoryDataResponse: (getSubCategoryDataResponse) => ({
    type: actionTypes.GetSubCategoryDataResponse,
    payload: { getSubCategoryDataResponse },
  }),

  DeleteSubCategoryById: (RequestParmDeleteSubCategoryId) => ({
    type: actionTypes.DeleteSubCategoryById,
    payload: { RequestParmDeleteSubCategoryId },
  }),
  DeleteSubCategoryByIdResponse: (DeleteSubCategoryByIdResponse) => ({
    type: actionTypes.DeleteSubCategoryByIdResponse,
    payload: { DeleteSubCategoryByIdResponse },
  }),

  DeleteSubCategoryByCategoryId: (deleteSubCategoryByCategoryId) => ({
    type: actionTypes.DeleteSubCategoryByCategoryId,
    payload: { deleteSubCategoryByCategoryId },
  }),
  DeleteSubCategoryByCategoryIdResponse: (
    deleteSubCategoryByCategoryIdResponse
  ) => ({
    type: actionTypes.DeleteSubCategoryByCategoryIdResponse,
    payload: { deleteSubCategoryByCategoryIdResponse },
  }),

  GetSubCategoryInfoById: (RequestSubCategoryInfoById) => ({
    type: actionTypes.GetSubCategoryInfoById,
    payload: { RequestSubCategoryInfoById },
  }),
  GetSubCategoryInfoByIdResponse: (GetSubCategoryInfoByIdResponse) => ({
    type: actionTypes.GetSubCategoryInfoByIdResponse,
    payload: { GetSubCategoryInfoByIdResponse },
  }),

  GetSubCategoryByCategoryId: (getSubCategoryByCategoryId) => ({
    type: actionTypes.GetSubCategoryByCategoryId,
    payload: { getSubCategoryByCategoryId },
  }),
  GetSubCategoryByCategoryIdResponse: (getSubCategoryByCategoryIdResponse) => ({
    type: actionTypes.GetSubCategoryByCategoryIdResponse,
    payload: { getSubCategoryByCategoryIdResponse },
  }),

  CheckSubCategory: (checkSubCategory) => ({
    type: actionTypes.CheckSubCategory,
    payload: { checkSubCategory },
  }),
  CheckSubCategoryResponse: (CheckSubCategoryResponse) => ({
    type: actionTypes.CheckSubCategoryResponse,
    payload: { CheckSubCategoryResponse },
  }),

  UpdateSubCategoryPriority: (updateSubCategoryPriority) => ({
    type: actionTypes.UpdateSubCategoryPriority,
    payload: { updateSubCategoryPriority },
  }),
  UpdateSubCategoryPriorityResponse: (updateSubCategoryPriorityResponse) => ({
    type: actionTypes.UpdateSubCategoryPriorityResponse,
    payload: { updateSubCategoryPriorityResponse },
  }),

  CheckSubCategoryPriority: (checkSubCategoryPriority) => ({
    type: actionTypes.CheckSubCategoryPriority,
    payload: { checkSubCategoryPriority },
  }),
  CheckSubCategoryPriorityResponse: (checkSubCategoryPriorityResponse) => ({
    type: actionTypes.CheckSubCategoryPriorityResponse,
    payload: { checkSubCategoryPriorityResponse },
  }),
  //#endregion Manage Sub Category

  //#region  Manage Category
  AddCategory: (category) => ({
    type: actionTypes.AddCategory,
    payload: { category },
  }),
  AddCategoryResponse: (categoryResponse) => ({
    type: actionTypes.AddCategoryResponse,
    payload: { categoryResponse },
  }),

  UpdateCategoryPriority: (updateCategoryPriority) => ({
    type: actionTypes.UpdateCategoryPriority,
    payload: { updateCategoryPriority },
  }),
  UpdateCategoryPriorityResponse: (updateCategoryPriorityResponse) => ({
    type: actionTypes.UpdateCategoryPriorityResponse,
    payload: { updateCategoryPriorityResponse },
  }),

  CheckCategoryPriority: (checkCategoryPriority) => ({
    type: actionTypes.CheckCategoryPriority,
    payload: { checkCategoryPriority },
  }),
  CheckCategoryPriorityResponse: (checkCategoryPriorityResponse) => ({
    type: actionTypes.CheckCategoryPriorityResponse,
    payload: { checkCategoryPriorityResponse },
  }),

  UpdateCategoryStatus: (updateCategoryStatus) => ({
    type: actionTypes.UpdateCategoryStatus,
    payload: { updateCategoryStatus },
  }),
  UpdateCategoryStatusResponse: (updateCategoryStatusResponse) => ({
    type: actionTypes.UpdateCategoryStatusResponse,
    payload: { updateCategoryStatusResponse },
  }),

  UpdateSubCategoryStatus: (updateSubCategoryStatus) => ({
    type: actionTypes.UpdateSubCategoryStatus,
    payload: { updateSubCategoryStatus },
  }),
  UpdateSubCategoryStatusResponse: (updateSubCategoryStatusResponse) => ({
    type: actionTypes.UpdateSubCategoryStatusResponse,
    payload: { updateSubCategoryStatusResponse },
  }),

  GetCategory: (RequestParmTag) => ({
    type: actionTypes.GetCategory,
    payload: { RequestParmTag },
  }),
  GetCategoryResponse: (GetCategoryResponse) => ({
    type: actionTypes.GetCategoryResponse,
    payload: { GetCategoryResponse },
  }),

  GetImageByCategory: (getImageByCategory) => ({
    type: actionTypes.GetImageByCategory,
    payload: { getImageByCategory },
  }),
  GetImageByCategoryResponse: (getImageByCategoryResponse) => ({
    type: actionTypes.GetImageByCategoryResponse,
    payload: { getImageByCategoryResponse },
  }),

  GetImageBySubCategory: (getImageBySubCategory) => ({
    type: actionTypes.GetImageBySubCategory,
    payload: { getImageBySubCategory },
  }),
  GetImageBySubCategoryResponse: (getImageBySubCategoryResponse) => ({
    type: actionTypes.GetImageBySubCategoryResponse,
    payload: { getImageBySubCategoryResponse },
  }),

  GetInsuranceTypes: (RequestParmInsuranceTypeName) => ({
    type: actionTypes.GetInsuranceTypes,
    payload: { RequestParmInsuranceTypeName },
  }),
  GetInsuranceTypeResponse: (GetInsuranceTypeResponse) => ({
    type: actionTypes.GetInsuranceTypeResponse,
    payload: { GetInsuranceTypeResponse },
  }),

  GetCategoryById: (RequestCategoryData) => ({
    type: actionTypes.GetCategoryById,
    payload: { RequestCategoryData },
  }),
  GetCategoryByIdResponse: (GetCategoryByIdResponse) => ({
    type: actionTypes.GetCategoryByIdResponse,
    payload: { GetCategoryByIdResponse },
  }),

  DeleteCategoryById: (RequestParmDeleteCategoryId) => ({
    type: actionTypes.DeleteCategoryById,
    payload: { RequestParmDeleteCategoryId },
  }),
  DeleteCategoryByIdResponse: (DeleteCategoryByIdResponse) => ({
    type: actionTypes.DeleteCategoryByIdResponse,
    payload: { DeleteCategoryByIdResponse },
  }),

  DeleteCategoryImage: (deleteCategoryImage) => ({
    type: actionTypes.DeleteCategoryImage,
    payload: { deleteCategoryImage },
  }),
  DeleteCategoryImageResponse: (deleteCategoryImageResponse) => ({
    type: actionTypes.DeleteCategoryImageResponse,
    payload: { deleteCategoryImageResponse },
  }),

  DeleteSubCategoryImage: (deleteSubCategoryImage) => ({
    type: actionTypes.DeleteSubCategoryImage,
    payload: { deleteSubCategoryImage },
  }),
  DeleteSubCategoryImageResponse: (deleteSubCategoryImageResponse) => ({
    type: actionTypes.DeleteSubCategoryImageResponse,
    payload: { deleteSubCategoryImageResponse },
  }),

  GetCategoryInfoByID: (RequestApplicationInfoByID) => ({
    type: actionTypes.GetCategoryInfoByID,
    payload: { RequestApplicationInfoByID },
  }),
  GetCategoryInfoByIDResponse: (GetCategoryInfoByIDResponse) => ({
    type: actionTypes.GetCategoryInfoByIDResponse,
    payload: { GetCategoryInfoByIDResponse },
  }),
  //#endregion End Manage Category
};

export function* saga() {
  //:: reset insurance type:://

  yield takeLatest(
    actionTypes.ResetInsuranceType,
    function* ResetInsuranceTypeRequested(payload) {
      yield put(
        actions.ResetInsuranceTypeResponse(payload.payload.ResetInsuranceType)
      );
    }
  );
  //::end reset insurance type :://
  //#endregion Dashbards

  //#region Manage Profile

  yield takeLatest(
    actionTypes.GetAdminUserData,
    function* getAdminUserDataRequested(payload) {
      const response = yield call(getAdminUserDataRequestApi, payload.payload);
      console.log(response);
      if (response) yield put(actions.GetAdminUserDataResponse(response));
    }
  );

  yield takeLatest(actionTypes.GetUserData, function* getUserDataRequested(
    payload
  ) {
    const response = yield call(getUserDataRequestApi, payload.payload);
    console.log(response);
    if (response) yield put(actions.GetUserDataResponse(response));
  });

  yield takeLatest(
    actionTypes.GetUseFavoriteVideoData,
    function* getUseFavoriteVideoDataRequested(payload) {
      const response = yield call(
        getUseFavoriteVideoDataRequestApi,
        payload.payload
      );
      console.log(response);
      if (response)
        yield put(actions.GetUseFavoriteVideoDataResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetAdminUserById,
    function* getAdminUserByIdRequested(payload) {
      const response = yield call(GetAdminUserByIdRequestApi, payload.payload);
      console.log(response);
      if (response) yield put(actions.GetAdminUserByIdResponse(response));
    }
  );

  yield takeLatest(actionTypes.UpdateProfile, function* updateProfileRequested(
    payload
  ) {
    const response = yield call(updateProfileRequestApi, payload.payload);
    if (response) yield put(actions.UpdateProfileResponse(response));
  });

  //#endregion Manage Profile

  //#region  Manage Category
  yield takeLatest(actionTypes.GetCategory, function* getCategoryRequested(
    payload
  ) {
    const response = yield call(getCategoryRequestedApi, payload.payload);
    yield put(actions.GetCategoryResponse(response));
  });

  yield takeLatest(
    actionTypes.GetImageByCategory,
    function* getImageByCategoryRequested(payload) {
      const response = yield call(
        getImageByCategoryRequestedApi,
        payload.payload
      );
      yield put(actions.GetImageByCategoryResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetImageBySubCategory,
    function* getImageBySubCategoryRequested(payload) {
      const response = yield call(
        getImageBySubCategoryRequestedApi,
        payload.payload
      );
      yield put(actions.GetImageBySubCategoryResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetCategoryInfoByID,
    function* GetCategoryInfoByIDRequest(payload) {
      const response = yield call(
        GetCategoryInfoByIDRequestedApi,
        payload.payload
      );
      yield put(actions.GetCategoryInfoByIDResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetCategoryById,
    function* GetInsuranceTypeByIdRequest(payload) {
      const response = yield call(getCategoryByIdRequestedApi, payload.payload);
      yield put(actions.GetCategoryByIdResponse(response));
    }
  );

  yield takeLatest(actionTypes.AddCategory, function* addCategoryRequested(
    payload
  ) {
    const response = yield call(addCategoryRequestApi, payload.payload);
    if (response) yield put(actions.AddCategoryResponse(response));
  });

  yield takeLatest(
    actionTypes.UpdateCategoryPriority,
    function* updateCategoryPriorityRequest(payload) {
      const response = yield call(
        updateCategoryPriorityRequestAPI,
        payload.payload
      );
      if (response) yield put(actions.UpdateCategoryPriorityResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.CheckCategoryPriority,
    function* checkCategoryPriorityRequest(payload) {
      const response = yield call(
        checkCategoryPriorityRequestAPI,
        payload.payload
      );
      if (response) yield put(actions.CheckCategoryPriorityResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.UpdateCategoryStatus,
    function* updateCategoryStatusRequest(payload) {
      const response = yield call(
        updateCategoryStatusRequestAPI,
        payload.payload
      );
      if (response) yield put(actions.UpdateCategoryStatusResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.UpdateSubCategoryStatus,
    function* updateSubCategoryStatusRequest(payload) {
      const response = yield call(
        updateSubCategoryStatusRequestAPI,
        payload.payload
      );
      if (response)
        yield put(actions.UpdateSubCategoryStatusResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.CheckSubCategoryPriority,
    function* checkSubCategoryPriorityRequest(payload) {
      const response = yield call(
        checkSubCategoryPriorityRequestAPI,
        payload.payload
      );
      if (response)
        yield put(actions.CheckSubCategoryPriorityResponse(response));
    }
  );

  yield takeLatest(actionTypes.DeleteCategoryById, function* deleteTagRequested(
    payload
  ) {
    const response = yield call(deleteCategoryApi, payload.payload);
    if (response) yield put(actions.DeleteCategoryByIdResponse(response));
  });

  yield takeLatest(
    actionTypes.DeleteCategoryImage,
    function* DeleteCategoryImageRequested(payload) {
      const response = yield call(
        deleteCategoryImageRequestAPI,
        payload.payload
      );
      if (response) yield put(actions.DeleteCategoryImageResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.DeleteSubCategoryImage,
    function* DeleteSubCategoryImageRequested(payload) {
      const response = yield call(
        deleteSubCategoryImageRequestAPI,
        payload.payload
      );
      if (response) yield put(actions.DeleteSubCategoryImageResponse(response));
    }
  );

  //#endregion Manage Category

  //#region Manage Image
  // yield takeLatest(actionTypes.AddImageTest, function* addImageRequestedTest(
  //   payload
  // ) {
  //   const response = yield call(ImageUploadTest, payload.payload);
  //   if (response) yield put(actions.AddImageResponseTest(response));
  // });

  //#region Manage Image
  yield takeLatest(actionTypes.AddImage, function* addImageRequested(payload) {
    const response = yield call(addCategoryImageRequestApi, payload.payload);
    if (response) yield put(actions.AddImageResponse(response));
  });

  yield takeLatest(
    actionTypes.AddSubCategoryThumbnailImage,
    function* addSubCategoryThumbnailImageRequested(payload) {
      const response = yield call(
        addSubCategoryThumbnailImageRequestApi,
        payload.payload
      );
      if (response)
        yield put(actions.AddSubCategoryThumbnailImageResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.AddSubCategoryImage,
    function* addSubCategoryImageRequested(payload) {
      const response = yield call(
        addSubCategoryImageRequestApi,
        payload.payload
      );
      if (response) yield put(actions.AddSubCategoryImageResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.AddSubCategoryImageNotification,
    function* addSubCategoryImageNotificationRequested(payload) {
      const response = yield call(
        addSubCategoryImageNotificationRequestApi,
        payload.payload
      );
      debugger;
      if (response.status == 200) {
        yield put(actions.AddSubCategoryImageNotificationResponse(response));
        // sendUploadImageNotificationApi(payload.payload)
        sendUploadImageNotificationApi();
        //   console.log('true');
        // } else {
        //   console.log('fail');
      }
    }
  );
  //#endregion Manage Image

  //#region Manage Application
  yield takeLatest(
    actionTypes.AddApplication,
    function* addApplicationRequested(payload) {
      const response = yield call(addApplicationRequestApi, payload.payload);
      if (response.status == 200) {
        yield put(actions.AddApplicationResponse(response));
        sendNotificationApi(payload.payload);
        console.log("true");
      } else {
        console.log("fail");
      }
    }
  );

  yield takeLatest(
    actionTypes.GetApplication,
    function* getApplicationRequested(payload) {
      const response = yield call(getApplicationRequestedApi, payload.payload);
      yield put(actions.GetApplicationResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.DeleteApplicationById,
    function* deleteTagRequested(payload) {
      const response = yield call(deleteApplicationApi, payload.payload);
      if (response) yield put(actions.DeleteApplicationByIdResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetApplicationInfoById,
    function* GetApplicationInfoByIDRequest(payload) {
      const response = yield call(
        GetApplicationInfoByIDRequestedApi,
        payload.payload
      );
      yield put(actions.GetApplicationInfoByIdResponse(response));
    }
  );
  //#endregion Mange Application

  yield takeLatest(actionTypes.AddAdminUser, function* addAdminUserRequested(
    payload
  ) {
    const response = yield call(addAdminUserRequestApi, payload.payload);
    // if (response.status == 200) {
    yield put(actions.AddAdminUserResponse(response));
    //   addSubCategoryNotificationApi(payload.payload)
    //   console.log('true');
    // } else {
    //   console.log('fail');
    // }
  });

  //#region Manage Sub Category
  yield takeLatest(
    actionTypes.AddSubCategory,
    function* addSubCategoryRequested(payload) {
      const response = yield call(addSubCategoryRequestApi, payload.payload);
      if (response.status == 200) {
        yield put(actions.AddSubCategoryResponse(response));
        addSubCategoryNotificationApi(payload.payload);
        console.log("true");
      } else {
        console.log("fail");
      }
    }
  );

  yield takeLatest(
    actionTypes.GetSubCategory,
    function* getSubCategoryRequested(payload) {
      const response = yield call(getSubCategoryRequestedApi, payload.payload);
      yield put(actions.GetSubCategoryResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetSubCategoryData,
    function* getSubCategoryDataRequested(payload) {
      const response = yield call(
        getSubCategoryDataRequestedApi,
        payload.payload
      );
      yield put(actions.GetSubCategoryDataResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.DeleteSubCategoryById,
    function* deleteSubCategoryRequested(payload) {
      const response = yield call(deleteSubCategoryApi, payload.payload);
      if (response) yield put(actions.DeleteSubCategoryByIdResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.DeleteSubCategoryByCategoryId,
    function* deleteSubCategoryByCategoryIdRequested(payload) {
      const response = yield call(
        DeleteSubCategoryByCategoryIdApi,
        payload.payload
      );
      if (response)
        yield put(actions.DeleteSubCategoryByCategoryIdResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetSubCategoryInfoById,
    function* GetSubCategoryInfoByIDRequest(payload) {
      const response = yield call(
        GetSubCategoryInfoByIDRequestedApi,
        payload.payload
      );
      yield put(actions.GetSubCategoryInfoByIdResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.GetSubCategoryByCategoryId,
    function* GetSubCategoryByCategoryIdRequest(payload) {
      const response = yield call(
        getSubCategoryByCategoryIdRequestedApi,
        payload.payload
      );
      yield put(actions.GetSubCategoryByCategoryIdResponse(response));
    }
  );
  //#endregion Mange Sub Category

  yield takeLatest(actionTypes.ResetVideo, function* ResetVideosRequested(
    payload
  ) {
    yield put(actions.ResetVideoResponse(payload.payload.GetVideoByIdResponse));
  });

  yield takeLatest(
    actionTypes.CheckSubCategory,
    function* checkSubCategoryRequested(payload) {
      const response = yield call(checkSubCategoryRequestApi, payload.payload);
      if (response) yield put(actions.CheckSubCategoryResponse(response));
    }
  );

  yield takeLatest(
    actionTypes.UpdateSubCategoryPriority,
    function* updateSubCategoryPriorityRequest(payload) {
      const response = yield call(
        updateSubCategoryPriorityRequestAPI,
        payload.payload
      );
      if (response)
        yield put(actions.UpdateSubCategoryPriorityResponse(response));
    }
  );
}

//#region Manage Profile
const getUserDataRequestApi = async (payload) => {
  var data = payload.userData;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .get(`${BASE_URL}Authentication/GetAllUser`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const getAdminUserDataRequestApi = async (payload) => {
  var data = payload.adminUserData;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .get(`${BASE_URL}Authentication/GetAllAdminUser`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const getUseFavoriteVideoDataRequestApi = async (payload) => {
  var data = payload.userFavoriteData;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Authentication/GetUserByUserId`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetAdminUserByIdRequestApi = async (payload) => {
  var data = payload.getAdminUserById;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(
      `${BASE_URL}Authentication/GetAdminUserByinAdminUserId`,
      data,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const updateProfileRequestApi = async (payload) => {
  var data = payload.profile;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Profile/EditProfile`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const addCategoryRequestApi = async (payload) => {
  var data = payload.category;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Category/addEditCategory`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const updateCategoryPriorityRequestAPI = async (payload) => {
  var data = payload.updateCategoryPriority;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Category/UpdateCategoryPriority`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const checkCategoryPriorityRequestAPI = async (payload) => {
  var data = payload.checkCategoryPriority;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .get(`${BASE_URL}Category/CheckCategoryDisplayPriority`, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const updateCategoryStatusRequestAPI = async (payload) => {
  var data = payload.updateCategoryStatus;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance
    .post(`${BASE_URL}Category/UpdateCategoryStatus`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const updateSubCategoryStatusRequestAPI = async (payload) => {
  var data = payload.updateSubCategoryStatus;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance
    .post(`${BASE_URL}SubCategory/UpdateSubCategoryStatus`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const checkSubCategoryPriorityRequestAPI = async (payload) => {
  var data = payload.checkSubCategoryPriority;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .get(`${BASE_URL}SubCategory/CheckSubCategoryDisplayPriority`, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const updateSubCategoryPriorityRequestAPI = async (payload) => {
  var data = payload.updateSubCategoryPriority;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}SubCategory/UpdateSubCategoryPriority`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo);
  return respo;
};

const getCategoryRequestedApi = async (payload) => {
  // var data = payload.RequestParmTag;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(`${BASE_URL}Category/GetAllCategory`, options);
  return respo;
};

const checkSubCategoryRequestApi = async (payload) => {
  // var data = payload.checkSubCategory;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance.get(
    `${BASE_URL}SubCategory/CheckSubCategory`,
    options
  );
  console.log(respo, "KOLKOLKOLKOL");
  return respo;
};

const getCategoryByIdRequestedApi = async (payload) => {
  var data = payload.RequestCategoryData;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).token
      }`,
    },
  };
  const respo = instance.get(`${BASE_URL}Category/GetAllCategory`, options);
  return respo;
};

const deleteCategoryApi = async (payload) => {
  var data = payload.RequestParmDeleteCategoryId;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}Category/DeleteCategory?inCategoryId=${data}&inModifiedBy=22`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const deleteCategoryImageRequestAPI = async (payload) => {
  var data = payload.deleteCategoryImage;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}Image/DeleteImage?inCategoryImageId=${data.inCategoryImageId}&inModifiedBy=${data.inModifiedBy}`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const deleteSubCategoryImageRequestAPI = async (payload) => {
  var data = payload.deleteSubCategoryImage;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}Image/DeleteSubCategoryImage?inSubCategoryImageId=${data.inSubCategoryImageId}&inModifiedBy=${data.inModifiedBy}`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetCategoryInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestApplicationInfoByID;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance.get(
    `${BASE_URL}Category/GetCategoryById?inCategoryId=${data}`,
    options
  );
  return respo;
};

//#endregion End Manage Category

//#region Manage Image
const addCategoryImageRequestApi = async (payload) => {
  var data = payload.categoryImage;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance
    .post(`${BASE_URL}Image/addEditImage`, data, options)
    .catch((e) => {
      console.log("121121212121212");
      return e.response;
    });
  return respo;
};

const getImageByCategoryRequestedApi = async (payload) => {
  var data = payload.getImageByCategory;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.post(
    `${BASE_URL}Image/GetImageByCategoryId`,
    data,
    options
  );
  return respo;
};

const getImageBySubCategoryRequestedApi = async (payload) => {
  var data = payload.getImageBySubCategory;
  const instance = await axios.create({});

  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.post(
    `${BASE_URL}SubCategory/GetImageBySubCategoryId`,
    data,
    options
  );
  return respo;
};

const addSubCategoryImageRequestApi = async (payload) => {
  var data = payload.subCategoryImage;
  console.log(data, "DATA");
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance
    .post(`${BASE_URL}Image/addEditSubCategroyImage`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "}}}}}}}");
  return respo;
};

const addSubCategoryImageNotificationRequestApi = async (payload) => {
  debugger;
  var data = payload.addSubCategoryImageNotification;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Image/addEditSubCategroyImage`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const addSubCategoryThumbnailImageRequestApi = async (payload) => {
  var data = payload.thumbnailImage;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  console.log(data, "????????????");
  const respo = instance
    .post(`${BASE_URL}Image/AddEditSubCategoryThumbnailImage`, data, options)
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
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Application/addEditApplication`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

const getApplicationRequestedApi = async (payload) => {
  // var data = payload.RequestParmTag;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };
  const respo = instance.get(
    `${BASE_URL}Application/GetAllApplication`,
    options
  );
  return respo;
};

const deleteApplicationApi = async (payload) => {
  var data = payload.RequestParmDeleteApplicationId;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}Application/DeleteApplication?inApplicationId=${data}&inModifiedBy=22`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetApplicationInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestApplicationInfoByID;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance.get(
    `${BASE_URL}Application/GetApplicationById?inApplicationId=${data}`,
    options
  );
  return respo;
};
//#endregion Manage Application

//#region Manage Sub Category
const addSubCategoryRequestApi = async (payload) => {
  var data = payload.subCategory;
  console.log(data, "????????????");
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}SubCategory/addEditSubCategory`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const addAdminUserRequestApi = async (payload) => {
  debugger;
  var data = payload.addAdminUser;
  console.log(data, "????????????");
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Authentication/AddEditAdminUser`, data, options)
    .catch((e) => {
      return e.response;
    });
  console.log(respo, "??>>>????");
  return respo;
};

const getSubCategoryRequestedApi = async (payload) => {
  var data = payload.GetSubCategoryResponse;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
    //headers: { 'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklzVmVyaWZpZWRPVFAiOnRydWV9LCJpYXQiOjE2MjIwMTkyNzJ9.aK19zILPRxnCZLmX_ECXYzkEOzxThrc92pZ2J-2h980` }//${JSON.parse(JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user).accessToken}
  };

  const respo = instance.get(
    `${BASE_URL}SubCategory/GetAllSubCategory`,
    options
  );
  return respo;
};

const getSubCategoryDataRequestedApi = async (payload) => {
  var data = payload.getSubCategoryData;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance.get(`${BASE_URL}SubCategory/GetSubCategory`, options);
  return respo;
};

const deleteSubCategoryApi = async (payload) => {
  var data = payload.RequestParmDeleteSubCategoryId;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}SubCategory/DeleteSubCategory?inSubCategoryId=${data.inSubCategoryId}&inModifiedBy=${data.inModifiedBy}`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const DeleteSubCategoryByCategoryIdApi = async (payload) => {
  var data = payload.deleteSubCategoryByCategoryId;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .delete(
      `${BASE_URL}SubCategory/DeleteSubCategoryByCategoryId?inCategoryId=${data.inCategoryId}`,
      options
    )
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const GetSubCategoryInfoByIDRequestedApi = async (payload) => {
  var data = payload.RequestSubCategoryInfoById;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance.get(
    `${BASE_URL}SubCategory/GetSubCategoryById?inSubCategoryId=${data}`,
    options
  );
  return respo;
};

const getSubCategoryByCategoryIdRequestedApi = async (payload) => {
  var data = payload.getSubCategoryByCategoryId;
  const instance = await axios.create({});

  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };

  const respo = instance.get(
    `${BASE_URL}SubCategory/GetSubCategoryByCategoryId`,
    data,
    options
  );
  return respo;
};

export const sendUploadImageNotificationApi = async (payload) => {
  // var data = payload.application;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Image/sendNotification`, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const sendNotificationApi = async (payload) => {
  var data = payload.application;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}Application/sendNotification`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};

const addSubCategoryNotificationApi = async (payload) => {
  var data = payload.subCategory;
  const instance = await axios.create({});
  const options = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem("persist:v713-demo1-auth")).user
        ).data.token
      }`,
    },
  };
  const respo = instance
    .post(`${BASE_URL}SubCategory/sendNotification`, data, options)
    .catch((e) => {
      return e.response;
    });
  return respo;
};
//#endregion Manage Sub Category
