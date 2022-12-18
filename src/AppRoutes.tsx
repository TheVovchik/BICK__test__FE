import { FC } from 'react';
import {
  HashRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import { App } from './App/App';
import { Form } from './components/Form';
import { PageNotFound } from './components/PageNotFound';
import { PhoneBook } from './components/PhoneBook';
import { Table } from './components/Table';

export const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={<PhoneBook />}
          />
          
          <Route
              path="/home"
              element={<Navigate to='/' />}
            />
            <Route path="form">
              <Route 
                index 
                element={<Form />}
              />
              <Route
                path=":openedFormId"
                element={<Form />}
              />
            </Route>
            
            <Route
              path="*"
              element={<PageNotFound />}
            />
        </Route>
      </Routes>
    </Router>
  )
}
