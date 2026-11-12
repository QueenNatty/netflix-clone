import Navbar from "@/components/navbar/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="pt-16">{children}</div>
        </>
    );
}
