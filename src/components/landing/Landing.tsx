import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SolidBtn } from "../_common/buttons/SolidBtn";
import hero_dark from "../../images/hero_dark.svg";
import "./Landing.css";
import { DarkModeContext } from "../../contexts";
import { Footer } from "../_common/Footer";
import { Feature } from "./Feature";
import classroom_feature from "../../images/1classroomx96.png";
import participation_feature from "../../images/participation_feature.svg";
import anonymous_feature from "../../images/anonymous_feature.svg";
import expressive_feature from "../../images/expressive_feature.svg";

interface Props {}

export const Landing = (props: Props) => {
  const darkModeCtx = useContext(DarkModeContext)!;
  if (!darkModeCtx.darkMode) darkModeCtx.toggleDarkMode();
  return (
    <div className="landing-page">
      <div className="hero">
        <img src={hero_dark} alt="Chomp" width="100%" />
      </div>
      <div className="landing-content">
        <div className="main-tagline">Got a question?</div>
        <div className="sub-tagline">Ask it!</div>
        <div className="landing-description">
          Chomp makes it easy for students to ask and answer each others'
          questions.
        </div>
        <div className="features">
          <Feature
            title="Compatible with Google Classroom™"
            image={classroom_feature}
            alt="Google Classroom"
          >
            Create a new Chomp class from an existing Classroom class.
          </Feature>
          <Feature
            title="Participation Stats"
            image={participation_feature}
            alt="Raised Hand"
          >
            Collect participation data for a class automatically.
          </Feature>
          <Feature
            title="Expressive Messages"
            image={expressive_feature}
            alt="Markdown and Tex"
          >
            Messages can be written in Markdown and TeX (Rendered with KaTex).
          </Feature>
          <Feature
            title="Optional Anonymity"
            image={anonymous_feature}
            alt="Incognito Mode"
          >
            Students can ask and answer questions anonymously.
            <br />{" "}
            <span className="small-txt">
              Teacher overridable, counts towards participation
            </span>
          </Feature>
        </div>
        <div className="get-started">
          <span className="bold big-txt">Interested?</span>
          <br />
          <br />
          Integrate Chomp into your classroom in minutes by heading to your
          dashboard:
          <br />
          <br />
          <Link to="/classes">
            <SolidBtn filled>Get Started</SolidBtn>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
