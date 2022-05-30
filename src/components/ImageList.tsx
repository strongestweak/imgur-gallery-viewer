import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import ImageListLib from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import ImageViewer from "react-simple-image-viewer";
import { grey } from "@mui/material/colors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ImageLoader from "./imageLoader";

interface OwnProps {
  // Add some types here
  data: string[];
  onBottomReached: () => void;
}

type Props = OwnProps;

/**
 * List of images
 * @date 2022-05-27
 * @param {string[]} data image list
 * @param {Function} onBottomReached functionm that will call if the list scrolled reached the bottom
 * @returns {ReactElement}
 * @component
 * @example
 * return(
 *      <ImageList
 *            data={["https://image1/","https://image2/"]}
 *            onBottomReached={()=>fetchNextPage()}
 *      />)
 */
const ImageList: FunctionComponent<Props> = ({
  data,
  onBottomReached,
  ...props
}) => {
  const rowHeight = 164;
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [cols, setCols] = useState<number>(0);
  const timeout = useRef<any>(null);

  const forceCheckScroll = () => {
    const mainLayout = document.getElementById("main-layout");
    onScroll({ target: mainLayout });
  };

  const onResize = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      forceCheckScroll();
    }, 1000);
    setCols(Math.round(window.innerWidth / rowHeight));
  };

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const onScroll = (listInnerRef: any) => {
    if (listInnerRef.target) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.target;
      if (scrollTop + clientHeight === scrollHeight) {
        onBottomReached();
      }
    }
  };

  useEffect(() => {
    onResize();
    const mainLayout = document.getElementById("main-layout");
    mainLayout?.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      mainLayout?.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      forceCheckScroll();
    }
  }, [data]);

  return (
    <>
      <ImageListLib
        cols={cols}
        rowHeight={rowHeight}
        sx={{ margin: 0, padding: theme.spacing(1) }}
      >
        {data.map((item: string, index) => (
          <ImageListItem
            key={item}
            sx={{
              overflow: "hidden",
              backgroundColor: grey[500],
            }}
          >
            <ImageLoader url={item} onClick={() => openImageViewer(index)} />
          </ImageListItem>
        ))}
      </ImageListLib>
      {isViewerOpen && (
        <ImageViewer
          src={data}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};

export default ImageList;
