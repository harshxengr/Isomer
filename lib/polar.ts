import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
	accessToken: process.env.POLAR_ACCESS_TOKEN,
	server: "sandbox", // we have to change it to production after
});

// server: process.env.NODE_ENV !== "production" ? "sandbox" : "production"
