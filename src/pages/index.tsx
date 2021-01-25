import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useCloudinaryImage } from "../use-cloudinary-image";

export default function Index(): JSX.Element {
  const image = useCloudinaryImage({
    layout: "fullWidth",
    filename: "dog.jpg",
    cloudname: "demo",
  });
  return <GatsbyImage image={image} alt="Dog" />;
}
