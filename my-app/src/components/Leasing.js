import React, { useState } from 'react';
import "./Leasing.css";

const LeaseComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    duration: '',
    carmake: '', // Added 'carmake' to the initial state
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    console.log('Lease details submitted:', formData);
    alert("Your Details have been recorded. A customer care agent will contact you with further details!");

    fetch('http://localhost:3000/cars', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    }).then(data => {
      console.log(data);
      setFormData({
        name: '',
        idNumber: '',
        duration: '',
        carmake: '', // Included 'carmake' to reset its value
      });
      setShowConfirmation(false);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          ID Number:
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Duration:
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
        </label>
        <br />
        <label>
          Car Make:
          <input type="text" name="carmake" value={formData.carmake} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Please confirm your lease request:</p>
          {/* Display form data for confirmation */}
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default LeaseComponent;
