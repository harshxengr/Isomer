import type { ReactNode } from "react";
import AppSidebar from "@/components/custom/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-accent/20">{children}</SidebarInset>
		</SidebarProvider>
	);
};

export default Layout;
