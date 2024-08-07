import { LoaderPropertyCard } from "@/components/smart/LoaderPropertyCard";
import { Machobear } from "@/components/smart/Machobear";

export const ListLoader = () => {
  return (
    <div className="h-screen overflow-x-scroll snap-x snap-mandatory hide-scrollbar relative flex items-center gap-8 px-4 md:px-24">
      <LoaderPropertyCard />
      <LoaderPropertyCard />
      <LoaderPropertyCard />
    </div>
  );
};
