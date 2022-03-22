import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './i18n/config';
import Navbar from './components/navbar/navbar';
import Home from './pages/home.jsx';
import Footer from './components/footer/footer';
import SignIn from './components/SignIn/SignInPage';
import LogIn from './components/LogIn/LogIn';
import Products from './pages/products/products';
import Menu from './components/menu/menu';
import SubCategory from './pages/subCategory';
import StoresPage from './pages/storeLocation';
import Profile from './pages/profile';
import ProductA from './components/productA/productA';
import ShoppingCart from './pages/shoppingCart';
import { useTranslation } from 'react-i18next';

import GuardedRoute from 'react-guarded-route';
import FavouritePage from './pages/favouritePage';
import ProductsSearch from './pages/productsSearch';

import Order from './pages/order';

import { updateUserStorageByID } from './services/firebase';

function App() {
  const loginValidator = () => {
    // If there is UID it will return false, otherwise it will return true
    return !localStorage.getItem('UID');
  };

  const profileValidator = () => {
    // If there is UID it will return true, otherwise it will return false
    return !!localStorage.getItem('UID');
  };

  const checkoutValidator = () => {
    // If there is UID it will return true, otherwise it will return false
    // if (!!localStorage.getItem('UID')) {
    //   return true;
    // } else {
    //   setInOrderProcess(false);
    //   return false;
    // }

    return !!localStorage.getItem('UID');
  };

  const { i18n } = useTranslation();

  useEffect(() => {
    localStorage.getItem('UID') &&
      updateUserStorageByID(localStorage.getItem('UID'));
  }, []);

  return (
    <div dir={i18n.dir()}>
      <Menu />
      <div
        className={`${
          i18n.dir() === 'ltr' ? 'body-container-ltr' : 'body-container-rtl'
        }`}
      >
        <div className='body-container'>
          <Navbar />

          <div className='mt-nav-4 pt-nav border-top'>
            <Switch>
              <Redirect from='/' exact to='/home' />

              <Route path='/home' component={Home} />
              <Route path='/stores' component={StoresPage} />
              <Route
                path='/category/:type/:name/:id/:subName/:subId/:prodName/:prodId'
                component={ProductA}
              />
              <Route
                path='/category/:type/:name/:id'
                exact
                component={SubCategory}
              />
              <Route path='/stores' component={StoresPage} />
              <Route path='/shoppingcart' component={ShoppingCart} />
              <Route
                path='/category/:type/:name/:id/:subName/:subId'
                exact
                component={Products}
              />
              <Route path='/offers/:sale' exact component={Products} />
              <Route path='/whatsnew/:newArrival' exact component={Products} />
              <Route path='/products/:pId' exact component={ProductA} />

              <Route
                path='/productsSearch/:query'
                exact
                component={ProductsSearch}
              />

              <Route path='/favorite' exact component={FavouritePage} />

              <GuardedRoute
                path='/login'
                component={LogIn}
                redirectTo='/profile'
                validatorFunction={loginValidator()}
              ></GuardedRoute>

              <GuardedRoute
                path='/sign'
                component={SignIn}
                redirectTo='/profile'
                validatorFunction={loginValidator()}
              ></GuardedRoute>

              <GuardedRoute
                path='/profile'
                component={Profile}
                redirectTo='/sign'
                validatorFunction={profileValidator()}
              ></GuardedRoute>

              <GuardedRoute
                path='/checkout'
                component={Order}
                redirectTo='/login'
                validatorFunction={checkoutValidator()}
              ></GuardedRoute>
            </Switch>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
