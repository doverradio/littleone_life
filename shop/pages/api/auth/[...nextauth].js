// /shop/pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"; // Adjust to use lib/mongodb.js

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // Use MongoDB to store user sessions
  callbacks: {
    async signIn({ user, account, profile }) {
      // Add any additional sign-in logic here
      return true;
    },
    async session({ session, token, user }) {
      // Use the express-session stored data instead of JWT
      session.userId = user.id; // Attach the user ID to the session
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Ensure users are redirected to the base URL after sign-in
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set your NEXTAUTH_SECRET for security
  session: {
    strategy: "database", // Store sessions in MongoDB via the express-session middleware
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
});
