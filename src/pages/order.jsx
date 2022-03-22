import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AddressAccordion from '../components/order/addressAccordion';
import InvoiceAccordion from '../components/order/invoiceAccordion';
import ReviewAccordion from '../components/order/reviewAccordion';
import { LocationProvider } from '../contexts/locationContext';

import { getDocumentByID, setUserLocation } from '../services/firebase';

const Order = () => {
  const [locations, setLocations] = useState();
  const [locationsExist, setLocationsExist] = useState();

  const user = useSelector(state => state.user.user);
  const [userLocations, setUserLocations] = useState([]);

  const purchasedItems = useSelector(state => state.cartProducts.cartProducts);
  const totalOrderPrice = useSelector(state => state.cartProducts.totalPrice);

  const { register, getValues, reset } = useForm();
  const [gov, setGov] = useState({});

  const [addressCollapse, setAddressCollapse] = useState(true);

  const addressAccordionBtn = useRef();
  const invoiceAccordionBtn = useRef();
  const reviewAccordionBtn = useRef();

  const addressAccordionCollapse = useRef();
  const invoiceAccordionCollapse = useRef();
  const reviewAccordionCollapse = useRef();

  const handleAddressForm = e => {
    e.preventDefault();

    !locationsExist && setLocationsExist(true);

    const newLocation = { ...getValues(), ...gov };

    setUserLocations([newLocation, ...userLocations]);
    setUserLocation(localStorage.getItem('UID'), newLocation);
    setCheckedAddress(0);

    reset({ name: '' });
    reset({ email: '' });
    reset({ address: '' });
    reset({ building: '' });

    handleAddressNext();
  };

  const handleAddressNext = () => {
    addressAccordionBtn.current.classList.add('collapsed');
    addressAccordionCollapse.current.classList.add('collapse');

    invoiceAccordionBtn.current.classList.remove('collapsed');
    invoiceAccordionCollapse.current.classList.remove('collapse');
  };

  const handleInvoiceBack = () => {
    invoiceAccordionBtn.current.classList.add('collapsed');
    invoiceAccordionCollapse.current.classList.add('collapse');

    addressAccordionBtn.current.classList.remove('collapsed');
    addressAccordionCollapse.current.classList.remove('collapse');
  };

  const handleInvoiceNext = () => {
    invoiceAccordionBtn.current.classList.add('collapsed');
    invoiceAccordionCollapse.current.classList.add('collapse');

    reviewAccordionBtn.current.classList.remove('collapsed');
    reviewAccordionCollapse.current.classList.remove('collapse');
  };

  const handleReviewBack = () => {
    reviewAccordionBtn.current.classList.add('collapsed');
    reviewAccordionCollapse.current.classList.add('collapse');

    invoiceAccordionBtn.current.classList.remove('collapsed');
    invoiceAccordionCollapse.current.classList.remove('collapse');
  };

  const [continuePayment, setContinuePayment] = useState(false);

  const handleReviewNext = () => {
    setContinuePayment(true);
  };

  const [checkedAddress, setCheckedAddress] = useState(0);

  useEffect(() => {
    getDocumentByID('governorate', 'VZsmOmwYmRM8qL2TAnqR').then(data => {
      setLocations(data.Governorates);
    });
  }, []);

  useEffect(() => {
    user.Locations ? setLocationsExist(true) : setLocationsExist(false);
    const userLoc = user.Locations;

    if (userLoc instanceof Array && userLoc.length !== 0) {
      setUserLocations([...user.Locations]);
    }
  }, [user.Locations, locationsExist]);

  return (
    <LocationProvider
      value={{ checkedAddress, setCheckedAddress, userLocations }}
    >
      <div className='order-container'>
        <div className='accordion accordion-flush' id='accordionFlushExample'>
          <AddressAccordion
            addressAccordionBtn={addressAccordionBtn}
            addressAccordionCollapse={addressAccordionCollapse}
            user={user}
            setAddressCollapse={setAddressCollapse}
            addressCollapse={addressCollapse}
            handleAddressForm={handleAddressForm}
            register={register}
            locations={locations}
            handleAddressNext={handleAddressNext}
            userLocations={userLocations}
            setGov={setGov}
            gov={gov}
            locationsExist={locationsExist}
          />

          <InvoiceAccordion
            invoiceAccordionBtn={invoiceAccordionBtn}
            invoiceAccordionCollapse={invoiceAccordionCollapse}
            purchasedItems={purchasedItems}
            totalOrderPrice={totalOrderPrice}
            handleInvoiceBack={handleInvoiceBack}
            handleInvoiceNext={handleInvoiceNext}
          />

          <ReviewAccordion
            reviewAccordionBtn={reviewAccordionBtn}
            reviewAccordionCollapse={reviewAccordionCollapse}
            user={user}
            handleReviewBack={handleReviewBack}
            handleReviewNext={handleReviewNext}
            continuePayment={continuePayment}
            totalOrderPrice={totalOrderPrice}
          />
        </div>
      </div>
    </LocationProvider>
  );
};

export default Order;
