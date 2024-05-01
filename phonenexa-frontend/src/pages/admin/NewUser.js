import React from "react";
import styled from "styled-components";

const NewUserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const FormItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
  color: grey;
`;

const Input = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid rgb(184, 184, 184);
  border-radius: 2px;
  
  &:focus {
    outline: none;
  }
`;

const GenderOptions = styled.div`
  display: flex;
  align-items: center;
`;

const GenderLabel = styled.label`
  margin-right: 10px;
  color: #555;
  font-size: 15px;
`;

const GenderInput = styled.input`
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  cursor: pointer;
`;

export default function NewUser() {
  return (
    <NewUserContainer>
      <Title>New User</Title>
      <Form>
        <FormItem>
          <Label>Username</Label>
          <Input type="text" placeholder="johnsmith" />
        </FormItem>
        <FormItem>
          <Label>Full Name</Label>
          <Input type="text" placeholder="John Smith" />
        </FormItem>
        <FormItem>
          <Label>Email</Label>
          <Input type="email" placeholder="johnsmith@gmail.com" />
        </FormItem>
        <FormItem>
          <Label>Password</Label>
          <Input type="password" placeholder="johnsmith@gmail.com" />
        </FormItem>
        <FormItem>
          <Label>Phone</Label>
          <Input type="tel" placeholder="+1 123 456 78" />
        </FormItem>
        <FormItem>
          <Label>Address</Label>
          <Input type="text" placeholder="New York | USA" />
        </FormItem>
        <FormItem>
          <GenderLabel>Gender</GenderLabel>
          <GenderOptions>
            <GenderInput type="radio" name="gender" value="male" id="male" />
            <Label htmlFor="male">Male</Label>
            <GenderInput type="radio" name="gender" value="female" id="female" />
            <Label htmlFor="female">Female</Label>
            <GenderInput type="radio" name="gender" value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </GenderOptions>
        </FormItem>
        <FormItem>
          <Label htmlFor="active">Active</Label>
          <select name="active" id="active" className="newuser__select">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FormItem>
      </Form>
      <SubmitButton>Create</SubmitButton>
    </NewUserContainer>
  );
}
