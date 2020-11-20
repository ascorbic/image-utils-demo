import {
  IGatsbyImageHelperArgs,
  ImageFormat,
  Layout,
  useGatsbyImage,
  Fit,
  IImage,
} from "gatsby-plugin-image";

export function makeCloudinaryUrl(
  width: number,
  height: number,
  format: ImageFormat,
  fit: Fit,
  filename: string,
  cloudname: string
): string {
  const dot = filename.lastIndexOf(".");
  if (dot && dot !== -1) {
    filename = filename.substr(0, dot);
  }
  let crop: string;
  switch (fit) {
    case "fill":
      crop = "scale";
    case "inside":
      crop = "lfit";
    default:
      crop = "lfill";
  }

  const props = [`c_${crop}`];
  if (width) {
    props.push(`w_${width}`);
  }
  if (height) {
    props.push(`h_${height}`);
  }

  return `https://res.cloudinary.com/${cloudname}/image/upload/${props.join(
    ","
  )}/${filename}.${format}`;
}

export interface ICloudinaryImageProps {
  filename: string;
  cloudname: string;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  layout?: Layout;
  formats?: Array<ImageFormat>;
}

export function useCloudinaryImage({
  layout,
  cloudname,
  filename,
  ...props
}: ICloudinaryImageProps) {
  const generateImageSource = (
    filename: string,
    width: number,
    height: number,
    format: ImageFormat,
    fit?: Fit
  ): IImage => {
    return {
      width,
      height,
      format,
      src: makeCloudinaryUrl(width, height, format, fit, filename, cloudname),
    };
  };

  const args: IGatsbyImageHelperArgs = {
    pluginName: "useCloudinaryImage",
    generateImageSource,
    layout,
    filename,
    sourceMetadata: {
      width: (props.width || props.maxWidth) * 2,
      height: (props.height || props.maxHeight) * 2,
      format: undefined,
    },
    placeholderURL: makeCloudinaryUrl(
      20,
      undefined,
      "jpg",
      `cover`,
      filename,
      cloudname
    ),
  };
  return useGatsbyImage(args);
}
