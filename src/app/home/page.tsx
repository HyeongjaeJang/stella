"use client";

import React, { Suspense, useEffect, useState } from "react";
import Header from "@/app/ui/home/header";
import Buttons from "@/app/ui/home/buttons";
import Cards from "@/app/ui/home/cards";
import { getUser } from "@/app/lib/actions";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  z_sign: string | null;
};

const Home = () => {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      if (res?.user) {
        setUser(res.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <Suspense fallback>
      {user && (
        <div className="flex flex-col h-screen">
          <Header name={user?.name} />
          <div className="p-5">
            <p className="text-xl font-thin text-black dark:text-white">
              {`Hi ${user.name}, how's your day?`}
            </p>
          </div>
          <Buttons user={user} />
          <Cards user={user} />
        </div>
      )}
    </Suspense>
  );
};

export default Home;
