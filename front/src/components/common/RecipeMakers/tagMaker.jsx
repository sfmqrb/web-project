import React, {useEffect, useRef, useState} from "react";
import doTagsEditable from "../commonUtils/doTagsEditable";
import "./tagMaker.css";
import ax from "../../../services/httpService";
import cfg from "../../../config.json";
import getHeader from "../../../utils/getHeader";
import {CheckTag, TokenIsExpires} from "../../../services/Tools";

//todo validate tags
const emptyTag = {
    tagId: "",
    name: "",
};

let newTag = {
    tagId: "",
    name: "",
};

export default function TagMaker(props) {
    const [tags, setTags] = useState(props.tags);
    const inputTagRef = useRef(null);
    const widthModifier = props.widthModifier || "";
    const title = props.title
    if (localStorage.getItem("tags") === null) {
        ax.get(cfg.apiUrl + "/tag/all", getHeader()).then((res) => {
            console.log(res);
            if (res.status === 203){
                TokenIsExpires()
                return
            }
            localStorage.setItem("tags", JSON.stringify(res.data))
            window.location.reload(false)
        });
    }

    function emptyInputs() {
        inputTagRef.current.value = "";
    }

    useEffect(() => {
        props.onChange(tags);
        console.log("tags in tagMaker ", JSON.stringify(tags))
    }, [tags]);

    const handleDeleteTag = (key) => {
        console.log(`deleting ${key}`);
        const newTags = tags.filter((tag) => {
            console.log("tag in delete", tag)
            const tmpKey = tag.tagId;
            return tmpKey !== key;
        });
        setTags(newTags);
    };

    const handleClick = () => {
        if (inputTagRef.current.value === "") {
            alert("Please enter a valid tag");
            return;
        }
        const tag = CheckTag(newTag.name)
        if (tag == null) {
            alert("this tag dont exist");
            return;
        } else {
            const newTags = [
                ...tags,
                {tagId: tag.model.id, name: tag.name},
            ];
            newTag = {...emptyTag};
            emptyInputs();
            setTags(newTags);
        }
    };

    return (
        <>
            {doTagsEditable(tags, props.isAdmin, handleDeleteTag, true, title)}
            {props.isAdmin ? (
                <div>
                    {addNewTag(newTag, inputTagRef, widthModifier)}
                    <button
                        className="btn btn-info inline-button  hard-inline"
                        style={{width: "fit-content"}}
                        onClick={handleClick}>
                        Add Tag
                    </button>
                </div>
            ) : null}
        </>
    );
}

function addNewTag(newIng, inputTagRef, widthModifier = "") {
    return (
        <div className="hard-inline input-vertical-align ">
            <input
                className="form-control tag-input input-vertical-align "
                style={{width: `${widthModifier}`}}
                ref={inputTagRef}
                type="text"
                placeholder="tag name"
                onChange={(e) => {
                    newIng.name = e.target.value;
                }}
            />
        </div>
    );
}
