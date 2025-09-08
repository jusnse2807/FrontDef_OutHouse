"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoDeDocumento, setTipoDeDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("tipoDeDocumento:", tipoDeDocumento);
    console.log("documento:", documento);
    console.log("dateOfBirth:", dateOfBirth);
    console.log("fullName:", fullName);
    console.log("phoneNumber:", phoneNumber);

    const url =
      "https://back-and-front-nigthlifemedellin.onrender.com/consumidores";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
        tipoDeDocumento,
        documento,
        dateOfBirth,
        fullName,
        phoneNumber,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("USUARIO CREADO EXITOSAMENTE");
        res.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.token);

          const consumidorId = data.id;
          localStorage.setItem("consumidorId", consumidorId);
          console.log(consumidorId);

          navigate("/login");
        });
      } else {
        alert("FALLA A LA HORA DE CREAR USUARIO");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
      <div className="bg-stone-800/90 backdrop-blur-sm border border-amber-200/20 p-14 rounded-2xl shadow-2xl w-3/5 h-full">
        <h2 className="text-3xl font-bold mb-8 text-amber-200 font-mono">
          Registro
        </h2>
        <form onSubmit={handleSubmit} className="flex-col">
          <div className="mb-6">
            <label
              htmlFor="options"
              className="block text-lg font-medium text-amber-300 mb-2"
            >
              Tipo de documento
            </label>
            <select
              id="tipoDeDocumento"
              className="mt-4 bg-stone-700/50 text-amber-100 rounded-lg border border-stone-600 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              value={tipoDeDocumento}
              onChange={(e) => setTipoDeDocumento(e.target.value)}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="cedula de ciudadania">Cédula de ciudadanía</option>
              <option value="cedula de extranjeria">
                Cédula de extranjería
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-amber-300 mb-2">
              Documento de identidad
            </label>
            <input
              type="text"
              id="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-3/5 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="dob"
              className="block text-amber-300 text-lg font-medium mb-2"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-3/5 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-amber-300 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-3/5 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-amber-300 mb-2">
              Celular
            </label>
            <input
              type="text"
              id="phoneNumbet"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-3/5 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-amber-300 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/5 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-amber-300 mb-2"
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
                className="w-3/5 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
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
            className="w-3/5 mt-8 w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
