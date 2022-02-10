import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./imageUploader.css";

function ImageUploader({ onChange: setImagesParent }) {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    console.log(`Uploading images ${images.length}`);
    if (images.length < 0) {
      return;
    }
    const imageURLs = images.map((image) => {
      return URL.createObjectURL(image);
    });
    setImageURLs(imageURLs);
  }, [images]);

  function handleChange(e) {
    setImages([...e.target.files]);
    setImagesParent([...e.target.files]);
  }

  return (
    <>
      <label for="file-upload" class="custom-file-upload btn margin-auto">
        Image Upload
      </label>
      <div class="container ">
        <div className="row centered">
          <input
            id="file-upload"
            className="uploader "
            type="file"
            multiple
            onChange={handleChange}
            multiple
          />
        </div>
      </div>
      {imageURLs.map((imageSrc) => (
        <div className="container">
          <div className="row">
            <img src={imageSrc} alt="uploaded" className="img-thumbnail" />
          </div>
          <div className="row">
            <button
              className="btn mb-3 delete-image "
              onClick={handleDeleteImage(imageSrc)}>
              X
            </button>
          </div>
        </div>
      ))}
    </>
  );

  function handleDeleteImage(imageSrc) {
    return () => {
      setImageURLs(imageURLs.filter((image) => image !== imageSrc));
      setImages(images.filter((image) => image !== imageSrc));
    };
  }
}

export default ImageUploader;
