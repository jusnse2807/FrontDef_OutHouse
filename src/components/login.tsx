"use client";
import { useState } from "react";
import type React from "react";

import { useNavigate } from "react-router-dom";

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg relative w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

const LoginPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg relative w-80">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-2">Bienvenido</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputType, setInputType] = useState("password");

  const [errorMessage, setErrorMessage] = useState("");
  const [loginPopup, setLoginPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); //prevents the default event which is reloading the oage when the form is submitted from happening

    console.log("Email:", email);
    console.log("Password:", password);

    const url =
      "https://back-and-front-nigthlifemedellin.onrender.com/consumidorehttps://loopa-back.onrender.com/consumidores/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        //alert("USUARIO LOGGEADO EXITOSAMENTE") //si la respuesta es correcta es usuario se logeo exitosamente
        response.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.token);

          const consumidorId = data.consumidor.id;
          localStorage.setItem("consumidorId", consumidorId);
          console.log(consumidorId);
          setLoginPopup(true);
        });
      } else {
        const errorData = await response.json();
        console.log(errorData);
        const error =
          errorData.message === "credenciales invalidas"
            ? "Invalid credentials"
            : errorData.message;
        throw new Error(error || "Ocurrio un error intentando loggear");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set the error message from the caught Error
      } else {
        setErrorMessage("An unknown error occurred"); // Fallback if it's not an Error instance
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/Signin");
  };

  const handleLoginPopupClose = () => {
    setLoginPopup(false);
    navigate("/mainPage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
      <div className="bg-stone-800/90 backdrop-blur-sm border border-amber-200/20 p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-200">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-amber-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-amber-300"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="flex flex-row mt-1">
              <input
                type={inputType}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                required
              />

              <button
                type="button"
                className="basis-1/6 bg-stone-700 hover:bg-stone-600 rounded-full w-full mt-3 ml-4 transition-colors duration-200"
                onClick={() => {
                  if (inputType === "password") {
                    setInputType("text");
                  } else {
                    setInputType("password");
                  }
                }}
              >
                {inputType === "password" ? (
                  <img
                    src="/eye.png"
                    alt="show password"
                    className="rounded-full w-8 h-8 text-white"
                  ></img>
                ) : (
                  <img
                    src="/eye-off.png"
                    alt="hide password"
                    className="rounded-full w-8 h-8"
                  ></img>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg mt-4"
          >
            Ingresar
          </button>
        </form>
      </div>

      <div className="mt-14 bg-stone-800/90 backdrop-blur-sm border border-amber-200/20 p-8 rounded-2xl shadow-2xl w-96">
        <p className="block text-sm font-medium text-amber-300">
          ¿No tienes una cuenta todavía?
        </p>
        <button
          className="mt-6 w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          onClick={handleSignUpClick}
        >
          Registrarse
        </button>
      </div>

      {/* Render the ErrorPopup component if there is an error */}
      {errorMessage && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {loginPopup && (
        <LoginPopup
          message="usuario logeado exitosamente!"
          onClose={handleLoginPopupClose}
        />
      )}
    </div>
  );
};
