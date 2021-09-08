import * as utils from "./LocalStorageHelpers";

const localStorageLastLocationKey = "metronic-lastLocation";

function acceptLocation(lastLocation) {
    if (
        lastLocation &&
        lastLocation.pathname &&
        lastLocation.pathname !== "/" &&
        lastLocation.pathname.indexOf("auth") === -1 &&
        lastLocation.pathname !== "/logout"
    ) {
        return true;
    }

    return false;
}

export function saveLastLocation(lastLocation) {
    if (acceptLocation(lastLocation)) {
        utils.setStorage(
            localStorageLastLocationKey,
            JSON.stringify(lastLocation),
            120
        );
    }
}

export function forgotLastLocation() {
    utils.removeStorage(localStorageLastLocationKey);
}

export function getLastLocation() {
    const defaultLocation = { pathname: "/", title: "Dashboard" };
    const localStorateLocations = utils.getStorage(localStorageLastLocationKey);
    if (!localStorateLocations) {
        return { pathname: "/", title: "Dashboard" };
    }

    try {
        const result = JSON.parse(localStorateLocations);
        return result;
    } catch (error) {
        console.error(error);
        return defaultLocation;
    }
}

export function getCurrentUrl(location) {
    return location.pathname.split(/[?#]/)[0];
}

export function checkIsActive(location, url) {
    var current = getCurrentUrl(location);

    if (current == '/AddApplicationPage' || current == 'ManageApplication')
        current = '/ManageApplication';
    else if (current == '/Videos/Video' || current == 'ManageUsersPage')
        current = '/Videos';
    else if (current == '/users' || current == 'users/favoriteVideo')
        current = '/users';

    // else if (current == '/user' || current == '/user/view')
    //     current = '/user';
    else
        current = current;


    if (!current || !url) {
        return false;
    }

    if (current === url) {
        return true;
    }

    if (current.indexOf(url) > -1) {
        return true;
    }

    return false;
}
