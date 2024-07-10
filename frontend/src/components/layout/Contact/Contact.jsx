
import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ncsoni04@gmail.com">
        <Button>Email: ncsoni04@gmail.com</Button>
      </a>
      <a className="mailBtn" href="tel:+918320522371">
        <Button>Contact: +91 8320522371</Button>
      </a>
    </div>
  );
};

export default Contact;
