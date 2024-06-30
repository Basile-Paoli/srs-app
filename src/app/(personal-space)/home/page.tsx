import {DashboardLayout} from "@/components/ui/DashboardLayout";

export default function Home() {
    return (
        <DashboardLayout breadcrumbItems={[{value: "Home", href: "#"}]}>
            <h1>Home</h1>
        </DashboardLayout>
    );
}