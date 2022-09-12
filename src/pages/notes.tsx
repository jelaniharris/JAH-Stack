import type { NextPage } from "next";
import { NavBar } from "@/components/navigation/navBar";
import { PanelContainer } from "@/components/common/panelContainer";
import { PageTitle } from "@/components/common/pageTitle";
import { PageContainer } from "@/components/common/pageContainer";

const Notes: NextPage = () => {
  const AddNotesContainer = () => {
    const actionPanel = (
      <button type="submit" className="btn btn-primary">
        Add Note
      </button>
    );
    const formContainer = (
      <form action="#" method="POST">
        <div className="">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <div className="my-1">
            <textarea
              name="content"
              id="notes"
              rows={3}
              placeholder="Enter Note Here"
              className="block w-full flex-1 rounded-md p-2 text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        </div>
      </form>
    );

    return (
      <div className="mt-5">
        <PanelContainer actionPanel={actionPanel}>
          {formContainer}
        </PanelContainer>
      </div>
    );
  };

  const ListNotesContainer = () => {
    return <></>;
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-2">
        <PageTitle title="Notes" />
        <div className="mt-3">
          <PageContainer>
            <AddNotesContainer />
            <ListNotesContainer />
          </PageContainer>
        </div>
      </div>
    </>
  );
};

export default Notes;
