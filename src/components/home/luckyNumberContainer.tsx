import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getRandomNumber } from "@/utils/getRandomNumber";
import { PanelContainer } from "../common/panelContainer";

const LuckyNumberContainer: NextPage = () => {
  const [luckyNumber, setLuckyNumber] = useState(0);

  useEffect(() => {
    setLuckyNumber(getRandomNumber(10));
  }, []);

  return (
    <PanelContainer>
      <div className="text-xl text-black mb-4">Your lucky number is:</div>
      <div className="grow w-full text-9xl text-black">
        <div className="flex h-full items-center justify-center">
          {luckyNumber}
        </div>
      </div>
    </PanelContainer>
  );
};

export default LuckyNumberContainer;
