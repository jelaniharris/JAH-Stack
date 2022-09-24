import type { NextPage } from "next";
import { NavBar } from "@/components/navigation/navBar";
import LuckyNumberContainer from "@/components/home/luckyNumberContainer";
import LuckyPokemonContainer from "@/components/home/luckyPokemonContainer";
import GreetingContainer from "@/components/home/greetingContainer";
import NotesContainer from "@/components/home/notesContainer";
import Layout from "@/components/layout/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col h-screen justify-center items-center">
        <GreetingContainer />
        <div className="flex flex-row flex-wrap space-x-4">
          <LuckyNumberContainer />
          <LuckyPokemonContainer />
          <NotesContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
