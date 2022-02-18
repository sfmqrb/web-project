import React, {useEffect, useRef, useState} from "react";
import doTagsEditable from "../commonUtils/doTagsEditable";
import "./tagMaker.css";
import ax from "../../../services/httpService";
import cfg from "../../../config.json";
import getHeader from "../../../utils/getHeader";
import {CheckTag} from "../../../services/Tools";

//todo validate tags
const emptyTag = {
    id: "",
    name: "",
};

let newTag = {
    id: "",
    name: "",
};

export default function TagMaker(props) {
    const [tags, setTags] = useState(props.tags);
    const inputTagRef = useRef(null);
    const widthModifier = props.widthModifier || "";
    if (localStorage.getItem("tags") === null) {
        ax.get(cfg.apiUrl + "/tag/all", getHeader()).then((res) => {
            console.log(res);
            localStorage.setItem("tags", JSON.stringify(res.data))
            window.location.reload(false)
        });
    }

    function emptyInputs() {
        inputTagRef.current.value = "";
    }

    useEffect(() => {
        props.onChange(tags);
    }, [tags]);

    const handleDeleteTag = (key) => {
        console.log(`deleting ${key}`);
        const newTags = tags.filter((tag) => {
            const tmpKey = tag.id;
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
                {tagId: tag.model.id, name:tag.name},
            ];
            newTag = {...emptyTag};
            emptyInputs();
            setTags(newTags);
        }
    };

    return (
        <>
            {doTagsEditable(tags, props.isAdmin, handleDeleteTag, true)}
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
