"use client";

import { PropertyCard } from "@/components/smart/PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createRef, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

export default function Component() {
  const lol = [
    {
      id: "id1",
      title: "Cozy Mountain Retreat",
      description:
        "Nestled in the heart of the mountains, this charming retreat offers a peaceful escape.",
      price: 2300,
      address: "123 Mountain Rd, Anytown USA",
      imageUrl: "https://picsum.photos/id/66/500/450",
      createdBy: {
        id: "id1",
        name: "Catherine",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id2",
      title: "Beachfront Oasis",
      description:
        "Escape to this stunning beachfront property with breathtaking ocean views.",
      price: 3300,
      address: "456 Ocean Blvd, Beachtown USA",
      imageUrl: "https://picsum.photos/id/215/500/450",
      createdBy: {
        id: "id2",
        name: "John",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id3",
      title: "Urban Loft",
      description:
        "Experience city living in this modern and stylish loft apartment.",
      price: 1900,
      address: "789 City St, Cityville USA",
      imageUrl: "https://picsum.photos/id/201/500/450",
      createdBy: {
        id: "id3",
        name: "Emily",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id4",
      title: "Rustic Country Home",
      description:
        "A quaint and cozy home in the countryside, perfect for a relaxing getaway.",
      price: 1425,
      address: "101 Country Lane, Ruraltown USA",
      imageUrl: "https://picsum.photos/id/311/500/450",
      createdBy: {
        id: "id4",
        name: "Michael",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id5",
      title: "Modern Penthouse",
      description:
        "Luxurious penthouse with panoramic city views and high-end amenities.",
      price: 2200,
      address: "234 Skyline Blvd, Metropolis USA",
      imageUrl: "https://picsum.photos/id/625/500/450",
      createdBy: {
        id: "id5",
        name: "Sophia",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id6",
      title: "Lakefront Cabin",
      description:
        "Charming cabin on the lake, ideal for fishing and outdoor activities.",
      price: 1600,
      address: "567 Lakeside Dr, Laketown USA",
      imageUrl: "https://picsum.photos/id/434/500/450",
      createdBy: {
        id: "id6",
        name: "James",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id7",
      title: "Desert Villa",
      description:
        "A serene villa in the desert, offering a unique and tranquil experience.",
      price: 2360,
      address: "890 Desert Rd, Sandtown USA",
      imageUrl: "https://picsum.photos/id/525/500/450",
      createdBy: {
        id: "id7",
        name: "Isabella",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id8",
      title: "Chic Studio",
      description:
        "A trendy and compact studio apartment in the heart of the city.",
      price: 925,
      address: "123 Main St, Bigcity USA",
      imageUrl: "https://picsum.photos/id/445/500/450",
      createdBy: {
        id: "id8",
        name: "Liam",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id9",
      title: "Historic Cottage",
      description:
        "A charming cottage with historic character and beautiful gardens.",
      price: 1150,
      address: "456 Old Town Rd, Hometown USA",
      imageUrl: "https://picsum.photos/id/625/500/450",
      createdBy: {
        id: "id9",
        name: "Olivia",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
    {
      id: "id10",
      title: "Mountain Lodge",
      description:
        "A spacious lodge in the mountains, perfect for group getaways and adventures.",
      address: "789 Alpine Way, Snowtown USA",
      imageUrl: "https://picsum.photos/id/423/500/450",
      price: 2300,
      createdBy: {
        id: "id10",
        name: "Ethan",
        avatarImageUrl: "/placeholder-user.jpg",
      },
    },
  ];

  const elRefs = useRef<any[]>(
    Array(lol.length)
      .fill(0)
      .map((_, i) => createRef())
  );

  const itemIndex = useRef<number | null>(null);

  const indexChangeCallback = (index: number) => {
    itemIndex.current = index;
  };

  const debouncedRef = useRef(debounce(indexChangeCallback, 50));

  return (
    <>
      <div className="w-full h-screen overflow-x-auto snap-x snap-mandatory hide-scrollbar relative flex items-center gap-8 px-4 md:px-24">
        {lol.map((p, index) => (
          <PropertyCard
            key={p.id}
            ref={elRefs.current[index]}
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
              elRefs.current[itemIndex.current].current?.scrollIntoView({
                behavior: "smooth",
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
                lol.length - 1
              );
              elRefs.current[itemIndex.current].current?.scrollIntoView({
                behavior: "smooth",
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
}
