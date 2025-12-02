import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col " >
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full ">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
