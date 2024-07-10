import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/nisharg_04/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dpmqjd6lf/image/upload/v1719641999/NIsharg_Formal_gscnqx.jpg"
              alt="Founder"
            />
            <Typography>Nisharg Soni</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>This is a sample wesbite made by @nishargSoni</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Socials</Typography>
            <a href="https://www.instagram.com/nisharg_04/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            .
            <a
              href="https://www.linkedin.com/in/nisharg-soni-b93688289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="blank"
            >
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
