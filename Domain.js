import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Domain = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedError, setSelectedError] = useState('');

    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
       // navigate(`/${selectedOption}/login`);
       //navigate('/login');

    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!selectedOption){
        setSelectedError('Please select an option.');
        isValid = false;
    } else {
        setSelectedError('');
    }
    return isValid;
  };

  return(
    <div>
    <form onSubmit={handleSubmit}>
    <label htmlFor="options">Login as:</label>
    <select
      id="options"
      value={selectedOption}
      onChange={(event) => setSelectedOption(event.target.value)}
    >
        <option value="">Choose an option</option>
        <option value="user">User</option>
        <option value="landlord">Landlord</option>
        <option value="admin">Admin</option>
    </select>
    {selectedError && <p className="error">{selectedError}</p>}
    <div> 
        <button type="submit">Login</button>
    </div>
    </form>
    </div>
  )
}

export default Domain;