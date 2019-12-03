import React, { useState, useEffect } from "react";
import { Grid, Image, Loader, Button, Icon } from "semantic-ui-react";
import UploadPhotos from "./UploadPhotos";
import useUserLogin from "../../hooks/useUserLogin";
import { useDispatch } from "react-redux";
import { actionGetPhotos } from "../../redux/gallery/action";
import { get } from "lodash";
import useEvent from "../../hooks/useEvent";
import {
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAILED
} from "../../redux/gallery/type";

export default function Gallery(props) {
  const dispatch = useDispatch();
  const userLogin = useUserLogin();
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([])
  const [photoResData, setPhotoResData] = useState({})
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(true)
  // get list photos
  useEffect(() => {
    if (userLogin) {
      setLoading(true)
      dispatch(actionGetPhotos({ page: currentPage }, userLogin.id));
    }
  }, [userLogin]);

  useEvent(GET_PHOTOS_SUCCESS, res => {
    if (currentPage > 1) {
      if (currentPage <= 4 || (currentPage === 5 && res.data.data.length <= 5)) {
        setPhotos(photos.concat(Array.from(res.data.data)));
      } else {
        setPhotos(photos.concat(Array.from(res.data.data).splice(0,5)));
      }
    } else {
      setPhotos(res.data.data)
      setPhotoResData(res.data)
    }
    setLoading(false)
  });

  useEvent(GET_PHOTOS_FAILED, error => {
    console.log("Get photos erorr: ", error)
  });

  //detect bottom reached event anh load more photos
  const scrollListener = (e) => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const html = document.documentElement;
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= html.scrollHeight) {
      console.log('bottom reached')
      if (!loading) {
        setLoadMore(true)
      } 
    }
  }

  // add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });
//load more photos 
  useEffect(() => {
    if (loadMore) {
      console.log("loadMode:", loadMore)
      if (get(photoResData, "last_page", 1) > currentPage && currentPage <= 4) {
        setCurrentPage(currentPage + 1);
        setLoading(true);
        dispatch(actionGetPhotos({ page: currentPage + 1 }, userLogin.id));
      }
    }
    setLoadMore(false);
  }, [loadMore]);

  console.log(photos)

  // define upload button
  const uploadButton = (
    <div style={{position:"fixed", bottom:"60px", right:"20px"}}>
      <Button primary animated="vertical">
        <Button.Content hidden>Upload</Button.Content>
        <Button.Content visible>
          <Icon name="cloud upload" />
        </Button.Content>
      </Button>
    </div>
  );

  return (
    <div>
      <Grid >
        {photos && photos.map(photo => (
          <Grid.Column key={photo.id} mobile={16} tablet={8} computer={4}>
            <Image
              style={{ height: "180px", width:"100%"}}
              src={
                photo.image
                  ? photo.image
                  : "../../public/assets/images/default-image.png"
              }
            />
          </Grid.Column>
        ))}
      </Grid>
      {
        loading
          ? <div style={{ padding:"40px"}}>
            <Loader active inline='centered' />
          </div>
          : null
      }
      <UploadPhotos uploadButton={uploadButton} />
    </div>
  );
}
