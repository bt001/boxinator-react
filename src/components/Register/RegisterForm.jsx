import React from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectForm() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/register');
    };

    return (
        <button onClick={handleButtonClick}>
            Register
        </button>
    );
}

export default RedirectForm;
