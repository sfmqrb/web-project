import {toast} from "react-toastify";
import {wait} from "@testing-library/user-event/dist/utils";

export function CheckIngredient(ingredientName) {
    const ingredients = JSON.parse(localStorage.getItem("ingredients"))
    let found = false
    let ing = null
    ingredients.forEach((item, index) =>{
        console.log("ingredient check " + "   " + ingredientName + "   " + item.name)
        if (item.name === ingredientName) {
            found = true
            ing = item
        }
    })
    return ing
}


export function CheckTag(tagName) {
    const tags = JSON.parse(localStorage.getItem("tags"))
    let found = false
    let tag = null
    tags.forEach((item, index) =>{
        console.log("tag check " + "   " + tagName + "   " + item.name)
        if (item.name === tagName) {
            found = true
            tag = item
        }
    })
    return tag
}

export function StringArrayToBackSteps(arr){
    let steps = []
    arr.forEach((item, index) =>{
        steps.push({text: item})
    })
    return steps
}


export function TokenIsExpires(){
    toast.warning("your token is expired")
    setTimeout(() => { window.location = "/login" }, 2000);
    // toast.warning("your token is expired")
}

export function OnGoogleCallBack() {
    console.log("on google call back")
}