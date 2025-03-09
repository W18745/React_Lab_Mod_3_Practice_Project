import React, { useState } from "react";  /* need to define this */
import "./App.css";  /* imports the theme from css file */
import ConferenceEvent from "./ConferenceEvent";  /* imports the conferenceEvent.jsx file (Conference event planner) */
import AboutUs from "./AboutUs";  /* imports the about us.jsx file */

function App() {  /* Component function  */
  const [showVenue, setShowVenue] = useState(false);  /* Get started page */

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  return (
    <>
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1> 
            <p className="budget_sentence"> Plan your next major event with us!</p>
            <div className="getstarted_btn">
              <button onClick={() => handleGetStarted()} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`event-list-container ${showVenue ? 'visible' : ''}`}> {/* using ConferenceEvent variable  */}
        <ConferenceEvent />
      </div>
    </>
  );
}

export default App;
