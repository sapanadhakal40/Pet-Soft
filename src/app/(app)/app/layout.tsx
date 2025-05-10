import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] mx-auto">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
}
