import React from 'react'
import { GrFacebook } from 'react-icons/gr'
import { TiSocialInstagram } from 'react-icons/ti'
import { ImTwitter } from 'react-icons/im'
import { IoLogoYoutube } from 'react-icons/io'
import { ListGroup } from 'react-bootstrap'



const Footer = () => {
  return (
    <div>
      <footer className="container">
        <div className="row social-icons">
          <div className="container">
            <ListGroup horizontal>
              <ListGroup.Item style={{ backgroundColor: "black", fontSize: "20px", paddingLeft: "5px" }}> <GrFacebook></GrFacebook></ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "black", fontSize: "20px", paddingLeft: "5px" }}> <TiSocialInstagram></TiSocialInstagram></ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "black", fontSize: "20px", paddingLeft: "5px" }}> <ImTwitter></ImTwitter></ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: "black", fontSize: "20px", paddingLeft: "5px" }}> <IoLogoYoutube></IoLogoYoutube></ListGroup.Item>
            </ListGroup>
            <div className="row">
              <div className="col col-12 col-sm-6 col-lg-3 px-0 footer-info ">
                <ul>
                  <li>Audio and Subtitles</li>
                  <li>Media Center</li>
                  <li>Privacy</li>
                  <li>Contact Us</li>
                  <br />
                  <br />
                  <li className="box">Service Code</li>
                  <li >#169 1997-2021 Netflix, Inc.</li>
                </ul>
              </div>
              <div className="col col-12 col-sm-6 col-lg-3 px-0 footer-info">
                <ul>
                  <li>Audio Description</li>
                  <li>Investor Relations</li>
                  <li>Legal Notices</li>
                </ul>
              </div>
              <div className="col col-12 col-sm-6 col-lg-3 px-0 footer-info">
                <ul>
                  <li>Help Center</li>
                  <li>Jobs</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
              <div className="col col-12 col-sm-6 col-lg-3 px-0 footer-info">
                <ul>
                  <li>Gift Cards</li>
                  <li>Terms of Use</li>
                  <li>Corporate Information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
