// utils/validator.js

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    // Example: Password must be at least 8 characters long and contain a number and an uppercase letter
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
};
