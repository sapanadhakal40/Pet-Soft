import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/context/pet-context-provider";
import SearchContextProvider from "@/context/search-context-providers";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth } from "@/lib/server-utils";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <>
      <BackgroundPattern />
      <div className=" flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
