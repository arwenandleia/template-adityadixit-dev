"use server";

import { auth } from "../auth";
import { isAPIError } from "better-auth/api";
import { LoginFormType } from "@/components/client/login/LoginForm";
import { SignupFormType } from "@/components/client/login/SignupForm";

export type LoginActionResonseType = {
  success: boolean;
  message: string;
};

export async function signUpUser({
  fullName,
  email,
  password,
}: Omit<SignupFormType, "confirmPassword">): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signUpEmail({
      body: { name: fullName, email, password },
    });
    if (response.user.email === email) {
      return {
        success: true,
        message: `User ${name} with email ${email} succesfully created`,
      };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
    console.log(error);
  }
  return { success: false, message: "unknown error" };
}

export async function loginUser({
  email,
  password,
}: LoginFormType): Promise<LoginActionResonseType> {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
    });
    if (response.user.email === email) {
      return {
        success: true,
        message: `User with email ${email} succesfully logged in`,
      };
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message };
    }
    console.log(error);
  }
  return { success: false, message: "unknown error" };
}
