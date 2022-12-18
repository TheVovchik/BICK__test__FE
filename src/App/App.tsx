import { FC } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import { Outlet } from 'react-router-dom';

export const App: FC = () => {
  return (
    <section className="phone-book">
      <h3 className="phone-book__section-name">
        PhoneBook
      </h3>
      
      <Outlet />
    </section>
  );
}
