import { Suspense } from "react";
import { cookies } from "next/headers";

import { LogOutButton } from "@/components/smart/buttons/LogOutButton";
import PostsController from "./components/PostsController";
import { USERNAME_COOKIE_NAME } from "@/constants/cookies";
import { ListLoader } from "./components/ListLoader";

export default function Component() {
  const username = cookies().get(USERNAME_COOKIE_NAME);

  return (
    <div className="w-full h-screen">
      <div className="pt-8 px-8 flex items-center justify-start w-full">
        <LogOutButton />
        <div className="text-black text-lg ml-8">{`Hi ${username?.value}!`}</div>
      </div>
      <Suspense fallback={<ListLoader />}>
        <PostsController />
      </Suspense>
    </div>
  );
}
