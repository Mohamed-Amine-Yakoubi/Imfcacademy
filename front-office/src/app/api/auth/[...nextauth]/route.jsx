import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Configuration NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('${url}/api/User/SingIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Email_user: credentials.email,
              MotDePasse_user: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.user) {
            return {
              id: data.user.id_user,
              name: data.user.Nom_user,
              email: data.user.Email_user,
              // ajoute ici d'autres champs utiles
            };
          }

          return null;
        } catch (error) {
          console.error('Erreur de connexion:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login', // Redirection vers ta page de login
  },

  session: {
    strategy: 'jwt',        // utilise des tokens JWT
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  },

  callbacks: {
    async jwt({ token, user }) {
      // Ajoute les données de l'utilisateur dans le token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // Ajoute les données du token dans la session
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Optionnel : configuration des cookies
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // important en local
      },
    },
  },
});

export { handler as GET, handler as POST };
