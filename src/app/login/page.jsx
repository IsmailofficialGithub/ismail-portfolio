"use client"

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading,setIsLoading]=useState(false)
  const router = useRouter();
  const session =useSession()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // Show error if login fails
    } else {
      console.log("Logged in successfully");
      toast.success("Logged in successfully")
      router.push("/admin/dashboard/blog"); // Redirect after successful login
    }
    
    setIsLoading(false)
    
  };
     return (
          <div className="flex items-center justify-center min-h-screen bg-[#b6b6b6]">
      <form onSubmit={handleSubmit} className="p-6 bg-[#545353] shadow-md rounded-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-3 text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-3 text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
            />
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 hover:bg-[#5b4cb0] mt-4 text-white rounded-md" disabled={isloading?true:false}>
           {!isloading? 'Login':<Loader width="20"/>}
        </button>
      </form>
    </div>
  );
}

