"use client";

import { useState } from "react";
import { useEffect } from "react";

export const EditarPerfilUsuario = () => {
  const [profileImage, setProfileImage] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horarios, setHorarios] = useState("");
  const [contacto, setContacto] = useState("");
  const [redSocial, setRedSocial] = useState("");
  //const [selectedFile] = useState<File | null>(null);

  const id = localStorage.getItem("empresaId");

  useEffect(() => {
    const fetchProfileImage = async () => {
      const url = `https://back-and-front-nigthlifemedellin.onrender.com/discotecas/${id}`;

      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfileImage(data.profileImage);
        } else {
          console.log("Falla a la hora de obtener la imagen de perfil");
        }
      } catch (error) {
        console.error("Error a la hora de obetener la foto de perfil", error);
      }
    };

    if (id) {
      fetchProfileImage();
    } else {
      console.log("No ID found in localStorage");
    }
  }, [id]);

  /*
  const changeProfliePicture = async (e: {preventDefault: () => void;}) => {
    e.preventDefault();

    if(!selectedFile){
      alert("Debe seleccionar una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    const url = `http://localhost:3000/discotecas/${id}`;

    try{
      const response = await fetch(url, {
        method:"PATCH", 
        body:formData
      });
      
      if(response.ok){
        setProfileImage(URL.createObjectURL(selectedFile)); 
        alert("Se actualizo la imagen de perfil correctamente");
      } else {
        alert("Error a la hora de actualizar la foto de perfil")
      }
    }catch (error){
      console.error("error cargando la imagen de perfil ", error)
    }
  }
  */

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const url = `http://localhost:3000/discotecas/${id}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion,
        horarios,
        contacto,
        redSocial,
        profileImage,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("USUARIO MODIFICADO EXITOSAMENTE");
        res.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.token);
        });
      } else {
        alert("FALLA A LA HORA DE MODIFICAR USUARIO");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
      <div className="mt-8 flex flex-col items-center justify-center mb-6">
        <img
          src={profileImage || "/placeholder.svg"}
          alt="profile"
          className="w-70 h-60 rounded-full border-8 border-amber-200 object-cover shadow-[0_0_20px_4px_rgba(245,158,11,0.5)]"
        />
      </div>

      <div className="p-8 rounded-2xl shadow-2xl w-4/5 h-full bg-stone-800/90 backdrop-blur-sm border border-amber-200/20">
        <div className="mb-4">
          <label
            className="block text-xl font-medium font-mono text-amber-200 mb-4"
            htmlFor="text"
          >
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-xl font-medium font-mono text-amber-200 mb-4"
            htmlFor="text"
          >
            Horarios
          </label>
          <input
            type="text"
            id="horarios"
            value={horarios}
            onChange={(e) => setHorarios(e.target.value)}
            className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-xl font-medium font-mono text-amber-200 mb-4"
            htmlFor="text"
          >
            Nombre persona de contacto
          </label>
          <input
            type="text"
            id="contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-xl font-medium font-mono text-amber-200 mb-4"
            htmlFor="password"
          >
            Link redes sociales
          </label>
          <input
            type="text"
            id="redSocial"
            value={redSocial}
            onChange={(e) => setRedSocial(e.target.value)}
            className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-xl font-medium font-mono text-amber-200 mb-4"
            htmlFor="password"
          >
            URL imagen de perfil
          </label>
          <input
            type="text"
            id="redSocial"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="basis-5/6 mt-1 block w-full p-3 border border-stone-600 bg-stone-700/50 text-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            required
          />
        </div>

        <div className="flex justify-center items-center h-full">
          <button
            className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            onClick={handleSubmit}
          >
            Actualizar perfil
          </button>
        </div>
      </div>
    </div>
  );
};
