import { cookies } from "next/headers";

import { PostsView } from "./PostsView";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";
import { Posting } from "@/types/Posting";

const fetchData = async () => {
  try {
    const urlBase = process.env.API_URL;
    if (!urlBase) {
      throw new Error("Missing API URL in env config!");
    }

    const username = cookies().get(USERNAME_COOKIE_NAME);
    if (!username) {
      throw new Error("Somehow username is missing!");
    }

    const result = await fetch(urlBase + "/postings", {
      headers: {
        username: username.value,
      },
      cache: "no-store",
    });

    const parsedResult = (await result.json()) as Posting[];

    return { response: parsedResult };
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
