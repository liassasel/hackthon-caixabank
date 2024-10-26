import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../stores/authStore';
import {
Box,
Button,
TextField,
Typography,
Alert,
} from '@mui/material';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const defaultCredentials = {
    email: 'default@example.com',
    password: 'password123'
};

    const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
        setError('Por favor llene todos los campos');
        return;
    }

    if (email === defaultCredentials.email && password === defaultCredentials.password) {
        login();
        navigate('/');
    } else {
        setError('Credenciales inválidas');
    }
};

    return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
        Login
        </Typography>
        <form onSubmit={handleLogin}>
        <TextField
            label="Email"
            type="email"
            placeholder={defaultCredentials.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Password"
            type="password"
            placeholder={defaultCredentials.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Login
        </Button>
        </form>

        {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
            {error}
        </Alert>
        )}
    </Box>
    );
};

export default LoginPage;
