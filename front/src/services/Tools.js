import {toast} from "react-toastify";
import ax from "./httpService";
import cfg from "../config.json";
import getHeader from "../utils/getHeader";
import {GoogleLogin} from "react-google-login";
import ReactDOM from "react-dom";

export function CheckIngredient(ingredientName) {
    const ingredients = JSON.parse(localStorage.getItem("ingredients"))
    let found = false
    let ing = null
    ingredients.forEach((item, index) => {
        console.log("ingredient check " + "   " + ingredientName + "   " + item.name)
        if (item.name.toUpperCase() === ingredientName.toUpperCase()) {
            found = true
            console.log("check ing    ",ing)
            ing = item
        }
    })
    return ing
}

export function CheckTag(tagName) {
    const tags = JSON.parse(localStorage.getItem("tags"))
    let found = false
    let tag = null
    tags.forEach((item, index) => {
        console.log("tag check " + "   " + tagName + "   " + item.name)
        if (item.name.toUpperCase() === tagName.toUpperCase()) {
            found = true
            tag = item
        }
    })
    return tag
}

export function StringArrayToBackSteps(arr) {
    let steps = []
    arr.forEach((item, index) => {
        steps.push({text: item})
    })
    return steps
}


export function TokenIsExpires() {
    toast.warning("your token is expired")
    setTimeout(() => {
        window.location = "/login"
    }, 2000);
    // toast.warning("your token is expired")
}

export function OnGoogleCallBack() {
    console.log("on google call back")
}

export function handelFollow(username) {
    ax.put(cfg.apiUrl + "/users/" + username, {}, getHeader()).then((res) => {
        console.log(res);
        if (res.status === 200) {
            toast.success(username + " followed");
        } else {
            toast.warning(username + " not followed");
            if (res.status === 203) {
                TokenIsExpires()
                return
            }
        }
    });

}

export function handelUnFollow(username) {
    console.log(cfg.apiUrl + "/users/" + username)
    ax.delete(cfg.apiUrl + "/users/" + username, getHeader()).then((res) => {
        console.log(res);
        if (res.status === 200) {
            toast.success(username + " unfollowed");
        } else {
            toast.warning(username + " not unfollowed");
            if (res.status === 203) {
                TokenIsExpires()
                return
            }
        }
    });

}

const responseGoogle = (response) => {
    console.log(response);
}

// ReactDOM.render(
//     <GoogleLogin
//         clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//         buttonText="Login"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={'single_host_origin'}
//     />,
//     document.getElementById('googleButton')
// );