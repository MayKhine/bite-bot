import React from "react"
import logoSvg from "../assets/logo.svg"
export const Header = () => {
  return (
    <h1 className="text-3xl font-bold text-tomato p-10 flex gap-2 items-center">
      <img src={logoSvg} className="w-10 h-10"></img>
      <div>Bite Bot</div>
    </h1>
  )
}
