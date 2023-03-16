import React, { useState } from 'react';

function LoginPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Login with email ${email}`);
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>
                Continue as a guest
            </button>
            {isOpen && (
                <div className="popup">
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={handleEmailChange} />
                        </label>
                        <button type="submit">Continue</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPopup;
