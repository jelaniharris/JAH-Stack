import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { PanelContainer } from "@/components/common/panelContainer";
import { PageTitle } from "@/components/common/pageTitle";
import { PageContainer } from "@/components/common/pageContainer";
import { useForm, FormProvider } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { CreateNoteInput, createNoteSchema } from "@/schema/notes.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, useSession } from "next-auth/react";
import FormInput from "@/components/common/formInput";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Layout from "@/components/layout/layout";
import { LoadingButton } from "@/components/common/loadingButton";

const Notes: NextPage = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  const { data: session } = useSession();
  const methods = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const { data: allNotes, refetch } = trpc.useQuery(["notes.findAll"]);
  const {
    isLoading,
    mutate: CreateNote,
    error,
  } = trpc.useMutation(["notes.create"], {
    onError: (error) => {
      toast.error(error.message, {
        type: "error",
        position: "top-right",
      });
    },
    onSuccess: (data) => {
      toast.success("Note created successfully");
      refetch();
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit = (values: CreateNoteInput) => {
    CreateNote(values);
  };

  const actionPanel = (
    <LoadingButton btnColor="primary" loading={isLoading}>
      Add Note
    </LoadingButton>
  );
  const formContainer = session && (
    <>
      <FormInput
        className="my-1"
        label="Title"
        name="title"
        placeholder="Enter Title"
      />
      <input
        type="hidden"
        value={session?.user?.id as string}
        {...register("userId")}
      />
      <div className="">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <div className="my-1">
          <textarea
            id="notes"
            rows={3}
            placeholder="Enter Note Here"
            className="block w-full flex-1 rounded-md p-2 text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register("content")}
          ></textarea>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Layout>
        <PageTitle title="Notes" />
        <div className="mt-3">
          <PageContainer>
            <div className="mt-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <PanelContainer actionPanel={actionPanel}>
                    {formContainer}
                  </PanelContainer>
                </form>
              </FormProvider>
            </div>
            <>
              <h2>All Notes</h2>
              {allNotes &&
                allNotes.map((note) => {
                  return (
                    <span key={note.id}>
                      {note.title} - {note.content}
                    </span>
                  );
                })}
            </>
          </PageContainer>
        </div>
      </Layout>
    </>
  );
};

export default Notes;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: {
      session,
    },
  };
};
