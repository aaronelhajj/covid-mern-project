import React from "react";

const Image = ({ name }) => {
  try {
    // Import image on demand
    const image = require(`../images/${name}.png`);
    // If the image doesn't exist. return null
    if (!image) return null;
    return <img src={image.default} />;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};

export default Image;