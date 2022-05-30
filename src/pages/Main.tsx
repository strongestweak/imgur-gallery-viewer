import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import { axiosInstance } from "./../axiosInstance";
import ImageList from "./../components/ImageList";
import { Store } from "react-notifications-component";
import { Helmet } from "react-helmet";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

/**
 * @name FetchHandler
 * fetch data parameter
 */
interface FetchHandler {
  /**
   * @param {number} page page for the api query
   */
  page?: number;
}

/**
 * Main page of the app
 * @date 2022-05-27
 * @returns {ReactElement}
 *
 * @component
 * @example
 * return(
 *    <MainPage/>
 * )
 */
const MainPage: FunctionComponent<Props> = (props) => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const timeout = useRef<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * @param {FetchHandler} args fetch data from url
   */
  const fetchData = async (args?: FetchHandler) => {
    if (isLoading) return false;
    const { page = 1 } = args || {};
    setIsLoading(true);
    try {
      const {
        data: { data: results },
      } = await axiosInstance("/gallery/r/pics/time/" + page);
      setData((data) => [...data, ...results.map((e: any) => e?.link)]);
    } catch (err: any) {
      Store.addNotification({
        title: "Error",
        message: err.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        id: "error",
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      console.log("datadata", page);
      fetchData({ page });
    }, 100);
  }, [page]);

  /**
   * function to call when image list scroll reached the bottom
   */
  const onBottomReached = () => {
    setPage((page) => page + 1);
  };
  return (
    <>
      <Helmet>
        <title>Imgur Gallery</title>
      </Helmet>
      <ImageList data={data} onBottomReached={onBottomReached} />
    </>
  );
};

export default MainPage;
