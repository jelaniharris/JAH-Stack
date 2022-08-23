import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PanelContainer } from "../common/panelContainer";

const NotesContainer: NextPage = () => {
  useEffect(() => {}, []);

  return (
    <PanelContainer>
      <div className="text-xl text-black mb-4">Notes</div>
      <></>
      <div className="grow w-full text-9xl text-black"></div>
    </PanelContainer>
  );
};

export default NotesContainer;
