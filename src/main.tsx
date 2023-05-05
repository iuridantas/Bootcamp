import React, { useContext, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalContext from './CONTEXT';
import { RegisterFranchise } from './pages/Register-Franchise';
import { Login } from './pages/Login';
import { Franchise } from './pages/Franchise/franchise';
import { RegisterUser } from './pages/Register-User';
import { Product } from './pages/product';
import { RegisterProduct } from './pages/registerProduct';
import { RegisterCustomer } from './pages/registerCustomer';
import { RegisterFincance } from './pages/registerFinance';
import { RegisterCall } from './pages/registerCall';
import { Header } from './COMPONENTS/header/header';
import { Finance } from './pages/Finance';
import { User } from './pages/user';
import { Profile } from './pages/profile';
import { Dashboard } from './pages/dashboard';
import { Call } from './pages/call';
import { Welcome } from './pages/Welcome';
import { Customer } from './pages/customer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/homeFranchise" element={<Dashboard />} />
          <Route path="/homeFranchisee" element={<Dashboard />} />
          <Route path="/dashboard/find/:franchiseId" element={<Dashboard />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/franchisee" element={<Franchise />} />
          <Route path="/registerFranchise" element={<RegisterFranchise />} />
          <Route path="/franchise/update/:id" element={<RegisterFranchise />} />
          <Route path="/user" element={<User />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/user/update/:id" element={<RegisterUser />} />
          <Route path="/product/find/:franchiseId" element={<Product />} />
          <Route path="/registerProduct" element={<RegisterProduct />} />
          <Route path="/product/update/:id" element={<RegisterProduct />} />
          <Route path="/customer/find/:franchiseId" element={<Customer />} />
          <Route path="/registerCustomer" element={<RegisterCustomer />} />
          <Route path="/customer/update/:id" element={<RegisterCustomer />} />
          <Route path="/finance/find/:franchiseId" element={<Finance />} />
          <Route path="/registerFinance" element={<RegisterFincance />} />
          <Route path="/finance/update/:id" element={<RegisterFincance />} />
          <Route path="/call/find/:franchiseId" element={<Call />} />
          <Route path="/registerCall" element={<RegisterCall />} />
          <Route path="/call/update/:id" element={<RegisterCall />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  </React.StrictMode>,
);
