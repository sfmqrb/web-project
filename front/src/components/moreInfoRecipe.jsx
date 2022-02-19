import React, {useEffect, useState} from "react";
import NewRecipe from "./Recipe/newRecipe";
import ax from "../services/httpService"
import cfg from "../config.json";
import getHeader from "../utils/getHeader";
import {backRecipeToFrontRecipe} from "./common/commonUtils/EntitieHandeler";
import {TokenIsExpires} from "../services/Tools";

const MoreInfoRecipe = () => {
    const [input, setInput] = useState(null);

    useEffect(() => {
        const url = window.location.href;
        const id = url.split("/")[4];
        console.log("recipe id " + id)
        ax.get(cfg.apiUrl + "/recipe/" + id, getHeader()).then((res) => {
            console.log(res);
            if (res.status === 203){
                TokenIsExpires()
                return
            }
            let recipe = backRecipeToFrontRecipe(res.data)
            const tmpInput = {...recipe, isAdmin: false};
            setInput(tmpInput);
        });
    }, []);
    let admin = false
    if (input) {
        console.log(input)
        admin = JSON.parse(localStorage.getItem('user')).username === input.writer
        console.log(JSON.parse(localStorage.getItem('user')).username + "    " + input.writer)
    }
    console.log("admin   " + admin)
    return <>{input ? <NewRecipe {...input} isAdmin={admin}/> : "processing"}</>;
};

export default MoreInfoRecipe;
