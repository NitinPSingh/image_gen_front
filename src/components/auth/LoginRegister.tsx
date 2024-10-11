import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Card, CardContent, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { z } from 'zod';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { register } from '../../api/auth';

const PageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const FormContainer = styled(Card)({
  display: 'flex',
  width: '500px',
  height: 'auto',
  boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    width: '100%',
  },
});

const FormBox = styled(CardContent)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  flexDirection: 'column',
  backgroundColor: '#fff',
});

const InputField = styled(TextField)({
  width: '100%',
  margin: '10px 0',
});

const SubmitButton = styled(Button)({
  width: '100%',
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#677eff',
  color: '#fff',
});

const ToggleLink = styled(Button)({
  marginTop: '20px',
  textDecoration: 'none',
  color: '#677eff',
  textTransform: 'none',
});


const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain 8 characters with at least one letter and one number"),
});

const registerSchema = loginSchema.extend({
  email: z.string().email("Invalid email address"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const toggleForm = () => {
    if(isLogin){
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })}
    setIsLogin(!isLogin);
    setErrors({});
    setApiError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    try {
      if (isLogin) {
        loginSchema.parse(formData);
        await login(formData.username, formData.password);
        navigate('/'); // Redirect to home page after successful login
      } else {
        registerSchema.parse(formData);
        await register(formData.username, formData.password, formData.email)
        setIsLogin(true);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Record<string, string>);
      } else if (axios.isAxiosError(error)) {
        console.log(error);
        if (isLogin) {
          setApiError(error.response?.data?.detail || 'No user with those credentials');
        } else {
          const errorMessage = error.response?.data?.email || error.response?.data?.username || error.response?.data?.password || 'An error occurred';
          setApiError(errorMessage);
        }
      }
       else {
        setApiError('An unexpected error occurred');
      }
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormBox>
          <Typography variant="h5" component="h2" textAlign="center">
            {isLogin ? 'Sign In' : 'Create an Account'}
          </Typography>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField 
                label="Email" 
                variant="outlined" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            )}
            <InputField 
              label="Username" 
              variant="outlined" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <InputField 
              label="Password" 
              variant="outlined" 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            {!isLogin && (
              <InputField 
                label="Confirm Password" 
                variant="outlined" 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            )}
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <SubmitButton variant="contained" type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </SubmitButton>
            <ToggleLink onClick={toggleForm}>
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </ToggleLink>
          </form>
        </FormBox>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginRegister;