import { useEffect, useState } from 'react';
import {
  getDocumentByID,
  getProductReviewFromUser,
} from '../../../services/firebase';
import { useTranslation } from 'react-i18next';
import Rating from '../../Rating/rating';
import ShowReview from '../../Rating/showReview';
import { doc, onSnapshot } from 'firebase/firestore';
import { fireStore } from '../../../config/firebaseConfig';
import { useHistory } from 'react-router-dom';

const ItemCard = ({ item, isDelivered }) => {
  const { t } = useTranslation();

  const [product, setProduct] = useState();
  const [review, setReview] = useState();

  let history = useHistory();

  const getProductData = async () => {
    // onSnapshot(doc(fireStore, 'Products', item.ProductID), productDoc => {
    //   setProduct(productDoc.data());
    // });
    return getDocumentByID('Products', item.ProductID).then(prd => {
      setProduct(prd);
      console.log(prd);
    });
  };

  useEffect(() => {
    getProductData();
  }, [item]);

  useEffect(() => {
    getProductReviewFromUser(localStorage.getItem('UID'), item.ProductID).then(
      rev => {
        setReview(rev);
      }
    );
  }, []);

  useEffect(() => {
    console.log(review);
  }, [review]);

  const goToProductPage = () => {
    history.push({
      pathname: `/products/${item.ProductID}`,
      state: {
        prod: {
          id: item.ProductID,
          productData: product,
        },
      },
    });
  };

  return (
    <div className='border col-12 row m-2' style={{ cursor: 'pointer' }}>
      {product && (
        <>
          <img
            src={product.Images[0]}
            alt={product.Name}
            className='col-3'
            onClick={goToProductPage}
          />
          <div className='col-7 p-2'>
            <h5>{product.Name}</h5>
            <small className='small-text-size fw-lighter'>
              {t('ProductPrice')}: {t('EGP')} {product.Price}
            </small>
            <br></br>
            <small className='small-text-size fw-lighter'>
              {t('PurchasedAmount')}: {item.Amount}
            </small>
            {review ? (
              <>
                <ShowReview productID={item.ProductID} review={review} />
              </>
            ) : (
              isDelivered && (
                <Rating
                  productID={item.ProductID}
                  onReviewSubmit={rev => setReview(rev)}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ItemCard;
