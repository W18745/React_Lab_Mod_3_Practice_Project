import React, { useRef } from "react";
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
  const slipRef = useRef(null);
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

  const handleDownloadPDF = async () => {
    try {
      // 🧠 Dynamically import libraries only when needed
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;

      const input = slipRef.current;

      // Capture the visible area of the component
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      // PDF setup
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Event_Total_Cost.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="pricing-app">
      <div className="display_box" ref={slipRef}>
        <div className="header">
          <h3>Total Cost for the Event</h3>
        </div>

        <div className="price-section">
          <h2 id="pre_fee_cost_display" className="price">
            ${total_amount}
          </h2>
        </div>

        <div className="render_items">
          <ItemsDisplay />
        </div>

        <button className="pdf_button" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default TotalCost;
