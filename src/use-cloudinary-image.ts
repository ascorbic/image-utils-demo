import {
  IGatsbyImageHelperArgs,
  ImageFormat,
  Layout,
  useGatsbyImage,
  Fit,
  IImage,
} from "gatsby-plugin-image";

const EVERY_BREAKPOINT = [
  320,
  654,
  768,
  1024,
  1366,
  1600,
  1920,
  2048,
  2560,
  3440,
  3840,
  4096,
];

export function makeCloudinaryUrl(
  width: number,
  height: number,
  format: ImageFormat = "auto",
  fit: Fit,
  filename: string,
  cloudname: string
): string {
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
  props.push(`f_${format}`);

  return `https://res.cloudinary.com/${cloudname}/image/upload/${props.join(
    ","
  )}/${filename}`;
}

export interface ICloudinaryImageProps {
  filename: string;
  cloudname: string;
  width?: number;
  height?: number;
  maxWidth?: number;
  layout?: Layout;
  aspectRatio?: number;
}

export function useCloudinaryImage({
  layout = "constrained",
  cloudname,
  filename,
  width,
  height,
  aspectRatio,
  maxWidth,
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

  const breakpoints = maxWidth
    ? EVERY_BREAKPOINT.filter((bp) => bp <= maxWidth)
    : EVERY_BREAKPOINT;

  if (layout === "fullWidth") {
    width ||= maxWidth || breakpoints[breakpoints.length - 1];
    height ||= aspectRatio ? width / aspectRatio : width / (4 / 3);
  } else {
    if (!width || (!height && !aspectRatio)) {
      console.warn(
        `You must provide width and height for images where layout is ${layout}`
      );
    }
    width ||= 800;
    if (aspectRatio) {
      height ||= width / aspectRatio;
    }
  }

  const args: IGatsbyImageHelperArgs = {
    ...props,
    pluginName: "useCloudinaryImage",
    generateImageSource,
    layout,
    filename,
    formats: ["auto"],
    breakpoints,
    sourceMetadata: {
      width,
      height,
      format: "auto",
    },
  };
  return useGatsbyImage(args);
}
