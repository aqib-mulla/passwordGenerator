import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Password-generator.css';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useAlphabets, setUseAlphabets] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    setPasswordHistory(storedPasswords);
  }, []);

  const generatePassword = () => {
    let charset = '';
    const numbers = '0123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (useNumbers) charset += numbers;
    if (useAlphabets) charset += alphabets;
    if (useSpecialChars) charset += specialChars;

    let newGeneratedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newGeneratedPassword += charset[randomIndex];
    }

    setGeneratedPassword(newGeneratedPassword);
    const newPasswordHistory = [newGeneratedPassword, ...passwordHistory.slice(0, 4)];
    setPasswordHistory(newPasswordHistory);
    localStorage.setItem('passwordHistory', JSON.stringify(newPasswordHistory));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="grid-container">
        <label>
          Length:
          <input
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min="1"
          />
        </label>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
        </label>
        <label>
          Include Alphabets:
          <input
            type="checkbox"
            checked={useAlphabets}
            onChange={() => setUseAlphabets(!useAlphabets)}
          />
        </label>
        <label>
          Include Special Characters:
          <input
            type="checkbox"
            checked={useSpecialChars}
            onChange={() => setUseSpecialChars(!useSpecialChars)}
          />
        </label>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      {generatedPassword && (
        <div className="generated-password">
          <h3>Generated Password:</h3>
          <p>{generatedPassword}</p>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
      <div className="password-history">
        <h3>Last 5 Passwords:</h3>
        <ul>
          {passwordHistory.map((pwd, index) => (
            <li key={index}>{pwd}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordGenerator;
