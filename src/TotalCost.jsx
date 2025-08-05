import React, { useState, useEffect } from 'react';
import "./TotalCost.css";

const TotalCost = ({ venueItems, avItems, meals, handleClick }) => {
  const [totals, setTotals] = useState({
    venue: 0,
    av: 0,
    meals: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const venueTotal = venueItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const avTotal = avItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const mealsTotal = meals.reduce((sum, item) => sum + item.cost * item.quantity, 0);

    setTotals({
      venue: venueTotal,
      av: avTotal,
      meals: mealsTotal,
      grandTotal: venueTotal + avTotal + mealsTotal
    });
  }, [venueItems, avItems, meals]);

  const renderTable = (title, items) => {
    const filtered = items.filter(item => item.quantity > 0);

    return (
      <div className="cost-section">
        <h3>{title} Costs</h3>
        <p className="section-description">
          Here is the breakdown of costs for {title.toLowerCase()}:
        </p>
        {filtered.length === 0 ? (
          <p>No {title.toLowerCase()} selected.</p>
        ) : (
          <table className="cost-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>{item.quantity}</td>
                  <td>${item.cost * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="section-total">
          <strong>Total {title} Cost:</strong> ${totals[title.toLowerCase()]}
        </p>
      </div>
    );
  };

  return (
    <div className="total-cost">
      <div className="pricing-app">
        <div className="display_box">
          <div className="header">
            <h3 className="preheading">Total cost for the event</h3>
          </div>
          <div>
            <h2 id="pre_fee_cost_display" className="price">${totals.grandTotal}</h2>
          </div>
        </div>
      </div>

      <h2>Cost Breakdown Summary</h2>

      {renderTable("Venue", venueItems)}
      {renderTable("AV", avItems)}
      {renderTable("Meals", meals)}

      <div className="grand-total">
        <h3>Grand Total: ${totals.grandTotal}</h3>
        <button onClick={handleClick}>Back to Selection</button>
      </div>
    </div>
  );
};

export default TotalCost;
