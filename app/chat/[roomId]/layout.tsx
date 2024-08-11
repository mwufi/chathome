import FloatingHeader from "@/components/FloatingHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-16 max-w-[70ch] mx-auto relative">
            <FloatingHeader />
            {children}
        </div>
    )
}