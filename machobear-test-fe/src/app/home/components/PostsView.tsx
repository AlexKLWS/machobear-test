"use client";

import { PropertyCard } from "@/components/smart/PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createRef, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { Posting } from "@/types/Posting";

type Props = {
  posts: Posting[];
};

export const PostsView = (props: Props) => {
  const elementRefs = useRef<any[]>(
    Array(props.posts.length)
      .fill(0)
      .map(() => createRef())
  );

  useEffect(() => {
    elementRefs.current = Array(props.posts.length)
      .fill(0)
      .map((_, i) => elementRefs.current[i] || createRef());
  }, [props.posts]);

  const itemIndex = useRef<number | null>(null);

  const indexChangeCallback = (index: number) => {
    itemIndex.current = index;
  };

  const debouncedRef = useRef(debounce(indexChangeCallback, 100));

  return (
    <>
      <div className="w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar relative flex items-center gap-8 px-4 md:px-24">
        {props.posts.map((p, index) => (
          <PropertyCard
            key={p.id}
            ref={elementRefs?.current?.[index]}
            index={index}
            indexChangeCallback={indexChangeCallback}
            posting={p}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full bg-background/50 hover:bg-background/75 focus:outline-none focus:ring-1 focus:ring-primary"
          onClick={() => {
            if (itemIndex.current !== null) {
              itemIndex.current = Math.max(0, itemIndex.current - 1);
              elementRefs.current[itemIndex.current].current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full bg-background/50 hover:bg-background/75 focus:outline-none focus:ring-1 focus:ring-primary"
          onClick={() => {
            if (itemIndex.current !== null) {
              itemIndex.current = Math.min(
                itemIndex.current + 1,
                props.posts.length - 1
              );
              elementRefs.current[itemIndex.current].current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }}
        >
          <ChevronRightIcon className="w-4 h-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </>
  );
};
