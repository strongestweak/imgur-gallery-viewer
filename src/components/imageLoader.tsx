import React, { FunctionComponent, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface OwnProps {
  /**
   * image on click
   */
  onClick?: () => void;
  /**
   * image url
   */
  url: string;
}

type Props = OwnProps;

/**
 * Image loader
 * @date 2022-05-27
 * @param {string} url image url
 * @param {Function} onClick on click event
 * @returns {ReactElement}
 *
 * @component
 * @example
 * return (
 *    <ImageLoading url="https://image1/" onClick={()=>alert("image is clicked!")} />
 * )
 */
const ImageLoader: FunctionComponent<Props> = ({ url, onClick, ...props }) => {
  const thumbnail = useMemo<string>(() => {
    const splitUrl = url.split(".");
    splitUrl[splitUrl.length - 2] += "b";
    return splitUrl.join(".");
  }, [url]);
  return (
    <LazyLoadImage
      alt={url}
      effect="blur"
      src={thumbnail}
      onClick={onClick}
      style={{
        cursor: "pointer",
        backgroundColor: "#333",
        objectFit: "cover",
        width: "100%",
        height: "auto",
        flexGrow: 1,
      }}
    />
  );
};

export default ImageLoader;
