import React from "react";
import "./App.css";
import { Footer } from "./components/_common/Footer";
import { NavbarContainer } from "./components/_common/NavbarContainer";

function App() {
  return (
    <div className="App">
      <NavbarContainer></NavbarContainer>
      Need a versatile nav bar: <br />
      - Home screen
      <br />
      - Classes overview
      <br />
      - Specific class
      <br />
      - Settings?
      <br />
      (But profile in the top right corner should stay constant)
      <br />
      <div className="med-txt">This is some POGGERS content right here</div>
      <code>System.out.println("Hello, World!");</code>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
