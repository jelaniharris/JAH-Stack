import React from "react";
import {
  getProviders,
  signIn,
  signOut,
  getCsrfToken,
  getSession,
} from "next-auth/react";
import type {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSidePropsContext,
} from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: { csrfToken, providers, session },
  };
}

const SignIn: NextPage = ({
  csrfToken,
  providers,
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (session) {
    if (session.status === "loading") {
      return <h1>Loading Status</h1>;
    }

    return (
      <>
        <div>Logged in {session.data.user?.email || "Nobody"}</div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  } else {
    return (
      <div>
        <p>You are not signed in</p>
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input type="email" name="email" placeholder="email@email.com" />
          <button type="submit">Sign In With Email</button>
        </form>
        <p>or</p>
        {providers?.google && (
          <>
            <button
              onClick={() => signIn(providers?.google.id)}
              className="btn btn-primary"
            >
              Sign-In through Google
            </button>
          </>
        )}
      </div>
    );
  }
};

export default SignIn;
