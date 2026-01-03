"use client";

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/subscriptions/hooks/use-subscription";

const menuItems = [
    {
        title: "Main",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            },
        ]
    }
];

const AppSidebar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/" prefetch>
                            <div className="size-[30px] rounded-md bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">I</span>
                            </div>
                            <span className="font-semibold text-sm">
                                Isomer
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>

            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={
                                            item.url === "/"
                                                ? pathName === "/"
                                                : pathName.startsWith(item.url)
                                        }
                                        asChild
                                        className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.url} prefetch>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    {!hasActiveSubscription && !isLoading && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Upgrade to Pro"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => authClient.checkout({
                                    slug: "Isomer-Pro"
                                })}
                            >
                                <StarIcon className="h-4 w-4" />
                                <span>Upgrade to Pro</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Billing Portal"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.customer.portal()}
                        >
                            <CreditCardIcon className="h-4 w-4" />
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sign out"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/signin");
                                    }
                                }
                            })}
                        >
                            <LogOutIcon className="h-4 w-4" />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;