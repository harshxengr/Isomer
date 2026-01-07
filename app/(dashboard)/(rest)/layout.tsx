import type { ReactNode } from "react";
import AppHeader from "@/components/custom/app-header";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AppHeader />
			<main className="flex-1">{children}</main>
		</>
	);
};

export default Layout;
