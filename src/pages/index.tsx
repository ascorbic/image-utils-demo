import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { useCloudinaryImage } from "./use-cloudinary-image";

export default function Index(): JSX.Element {
  const image = useCloudinaryImage({
    layout: "constrained",
    width: 800,
    height: 550,
    filename: "dog.jpg",
    cloudname: "demo",
    formats: ["auto", "webp", "avif"],
  });

  return <GatsbyImage image={image} alt="Dog" />;
}
