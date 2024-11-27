import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
     providers: [
          CredentialsProvider({
               name: "Credentials",
               credentials: {
                    email: { label: "Email", type: "text" },
                    password: { label: "Password", type: "password" },
               },
               async authorize(credentials) {
                    const { email, password } = credentials ?? {};
                    console.log('testing1')
                    // Replace this with actual database lookup
                    const mockUser = {
                         id: "1",
                         name: "Admin User",
                         email: process.env.AdminEmail,
                         password: process.env.AdminPassword, // Use hashed passwords in production
                    };
                    console.log(mockUser)

                    if (email === mockUser.email && password === mockUser.password) {
                         return { id: mockUser.id, name: mockUser.name, email: mockUser.email };
                    }

                    throw new Error("Invalid email or password");
               },
          }),
     ],
     session: {
          strategy: "jwt",
     },
     callbacks: {
          async jwt({ token, user }) {
               if (user) token.id = user.id;
               return token;
          },
          async session({ session, token }) {
               if (token) session.user.id = token.id;
               return session;
          },
     },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
