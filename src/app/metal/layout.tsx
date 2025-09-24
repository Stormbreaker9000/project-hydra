import BackgroundGradient from "@/components/BackgroundGradient";

export default function MetalLayout({ children }: { children: React.ReactNode }) {
    return (
        <BackgroundGradient>
            {children}
        </BackgroundGradient>
    );
}