import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto bg-[#111827]">
      <div className="w-full max-w-screen-xl h-full mx-auto">{children}</div>
    </main>
  );
};

export default LandingLayout;
