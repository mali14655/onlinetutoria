import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button"

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Button/>
      </main>
      <Footer />
    </>
  );
}
