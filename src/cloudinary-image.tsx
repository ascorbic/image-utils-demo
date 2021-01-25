import React from "react";
import {
  useCloudinaryImage,
  UseCloudinaryImageProps,
} from "./use-cloudinary-image";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";

export type CloudinaryImageProps = Omit<GatsbyImageProps, "image"> &
  UseCloudinaryImageProps;

export function CloudinaryImage({
  filename,
  cloudname,
  width,
  height,
  maxWidth,
  layout,
  aspectRatio,
  ...props
}: CloudinaryImageProps): JSX.Element {
  const image = useCloudinaryImage({
    filename,
    cloudname,
    width,
    height,
    maxWidth,
    layout,
    aspectRatio,
  });
  return <GatsbyImage image={image} {...props} />;
}
