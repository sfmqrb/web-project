import ax from "../services/httpService";
import cfg from "../config.json";
import {TokenIsExpires} from "../services/Tools";

const GoogleCallBack = () => {
    console.log("google call back")
    console.log(window.location.href)
    //todo
    let url = window.location.href.replace("3000","8080")
    url = url.replace("auth","login")
    console.log(url)
    // ax.get(cfg.apiUrl + "/login", data).then((res) => {
    //     console.log(res.data.jwt);
    //     if (res.status === 203) {
    //         TokenIsExpires()
    //         return
    //     }
    //     localStorage.setItem("jwt", res.data.jwt);
    //     localStorage.setItem("user", JSON.stringify(res.data));
    //     window.location = "/";
    // });
    return<div> wait...</div>
}

export default GoogleCallBack