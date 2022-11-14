import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ThreeDots } from 'react-loader-spinner';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchImages from 'services/api';
import helper from 'Helper/Helper';
import Modal from './Modal/Modal';
import css from 'components/App.module.css';

function App() {
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageString, setImageString] = useState('');
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  useEffect(() => {
    setImageList([]);
  }, [imageString]);

  useEffect(() => {
    if (imageString === '') {
      return;
    }
    getImages();
  }, [imageString, page]);

  const handleInputSubmit = imageString => {
    setPage(1);
    setImageString(imageString);
    setIsShown(prevState => !prevState);
  };

  const getImages = () => {
    setIsLoading(true);

    fetchImages(imageString, page)
      .then(res => res.json())
      .then(data => {
        setImageList(prevState => [...prevState, ...helper(data.hits)]);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        setIsShown(true);
      });
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setIsShown(true);
  };

  const toggleModal = largeFoto => {
    setShowModal(prevState => !prevState);
    setBigImage(largeFoto);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleInputSubmit} />
      {imageList.length > 0 && (
        <ImageGallery array={imageList} toggleModal={toggleModal} />
      )}

      {isLoading && (
        <span className={css.ThreeDots}>
          <ThreeDots
            height="40"
            width="40"
            radius="9"
            color="black"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </span>
      )}
      {isShown && imageList.length >= 12 && <Button clickHandler={loadMore} />}
      {showModal && <Modal onClickModal={toggleModal} largeFoto={bigImage} />}
    </div>
  );
}

export default App;
