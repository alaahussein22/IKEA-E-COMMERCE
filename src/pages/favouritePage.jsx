import { useSelector } from 'react-redux';
import FavouriteCard from '../components/cards/favouriteCard';
import '../assets/scss/pages/_favourite.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const FavouritePage = () => {
  const favItems = useSelector((state) => state.favourits.favourits);
  const { t } = useTranslation();

  return (
    <>
      <div className='fav-parent'>
        <div className='container'>
          <div className='center-fav-page'>
            {favItems.length === 0 && (
              <section className='d-flex flex-column mx-auto col-5'>
                <img
                  className='mx-auto'
                  src='https://order.ikea.com/eg/en/checkout/static/media/ill-alien.cb42647f.svg'
                  width='50%'
                />
                <p className='text-center'>{t('NotReady')}</p>
                <p className='text-center'>{t('SaveUntilReady')}</p>
                <div className='d-flex justify-content-center'>
                  <Link to='/home' className='card-button d-flex justify-content-center'>
                  <button className='text-white'>{t('BrowseProducts')}</button>
                  </Link>
                </div>
              </section>
            )}
            {/* <div className='shopping-total-price'>
              <h6>Go to product and click on heart icon to save product in this page</h6>
            </div> */}
            {favItems.length !== 0 && (
              <>
                <div className='fav-frow'>
                  <h3>{t('WishList')}</h3>
                </div>

                <div className='fav-srow'>
                  <h6></h6>
                  <h6>{t('BuyOnline')}</h6>
                  <h6 className='availbility'>{t('AvailableInStore')}</h6>
                  <h6></h6>
                </div>
                <hr />

                <section className='row shopping-page'>
                  <section className='col-12 left-shopping-page'>
                    {favItems.map((item) => {
                      return (
                        <FavouriteCard
                          id={item.id}
                          key={item.id}
                          product={item.productData}
                          purchasedQuantity={item.PurchasedAmount}
                        />
                      );
                    })}
                  </section>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FavouritePage;
