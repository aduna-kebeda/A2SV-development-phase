"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "https://akil-backend.onrender.com/", // Replace with your actual base URL
});

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch, // Import watch here
    formState: { errors },
  } = useForm<IFormInput>();
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form submitted with data:", data); // Log form data
    try {
      const response = await axiosInstance.post("/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "user",
      });
      console.log("API response:", response); // Log API response
      if (response.status === 200) { // Adjusted to 201 for successful creation
        setMessage("Registration successful! Please verify your email.");
        const verificationUrl = `/auth/verify-email?email=${encodeURIComponent(data.email)}`;
        console.log(`Navigating to: ${verificationUrl}`); // Log navigation URL
        router.push(verificationUrl); // Redirect to verification page
      } else {
        console.warn("Unexpected response status:", response.status); // Log unexpected status
      }
    } catch (error: any) {
      setError(
        error.response ? error.response.data.message : error.message
      );
      console.error("Registration error:", error); // Log registration error
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/auth/verify-email" }); // Adjust callbackUrl if necessary
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  const password = watch("password"); // Watch the password field

  return (
   
    
    <div className="container w-3/5 mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl text-blue-900 font-bold text-center mb-6">
        Sign Up Today!
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      <div className="flex justify-center mb-6">
        <div
          onClick={handleGoogleSignIn}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-[408px] text-center text-blue-900 text-xl bg-white hover:bg-gray-100 cursor-pointer transition duration-300"
        >
          <img
            src="/assets/google.png"
            className="w-6 h-6 inline-block mr-2"
            alt="Google logo"
          />
          Sign Up with Google
        </div>
      </div>
      <div className="flex justify-center my-4">
        <div className="w-[408px] flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or Sign Up with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Full Name is required" })}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            autoComplete="name"
            placeholder="enter your full name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="enter email address"
            {...register("email", {

              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Password</label>
          <input
          placeholder="enter password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4 w-[408px]">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            placeholder="confirm password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match", // Use the watched password value
            })}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded-[20px] hover:bg-blue-950 w-[408px] transition duration-300"
          value="Continue"
        />
      </form>
      <p className="text-center mt-4 text-gray-700">
        Already have an account?{" "}
        <a href="/auth/signin" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
      <div className="w-[408px] mx-auto">
        <p className="px-4 py-2 text-center text-gray-700 mt-2">
          By clicking continue you acknowledge that you have read and accepted
          our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;