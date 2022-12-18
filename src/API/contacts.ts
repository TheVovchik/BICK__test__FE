'use strict';

import { Contact } from "../types/Contact";

const BASE_URL = 'https://bick-be.onrender.com/data';

export const getContacts = () => {
  const options = {
    method: 'GET',
  };

  return fetch(BASE_URL, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const getContact = (contactId: string) => {
  const options = {
    method: 'GET',
  };

  return fetch(`${BASE_URL}/form/${contactId}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const postContact = (data: Contact) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  };

  return fetch(`${BASE_URL}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const patchContact = (contactId: number, data: Contact) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  };

  return fetch(`${BASE_URL}/form/${contactId}`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const deleteContact = (contactId: number) => {
  const options = {
    method: 'DELETE',
  };

  return fetch(`${BASE_URL}/${contactId}`, options)
    .then();
}