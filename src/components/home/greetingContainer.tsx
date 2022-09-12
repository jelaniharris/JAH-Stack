import { NextPage } from "next/types";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const GreetingContainer: NextPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery([
    "hello.greet",
    {
      text:
        session && session.user && session.user.name
          ? session.user.name
          : "Human",
    },
  ]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="text-2xl text-white text-center font-medium mb-3">
      {data.greeting}
    </div>
  );
};

export default GreetingContainer;
