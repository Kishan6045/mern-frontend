import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col " >
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full ">
        {children}
      </main>

    
    </div>
  );
};

export default Layout;
