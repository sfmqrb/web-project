import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <input type="file" multiple onChange={handleChange} multiple />
      {imageURLs.map((imageSrc) => (
        <img src={imageSrc} alt="uploaded" style={{ width: 300 }} />
      ))}
    </>
  );
}

export default ImageUploader;
