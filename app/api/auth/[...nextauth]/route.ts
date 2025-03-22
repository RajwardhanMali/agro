import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ phone: credentials?.phone });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          state: user.state,
          district: user.district,
          mandi: user.mandi,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.email = user.email;
        token.state = user.state;
        token.district = user.district;
        token.mandi = user.mandi;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as {
        id: string;
        name: string;
        phone: string;
        email?: string;
        state: string;
        district: string;
        mandi?: string;
        role: string;
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
