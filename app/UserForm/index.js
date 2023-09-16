"use client";
import { useState, useRef, useContext } from "react";
import { FormContext } from "../utils";
import styles from "./userform.module.css";

export const UserForm = ({ action }) => {
  const { proxyFormData, setState } = useContext(FormContext);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    proxyFormData[name] = value;
  };

  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      action={action}
      className={styles.form}
      onReset={() => {
        setImageSrc(null);
        setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      }}
    >
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={proxyFormData.firstName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={proxyFormData.lastName}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        value={proxyFormData.email}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={proxyFormData.phone}
        onChange={handleInputChange}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
      />

      <label htmlFor="avatar">Avatar</label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      {imageSrc ? (
        <label htmlFor="avatar">
          <img src={imageSrc} alt="avatar" className={styles.avatarImage} />
        </label>
      ) : (
        <label htmlFor="avatar">Select Image</label>
      )}

      <button type="reset">Reset</button>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};
