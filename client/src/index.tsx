import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HousingPage } from './pages/HousingPage';
import { TentPage } from './pages/TentPage';
import { MansionPage } from './pages/MansionPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/majutus',
    element: <HousingPage/>,
    children: [
      {
        path: '/majutus/tent',
        element: <TentPage/>
      },
      {
        path: '/majutus/haarber',
        element: <MansionPage/>
      }
    ]
  },
  {
    path: '/meist',
    element: <AboutPage/>
  },
  {
    path: '/galerii',
    element: <GalleryPage/>
  },
  {
    path: '/kontakt',
    element: <ContactPage/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
