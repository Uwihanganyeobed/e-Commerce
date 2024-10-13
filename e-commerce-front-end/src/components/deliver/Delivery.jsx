import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import './deliver.css';

Modal.setAppElement('#root');

function Delivery() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [zipCode, setZipCode] = React.useState("");
  const [country, setCountry] = React.useState("Rwanda");

  useEffect(() => {
    // Automatically open modal when the component is rendered
    setIsOpen(true);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const handleZipCodeChange = (e) => setZipCode(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  return (
    <div className="delivery-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Choose your location</h2>
          <FaTimes className="close-icon" onClick={closeModal} />
        </div>
        <div className="modal-body">
          <p>Delivery options and delivery speeds may vary for different locations</p>
          <button className="signin-button">Sign in to see your addresses</button>
          <div className="divider">or enter a US zip code</div>
          <div className="zip-code-input">
            <input
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              placeholder="Enter ZIP code"
            />
            <button className="apply-button">Apply</button>
          </div>
          <div className="divider">or</div>
          <select
            value={country}
            onChange={handleCountryChange}
            className="country-select"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="IN">India</option>
            <option value="RW">Rwanda</option>
            {/* Add more countries */}
          </select>
        </div>
        <button className="done-button" onClick={closeModal}>Done</button>
      </Modal>
    </div>
  );
}

export default Delivery;
