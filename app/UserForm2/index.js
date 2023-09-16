"use client";
import { useState, useContext } from "react";
import { FormContext } from "../utils";
import styles from "./userform.module.css";

export const UserForm2 = () => {
  const { proxyFormData, setState } = useContext(FormContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    proxyFormData[name] = value;
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.form}>
      <label htmlFor="phone">Phone</label>
      {isEditing ? (
        <>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={proxyFormData.phone}
            onChange={handleInputChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <span onClick={handleEditClick}>{proxyFormData.phone}</span>
      )}
    </div>
  );
};
