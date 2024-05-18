import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  color: white;
`;

const LoginBox = styled(motion.div)`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  width: 700px; /* Increased width to accommodate image */
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  ::placeholder {
    color: #dddddd;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #764ba2, #667eea);
  }
`;

export const Login = () => {
  return (
    <PageContainer>
      <LoginBox
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FormContainer>
          <Title>Epic Login</Title>
          <form>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </Button>
          </form>
        </FormContainer>
        <ImageContainer>
          <motion.img
            src="https://via.placeholder.com/300" // Replace with your image URL
            alt="Login Illustration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ borderRadius: '10px', width: '100%', height: 'auto' }}
          />
        </ImageContainer>
      </LoginBox>
    </PageContainer>
  );
};

