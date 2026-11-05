import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      // Discord includes its authorization-server issuer in the callback.
      // Declare it explicitly so Auth.js validates that value instead of
      // falling back to its placeholder OAuth issuer.
      issuer: "https://discord.com",
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
      checks: ["state", "pkce"],
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account?.provider === "discord" && account.access_token) {
        token.discordAccessToken = account.access_token;
        token.discordAccessTokenExpiresAt = account.expires_at ? account.expires_at * 1000 : undefined;
      }

      // `profile.id` is the snowflake returned by Discord's /users/@me
      // endpoint. Prefer it over Auth.js' normalized `user.id`, which may be
      // replaced by an adapter/internal identifier in a future setup.
      if (account?.provider === "discord") {
        const profileId = typeof profile?.id === "string" ? profile.id : undefined;
        const userId = typeof user?.id === "string" ? user.id : undefined;

        token.discordUserId = profileId ?? userId;
        token.discordIdentitySource = profileId ? "profile" : userId ? "user" : "fallback";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && (token.discordUserId ?? token.sub)) {
        session.user.id = token.discordUserId ?? token.sub;

        if (process.env.NODE_ENV === "development") {
          session.adminIdentitySource = token.discordIdentitySource ?? "fallback";
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      const destination = new URL(url, baseUrl);

      return destination.origin === baseUrl ? destination.toString() : baseUrl;
    },
  },
});
