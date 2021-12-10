import {
  render,
  fireEvent,
  getDefaultNormalizer,
} from "@testing-library/react";

import Login from "./Login";
import { AuthProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

const { queryByTitle } = render(
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
);

const emailInputBox = queryByTitle("emailInputBox");
const passwordInputBox = queryByTitle("passwordInputBox");
const loginBtn = queryByTitle("loginBtn");
const gLoginBtn = queryByTitle("gLoginBtn");

it("All elements rendered correctly", () => {
  expect(emailInputBox).toBeTruthy();
  expect(passwordInputBox).toBeTruthy();
  expect(passwordInputBox).toBeTruthy();
  expect(loginBtn).toBeTruthy;
  expect(gLoginBtn).toBeTruthy();
});

describe("can type in email input", () => {
  it("onChange", () => {
    fireEvent.change(emailInputBox, {
      target: { value: "email@email.com" },
    });
    expect(emailInputBox.value).toBe("email@email.com");
  });
});

describe("can type in password input", () => {
  it("onChange", () => {
    fireEvent.change(passwordInputBox, {
      target: { value: "password" },
    });
    expect(passwordInputBox.value).toBe("password");
  });
});
