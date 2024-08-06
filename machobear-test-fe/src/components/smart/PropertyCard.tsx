import { forwardRef, useEffect, useRef } from "react";
import { MapPinIcon, Bookmark } from "lucide-react";
import Image from "next/image";

import { Posting } from "@/types/Posting";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  posting: Posting;
  index: number;
  indexChangeCallback: (index: number) => void;
};

export const PropertyCard = forwardRef(function PropertyCard(
  props: Props,
  ref: any
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          props.indexChangeCallback(props.index);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.9 }
    );
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [props.index, props.indexChangeCallback]);

  return (
    <section className="snap-center" ref={ref}>
      <Card className="rounded-lg overflow-hidden w-[80vw] md:w-[60vw] lg:w-[50vw] relative">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full bg-background/50 hover:bg-background/75 focus:outline-none focus:ring-1 focus:ring-primary absolute right-6 top-6 flex items-center justify-center"
        >
          <Bookmark
            className="w-4 h-4"
            fillOpacity={true ? 1 : 0}
            fill={"black"}
          />
        </Button>
        <CardHeader>
          <div className="xl:grid grid-cols-2 gap-6">
            <div>
              <CardTitle className="text-xl font-bold">
                {props.posting.title}
              </CardTitle>
              <h4 className="text-xl xl:text-3xl font-semibold py-4 xl:py-6">
                {`$${props.posting.price}/month`}
              </h4>
            </div>
            <Image
              src={props.posting.imageUrl || ""}
              alt="Rental Property"
              width={500}
              height={450}
              className="w-full h-72 object-cover rounded-md"
              style={{ aspectRatio: "600/450", objectFit: "cover" }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground h-16">
            {props.posting.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="block lg:flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 h-10">
            <MapPinIcon className="w-5 h-5" />
            <span className="text-sm">{props.posting.address}</span>
          </div>
          <div className="flex items-center gap-2 mt-4 lg:mt-0">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>{props.posting.createdBy.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{`Hosted by ${props.posting.createdBy.name}`}</span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
});
