import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    adminIdentitySource?: "profile" | "user" | "fallback";
    user: {
      id: string;
    } & NonNullable<Session["user"]>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discordUserId?: string;
    discordIdentitySource?: "profile" | "user" | "fallback";
    discordAccessToken?: string;
    discordAccessTokenExpiresAt?: number;
  }
}
