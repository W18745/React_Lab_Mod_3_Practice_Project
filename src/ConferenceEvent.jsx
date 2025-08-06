import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAVQuantity, decrementAVQuantity } from "./avSlice";
import { toggleSelectedMeal } from "./mealsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const meals = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const remainingAuditoriumQuantity =
    3 - (venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")?.quantity || 0);

  const handleAddVenueToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    )
      return;
    if (venueItems[index].quantity >= 10) return;
    dispatch(incrementQuantity(index));
  };

  const handleRemoveVenueFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleAddAVToCart = (index) => {
    if (
      avItems[index].name === "Speaker" &&
      avItems[index].quantity >= 2
    )
      return;
    dispatch(incrementAVQuantity(index));
  };

  const handleRemoveAVFromCart = (index) => {
    if (avItems[index].quantity > 0) {
      dispatch(decrementAVQuantity(index));
    }
  };

  // Meals: only toggle selection
  const handleMealCheckbox = (index) => {
    dispatch(toggleSelectedMeal(index));
  };

  // Calculate total meal cost
  const totalMealsCost = meals
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.cost * numberOfPeople, 0);

  const totalCosts = {
    totalVenueCost: venueItems.reduce((total, item) => total + item.cost * item.quantity, 0),
    totalAVCost: avItems.reduce((total, item) => total + item.cost * item.quantity, 0),
    totalMealsCost,
  };

  return (
    <>
      <nav className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue">Venue</a>
            <a href="#addons">Add-ons</a>
            <a href="#meals">Meals</a>
          </div>
          <button className="details_button" onClick={() => setShowItems(!showItems)}>
            {showItems ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </nav>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* --- Venue Section --- */}
            <div id="venue" className="venue_container container_main">
              <h1 className="section-heading">Venues</h1>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <img src={item.img} alt={item.name} />
                    <div>{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-disabled" : "btn-minus"}
                        onClick={() => handleRemoveVenueFromCart(index)}
                      >
                        &ndash;
                      </button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className={
                          item.name === "Auditorium Hall (Capacity:200)" &&
                          remainingAuditoriumQuantity === 0
                            ? "btn-disabled"
                            : item.quantity === 10
                            ? "btn-disabled"
                            : "btn-plus"
                        }
                        onClick={() => handleAddVenueToCart(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total: ${totalCosts.totalVenueCost}</div>
            </div>

            {/* --- Add-ons Section --- */}
            <div id="addons" className="venue_container container_main">
              <h1 className="section-heading">AV Add-ons</h1>
              <div className="venue_selection">
                {avItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <img src={item.img} alt={item.name} />
                    <div>{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-disabled" : "btn-minus"}
                        onClick={() => handleRemoveAVFromCart(index)}
                      >
                        &ndash;
                      </button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className={item.quantity === 10 ? "btn-disabled" : "btn-plus"}
                        onClick={() => handleAddAVToCart(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total: ${totalCosts.totalAVCost}</div>
            </div>

            {/* --- Meals Section --- */}
            <div id="meals" className="venue_container container_main">
              <h1 className="section-heading">Meals</h1>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Number of People:{" "}
                  <input
                    type="number"
                    min={1}
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                    style={{ width: "60px" }}
                  />
                </label>
              </div>
              <div className="venue_selection">
                {meals.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleMealCheckbox(index)}
                      />{" "}
                      {item.name}
                    </label>
                    <div>${item.cost}</div>
                    <div>
                      {item.selected
                        ? `Total: $${item.cost * numberOfPeople}`
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total: ${totalMealsCost}</div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              venueItems={venueItems}
              avItems={avItems}
              meals={meals}
              numberOfPeople={numberOfPeople}
              handleClick={() => setShowItems(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;