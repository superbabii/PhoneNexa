import React, { useContext, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import googleIconImageSrc from "images/google-icon.png";
import logo from "images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { UserContext } from "contexts/userContext";

const Container = tw.div`min-h-screen bg-primary-900 text-white font-medium flex justify-center -mb-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = styled.a`
  ${tw`flex items-center justify-center border-b-0 ml-0!`};
  img {
    ${tw`w-12 2xl:w-16 2xl:h-16 m-0`}
  }

  font-family: 'Exo', sans-serif;
  font-weight: lighter;
  font-size: 42px;
  letter-spacing: 4px;
  color: #742EEE;
  gap: 5px;

  @media (max-width: 1440px) {
    font-size: 36px;
  }
`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For PhoneNexa",
  submitButtonText = "Sign up",
  SubmitButtonIcon = SignUpIcon,
  termsOfServiceUrl = "/terms-of-service",
  privacyPolicyUrl = "/privacy-policy",
  signInUrl = "/login"
}) => {
  // const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const { setUserName: setLogedInUser, setUserId, setPicture } = useContext(UserContext);

  const SignUpGoogle = async (isGoogleAuthentication, userName, firstName, lastName, email, picture) => {
    try {
      const { data } = await axios.post('auth/register', { isGoogleAuthentication, userName, firstName, lastName, email, picture });
      setLogedInUser(userName);
      setPicture(picture);
      setUserId(data.id);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      console.log('signed up with Google');
    } catch (error) {
      console.error('Error signing up with Google:', error.response.data);
      if (error.response.data.errors && error.response.data.errors[0].msg === 'Email already exists') {
        setResponseMessage('Email already exists. Please use a different email.');
      } else {
        setResponseMessage(error.response.data.errors[0].msg || 'An unexpected error occurred.');
      }
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResponseMessage('Invalid email format. Please enter a valid email.');
      return;
    }
    try {
      const userName = firstName + " " + lastName;
      const { data } = await axios.post('auth/register', { userName, firstName, lastName, email, password });
      setLogedInUser(userName);
      setPicture("");
      setUserId(data.id);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      console.log('signed up');
    } catch (error) {
      console.log('Error registering user:', error.response.data);

      if (error.response.data.errors && error.response.data.errors[0].msg === 'Email already exists') {
        setResponseMessage('Email already exists. Please use a different email.');
      } else {
        setResponseMessage(error.response.data.errors[0].msg || 'An unexpected error occurred.');
      }
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />PhoneNexa
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  <GoogleLogin
                    text="signup_with"
                    width="320"
                    size="large"
                    logo_alignment="center"
                    onSuccess={credentialResponse => {
                      const decoded = jwtDecode(credentialResponse.credential)
                      SignUpGoogle(true, decoded.name, decoded.given_name, decoded.family_name, decoded.email, decoded.picture)
                    }}
                    onError={() => {
                      console.log('SignUp Failed');
                    }}
                    useOneTap
                  />
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign up with your e-mail</DividerText>
                </DividerTextContainer>
                <Form >
                  <Input
                    type="firstname"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="lastname"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {responseMessage && <p style={{ marginTop: '6px', fontSize: '12px', color: 'red' }}>
                    {responseMessage}
                  </p>}
                  <SubmitButton type="button" onClick={handleSignUp}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by treact's{" "}
                    <a href={termsOfServiceUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
};
