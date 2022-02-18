import React, {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./imagesUploader.css";
import TitleMellow from "../Titles/titleMellow";
import ax from "../../../services/httpService";
import cfg from "../../../config.json";

function ImageUploader({
                           onChange: setImageUrlParent,
                           imageURL: prImageURL,
                           isAdmin,
                       }) {
    const [imageURL, setImageURL] = useState(prImageURL || "");

    const isNotAuthorizedToEdit = !isAdmin;

    const myRef = useRef();

    const reset = () => {
        myRef.current.value = "";
    };

    useEffect(() => {
        setImageUrlParent(imageURL);
        console.log("image url" + imageURL)
    }, [imageURL]);

    function uploadImage(image) {
        console.log("image   " + image.name)
        ax.post(cfg.apiUrl + "/image/" + image.name, image).then((res) => {
            console.log(res.status)
            console.log(res.data.fileName)
            setImageURL(res.data.fileName)
        });
    }

    function handleChange(e) {
        if (e.target.files.length === 0) {
            setImageURL("")
            return
        }
        const newImage = e.target.files[0]
        uploadImage(newImage)
        console.log("im  ")
        console.log(newImage)
    }

    function handleDeleteImage() {
        setImageURL("")
    }

    return (
        <>
            <label
                style={{display: isNotAuthorizedToEdit ? "none" : "block"}}
                onClick={reset}
                htmlFor="file-upload"
                className="custom-file-upload btn margin-side-auto centered mb-3">
                <TitleMellow title="Upload Images"/>
            </label>
            <div className="container img-upload">
                <div className="row centered">
                    <input
                        ref={myRef}
                        id="file-upload"
                        type="file"
                        onChange={handleChange}
                    />
                </div>
            </div>
            {imageURL && (
                <div key={0} className="container">
                    <div className="row">
                        <img src={imageURL} alt="uploaded" className="img-thumbnail"/>
                    </div>
                    <div className="row">
                        <button
                            style={{display: isNotAuthorizedToEdit ? "none" : "block"}}
                            className="btn mb-3 delete-image  padding-auto centered"
                            onClick={() => handleDeleteImage()}>
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageUploader;
