import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { login } from '../stores/authStore'; 


const RegisterPage: React.FC = () => {
    const  [email, setEmail] = useState<string>('');
    const  [password, setPassword] = useState<string>('');
    const  [confirmPassword, setConfirmPassword] = useState<string> ('');
    const  [error, setError] = useState<string>('');
    const  [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Validate all fields
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError('Please complete all fields');
            return;
        }

        // Verify id passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Verify if email are register yet
        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            setError('Email is already registered')
        }

        // Save User in LocalStorage
        const newUser = { email, password }
        localStorage.setItem(email, JSON.stringify(newUser));

        // Automatically login and redirect
        login();
        setSuccess(true);
        setTimeout(() => {
            navigate('/'); 
        }, 2000);
}

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Account created successfully! Redirecting to login...
                </Alert>
            )}
        </Box>
    );
}


export default RegisterPage;
