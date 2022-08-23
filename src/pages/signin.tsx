import React, { useEffect, useState } from "react";
import {
  useSession,
  getProviders,
  signIn,
  signOut,
  getCsrfToken,
  ClientSafeProvider,
  LiteralUnion,
  getSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import type { NextPage } from "next";

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: { csrfToken, providers, session },
  };
}

const SignIn: NextPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  console.log(providers);

  if (status === "loading") {
    return <h1>Loading Status</h1>;
  }

  if (session) {
    return (
      <>
        <div>Logged in {session.user?.email || "Nobody"}</div>
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
        <form>
          <input type="email" placeholder="email@email.com" />
          <input type="password" placeholder="******" />
          <input type="submit"></input>
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
