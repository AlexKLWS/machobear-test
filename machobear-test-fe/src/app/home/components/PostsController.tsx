import { cookies } from "next/headers";

import { PostsView } from "./PostsView";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";

const fetchData = async () => {
  try {
    // const urlBase = process.env.API_URL;
    // if (!urlBase) {
    //   throw new Error("Missing API URL in env config!");
    // }

    const username = cookies().get(USERNAME_COOKIE_NAME);
    if (!username) {
      throw new Error("Somehow username is missing!");
    }

    return {
      response: [
        {
          id: "id1",
          title: "Cozy Mountain Retreat",
          description:
            "Nestled in the heart of the mountains, this charming retreat offers a peaceful escape.",
          price: 2300,
          address: "123 Mountain Rd, Anytown USA",
          imageUrl: "https://picsum.photos/id/66/500/450",
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
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
          isBookmarked: false,
          price: 2300,
          createdBy: {
            id: "id10",
            name: "Ethan",
            avatarImageUrl: "/placeholder-user.jpg",
          },
        },
      ],
    };
  } catch (e) {
    console.log("🚀 ~ file: PostsController.tsx ~ line 52 ~ fetchData ~ e", e);
    return { error: e };
  }
};

export default async function PostsController() {
  const result = await fetchData();

  if (result.response) {
    return <PostsView posts={result.response} />;
  } else {
    return <div>{(result.error as Error)?.message || "Error!"}</div>;
  }
}
