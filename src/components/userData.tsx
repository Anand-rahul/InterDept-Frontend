"use client";

export type UserData = {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

// Mock user data
const userData: UserData = {
  name: "John Doe",
  email: "john.doe@company.com",
  role: "Solution Architect",
  avatarUrl: "", // Empty to show default avatar
};


import {jwtDecode} from "jwt-decode";
import { jwtAuth } from "@/utils/jwtAuth";

export const getUserData = (): UserData => {
  const token = jwtAuth;
  if (token) {
    const decoded: any = jwtDecode(token); // Decode token
    console.log(decoded);
    return {
      name: decoded.name || userData.name,
      email: decoded.email || userData.email,
      role: decoded.role || userData.role,
      avatarUrl: decoded.avatarUrl || userData.avatarUrl,
    };
  }
  return userData;
};