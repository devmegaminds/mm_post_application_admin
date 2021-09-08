import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
//#region Project's Screen
import DashboardPage from "./pages/DashboardPage";
import AddApplicationPage from "./pages/Application/AddApplicationPage";
import ManageApplication from "./pages/Application/ManageApplication";
import ManageUsersPage from "./pages/Users/ManageUsersPage";
import ViewUserPage from "./pages/Users/ViewUserPage";
import AddCategoryPage from "./pages/Category/AddCategoryPage";
import ManageCategory from "./pages/Category/ManageCategory";
import UploadImage from "./pages/Image/UploadImage";
//#endregion

//#region It's Extra Screen
import Extra from "./pages/Extra/Extra";
import { MyPage } from "./pages/Extra/MyPage";
import Profile from "./pages/Profile/Profile"
//#endregion

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/DashboardPage" />
                }
                {/* Dashbord Screen */}
                <ContentRoute path="/DashboardPage" component={DashboardPage} />
                {/* Application */}
                <ContentRoute path="/ManageApplication" component={ManageApplication} />
                <ContentRoute path="/AddApplicationPage" component={AddApplicationPage} />
                {/* User */}
                <ContentRoute path="/ManageUsersPage" component={ManageUsersPage} />
                <ContentRoute path="/ViewUserPage" component={ViewUserPage} />
                {/* Category */}
                <ContentRoute path="/ManageCategory" component={ManageCategory} />
                <ContentRoute path="/AddCategoryPage" component={AddCategoryPage} />
                {/* Upload Image */}
                <ContentRoute path="/UploadImage" component={UploadImage} />

                {/* Extra Screen */}
                <ContentRoute path="/Profile" component={Profile} />
                <ContentRoute path="/mypage" component={MyPage} />
            </Switch>
        </Suspense>
    );
}