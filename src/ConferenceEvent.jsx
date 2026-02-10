import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  incrementAvQuantity,
  decrementAvQuantity,
  toggleMealSelection
} from "./venueSlice";

// ================= ITEMS DISPLAY COMPONENT =================
const ItemsDisplay = ({ items, numberOfPeople }) => {
  return (
    <div className="display_box1">
      {items.length === 0 ? (
        <p>No items selected</p>
      ) : (
        <table className="table_item_data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.cost}</td>
                <td>
                  {item.type === "meals" && item.numberOfPeople
                    ? `For ${item.numberOfPeople} people`
                    : item.quantity}
                </td>
                <td>
                  {item.type === "meals" && item.numberOfPeople
                    ? `$${item.cost * item.numberOfPeople}`
                    : `$${item.cost * item.quantity}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ================= MAIN COMPONENT =================
const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);

  const dispatch = useDispatch();

  const auditorium = venueItems.find(
    (item) => item.name === "Auditorium Hall (Capacity:200)"
  );
  const remainingAuditoriumQuantity = auditorium
    ? 3 - auditorium.quantity
    : 0;

  /* ================= HANDLERS ================= */
  const handleToggleItems = () => setShowItems(!showItems);

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    )
      return;
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealforPeople") {
      const people = numberOfPeople || 0;
      dispatch(toggleMealSelection({ index, people }));
    } else {
      dispatch(toggleMealSelection({ index }));
    }
  };

  /* ================= TOTAL COST ================= */
  const calculateTotalCost = (section) => {
    let totalCost = 0;

    if (section === "venue") {
      venueItems.forEach((item) => (totalCost += item.cost * item.quantity));
    }
    if (section === "av") {
      avItems.forEach((item) => (totalCost += item.cost * item.quantity));
    }
    if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) totalCost += item.cost * numberOfPeople;
      });
    }

    return totalCost;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealTotalCost = calculateTotalCost("meals");
  const totalCosts = venueTotalCost + avTotalCost + mealTotalCost;

  // Prepare total costs object and items for display
  const totalCostsObj = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealTotalCost,
  };

  const getItemsForDisplay = () => {
    const items = [];

    venueItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "venue" });
    });

    avItems.forEach((item) => {
      if (item.quantity > 0 && !items.some((i) => i.name === item.name))
        items.push({ ...item, type: "av" });
    });

    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (numberOfPeople) itemForDisplay.numberOfPeople = numberOfPeople;
        items.push(itemForDisplay);
      }
    });

    return items;
  };

  /* ================= COMPONENT ================= */
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <button className="details_button" onClick={handleToggleItems}>
          Show Details
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* VENUE */}
            <div id="venue">
              {venueItems.map((item, index) => (
                <div key={index}>
                  <img src={item.img} alt={item.name} />
                  <div>{item.name}</div>
                  <div>${item.cost}</div>
                  <button onClick={() => handleRemoveFromCart(index)}>–</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(index)}
                    disabled={
                      item.name === "Auditorium Hall (Capacity:200)" &&
                      remainingAuditoriumQuantity === 0
                    }
                  >
                    +
                  </button>
                </div>
              ))}
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* ADD-ONS */}
            <div id="addons">
              {avItems.map((item, index) => (
                <div key={index}>
                  <div>${item.cost}</div>
                  <button onClick={() => handleDecrementAvQuantity(index)}>–</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrementAvQuantity(index)}>+</button>
                </div>
              ))}
              <div className="total_cost">Total Cost: ${avTotalCost}</div>
            </div>
          </div>
        ) : (
          <div>
            {/* TOTAL COST SUMMARY */}
            <TotalCost
              totalCosts={totalCostsObj}
              ItemsDisplay={
                <ItemsDisplay
                  items={getItemsForDisplay()}
                  numberOfPeople={numberOfPeople}
                />
              }
            />

            {/* NUMBER OF PEOPLE */}
            <div className="input-container venue_selection">
              <label htmlFor="numberOfPeople">
                <h3>Number of People:</h3>
              </label>
              <input
                type="number"
                id="numberOfPeople"
                value={numberOfPeople}
                min="1"
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              />
            </div>

            {/* MEALS */}
            <div className="meal_selection">
              {mealsItems.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleMealSelection(index)}
                  />
                  {item.name} - ${item.cost}
                </div>
              ))}
              <div className="total_cost">Total Cost: ${mealTotalCost}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;
