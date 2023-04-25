import React from "react";
import { useEffect, useCallback, useState } from "react";

import Link from "next/link";
// import * as bcrypt from 'bcrypt'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import '../globals.css'
import { useRouter } from 'next/router'

// layout for page

import Auth from "../../layouts/Auth";
import { Response } from "../../class/backendRequest";

import { login } from "../../utils";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter()

  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let [isSubmited, setIsSubmited] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const submit = useCallback(async function () {
    let fetch = async () => {
      setIsSubmited(true)
      try {
        let response: Partial<Response> = await login("auth/login", {
          userid: email,
          password: Buffer.from(password).toString('base64')
        });
        console.log("All customer ", response);
        if (response && response.data && response.status == 200) {
          localStorage.setItem("token", response.data.accessToken)
          router.push("/")
        } else {
          setIsSubmited(false)
          toast.warning(response.message)
        }
      } catch (e: any) {
        setIsSubmited(false)
        toast.error("Server error")
      }
    }
    if (!isSubmited) {
      fetch()
    }
  }, [email, password])

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    <a className=" flex items-center"
                      href="/">
                      <img src="/logo-4.png" className="-mt-10 md:-mt-12 ml-3 md:ml-0 h-24 w-30 md:h-40 md:w-40 " alt="Flowbite Logo" />
                    </a>
                  </h6>
                </div>

              </div>
              <div className="flex-auto px-4 pt-8 lg:px-10 py-10 pt-0">

                <form
                  id="create-choose-type-single"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder=""
                      required
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setEmail(e.currentTarget.value);
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setPassword(e.currentTarget.value);
                      }}
                    />
                  </div>


                  <div className="text-center mt-6">
                    <button
                      aria-label="Menu"

                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={isSubmited}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// Login.layout = Auth;

Login.getLayout = function getLayout(page: any) {
  return (

    <Auth>{page}</Auth>
  )
}
