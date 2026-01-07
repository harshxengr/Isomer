import { randomUUID } from "crypto";
import prisma from "@/lib/db";

async function main() {
	await prisma.user.createMany({
		data: [
			{ id: randomUUID(), email: "alice@example.com", name: "Alice" },
			{ id: randomUUID(), email: "bob@example.com", name: "Bob" },
			{ id: randomUUID(), email: "charlie@example.com", name: "Charlie" },
			{ id: randomUUID(), email: "diana@example.com", name: "Diana" },
			{ id: randomUUID(), email: "eve@example.com", name: "Eve" },
			{ id: randomUUID(), email: "frank@example.com", name: "Frank" },
			{ id: randomUUID(), email: "grace@example.com", name: "Grace" },
			{ id: randomUUID(), email: "henry@example.com", name: "Henry" },
			{ id: randomUUID(), email: "isabella@example.com", name: "Isabella" },
			{ id: randomUUID(), email: "jack@example.com", name: "Jack" },
		],
		skipDuplicates: true,
	});
	console.log("Seed data inserted");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
