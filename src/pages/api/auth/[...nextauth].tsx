import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await axios.post(`http://localhost:8000/login`, {
          email,
          password,
        });
        if (user) {
          return user.data.token;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.id = user.id;
      }
      if (account?.provider === "google") {
        const data = {
          name: user.name,
          email: user.email,
          password: "",
        };
        await axios
          .post(`http://localhost:8000/register`, data)
          .then((response) => {
            if (response.data.success === true) {
              (token.email = response.data.data.email),
                (token.name = response.data.data.name),
                (token.role = response.data.data.role || "member");
              token.image = user.image;
            }
          })
          .catch((error) => {
            console.log(error);
            (token.email = user.email),
              (token.name = user.name),
              (token.role = "member");
            token.image = user.image;
          });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
