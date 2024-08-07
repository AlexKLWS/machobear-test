"use client";

import { addBookmark } from "@/actions/addBookmark";
import { deleteBookmark } from "@/actions/deleteBookmark";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState } from "react";

type Props = {
  postingId: number;
  isBookmarked?: boolean | null;
};

export const BookmarkButton = (props: Props) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean | null | undefined>(
    props.isBookmarked
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-8 h-8 rounded-full bg-background/50 hover:bg-background/75 focus:outline-none focus:ring-1 focus:ring-primary absolute right-6 top-6 flex items-center justify-center"
      onClick={async () => {
        let updated = false;
        if (!isBookmarked) {
          const result = await addBookmark(props.postingId);

          updated = result?.response === true;
        } else {
          const result = await deleteBookmark(props.postingId);
          updated = result?.response === true;
        }
        if (updated) {
          setIsBookmarked(!isBookmarked);
        }
      }}
    >
      <Bookmark
        className="w-4 h-4"
        fillOpacity={isBookmarked ? 1 : 0}
        fill={"black"}
      />
    </Button>
  );
};
