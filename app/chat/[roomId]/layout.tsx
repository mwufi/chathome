import FloatingHeader from "@/app/components/FloatingHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-16">
            <FloatingHeader />
            {children}
        </div>
    )
}