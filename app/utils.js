"use client";
import { useState, createContext, useEffect } from "react";

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Formats a phone number.
 * @param {string} value - The string containing the phone number.
 * @returns {string} The formatted phone number.
 */
export const formatPhone = (value) => {
  value = value.replace(/\D/g, "");
  if (value.length > 3) {
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  return value;
};

/**
 * Retrieves saved form data from local storage.
 * @returns {object|null} The saved form data or null if none exists.
 */
export const getFormDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : null;
  }
  return null;
};

/**
 * Creates a proxy object that updates the form state and saves the form data to local storage.
 */

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    imageSrc: null,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const savedData = getFormDataFromLocalStorage();
    if (savedData) {
      setState(savedData);
    }
  }, []);

  const formatFunctions = {
    phone: formatPhone,
    firstName: capitalizeFirstLetter,
    lastName: capitalizeFirstLetter,
  };

  const formHandler = {
    get: function (obj, prop) {
      return obj[prop];
    },
    set(obj, property, value) {
      if (formatFunctions[property]) {
        value = formatFunctions[property](value.trim());
      } else {
        value = value.trim();
      }

      obj[property] = value;

      // Save the form data to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(obj));
      }
      setState({ ...obj });
      return true;
    },
  };

  const proxyFormData = new Proxy(state, formHandler);

  return (
    <FormContext.Provider value={{ proxyFormData, setState }}>
      {children}
    </FormContext.Provider>
  );
};
