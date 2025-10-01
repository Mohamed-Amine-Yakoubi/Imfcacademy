'use client';

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RiLockPasswordFill } from "react-icons/ri";

import { MdEmail } from "react-icons/md";
import Background_SignIn from "../../../public/images/Background_SignIn1.jpg";
import Logo_enis from "../../../public/images/logo/Logo_enis.png";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

export default function login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const { data: session, status } = useSession();
  // ✅ Redirection si déjà connecté
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/admin');
    }
  }, [status, router]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    if (res?.error) {
      setErrorMsg("Email ou mot de passe incorrect");
    } else {
      router.push("/admin/"); // vers layout admin
    }
  };
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Chargement...</p>
      </div>
    );
  }

  // ✅ Si l'utilisateur est déjà connecté, on ne montre rien
  if (status === "authenticated") {
    return null;
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Background_SignIn.src})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-96 h-[500px] rounded-md flex flex-col items-center justify-center bg-white shadow">
        <Image src={Logo_enis} alt="logo" className="w-[100px]" />
        <form
          className="mt-16 mb-2 mx-auto w-80 max-w-screen-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">

            <div className="relative">
              <MdEmail className="text-[26px] absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />

              <Input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChangeValue}
                placeholder="Email"
                className={"px-10"}
                required
              />
            </div>
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChangeValue}
                placeholder="Mot de passe"
                className={"px-10"}
                required
              />
              <RiLockPasswordFill className="text-[26px] absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
            </div>
          </div>

          {errorMsg && <p className="text-red-600 text-center mt-2">{errorMsg}</p>}

          <div className="flex justify-center items-center mt-8">
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-4 py-3 text-sm font-medium text-gray-800 shadow-theme-xs hover:bg-gray-200 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >Connexion</button>
          </div>
        </form>
      </div>
    </div>
  );
}
