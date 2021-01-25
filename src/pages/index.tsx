import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { CloudinaryImage } from "../cloudinary-image";
import { useCloudinaryImage } from "../use-cloudinary-image";

export default function Index(): JSX.Element {
  return (
    <CloudinaryImage
      filename="dog.jpg"
      cloudname="demo"
      layout="fullWidth"
      alt="Dog"
    />
  );
}
