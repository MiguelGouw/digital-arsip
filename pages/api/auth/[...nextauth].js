import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/welcome",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.picture = profile.picture;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.picture = token.picture;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect ke halaman HomePage setelah login
      return `${baseUrl}/HomePage`;
    },
  },
});
