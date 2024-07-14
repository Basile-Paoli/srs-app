import {DashboardLayout} from "@/app/(dashboard)/DashboardLayout";

export default function Home() {
    return (
        <DashboardLayout breadcrumbItems={[{value: "Home", href: "#"}]}>
            <h1 className={"h-full"}>Home</h1>
        </DashboardLayout>
    );
}