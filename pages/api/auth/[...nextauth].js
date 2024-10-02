// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        const user = await User.findOne({ where: { email: credentials.email } });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.username, email: user.email, role: user.role };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session(session, token) {
      session.user.role = token.role;
      return session;
    },
  },
});