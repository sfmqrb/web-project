import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./imageUploader.css";

function ImageUploader({
  onChange: setImagesParent,
  images: prImages,
  imageURLs: prImageURLs,
  isAdmin,
}) {
  const [images, setImages] = useState(prImages || []);
  const [imageURLs, setImageURLs] = useState(prImageURLs || []);

  const isNotAuthorizedToEdit = !isAdmin;

  const myRef = useRef();

  const reset = () => {
    myRef.current.value = "";
  };

  useEffect(() => {
    if (images.length < 0) {
      return;
    }
    setImagesParent(images);
    console.log(imageURLs.length, images.length);
  }, [images, imageURLs]);

  function handleChange(e) {
    console.log("imagesUploader :: handleChange");
    const newImages = [...e.target.files];
    const newImageURLs = newImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setImageURLs(newImageURLs);
    setImages(newImages);
  }

  function handleDeleteImage(idx) {
    console.log(`Deleting image ${idx}`);
    const nImages = [...images.filter((_, idxThis) => idx !== idxThis)];
    const nImageURLs = [...imageURLs.filter((_, idxThis) => idx !== idxThis)];
    setImages(nImages);
    setImageURLs(nImageURLs);
  }

  return (
    <>
      <label
        style={{ display: isNotAuthorizedToEdit ? "none" : "block" }}
        onClick={reset}
        for="file-upload"
        class="custom-file-upload btn margin-side-auto centered mb-3">
        Image Upload
      </label>
      <div class="container img-upload">
        <div className="row centered">
          <input
            ref={myRef}
            id="file-upload"
            type="file"
            multiple
            onChange={handleChange}
            multiple
          />
        </div>
      </div>
      {imageURLs.map((imageSrc, idx) => (
        <div key={idx} className="container">
          <div className="row">
            <img src={imageSrc} alt="uploaded" className="img-thumbnail" />
          </div>
          <div className="row">
            <button
              style={{ display: isNotAuthorizedToEdit ? "none" : "block" }}
              className="btn mb-3 delete-image  padding-auto centered"
              onClick={() => handleDeleteImage(idx)}>
              X
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ImageUploader;
