import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    state: string;
    district: string;
    role: string;
    mandi?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      phone: string;
      email?: string;
      state: string;
      role: string;
      district: string;
      mandi?: string;
    };
  }
}
