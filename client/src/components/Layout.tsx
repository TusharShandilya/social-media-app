import React, { useContext } from "react";

interface Props {
  hasSidebar?: boolean;
}

const Layout: React.FC<Props> = ({ children, hasSidebar }) => {
  return (
    <div className="page">
      <main className="page-container">{children}</main>
      {hasSidebar && <aside className="page-sidebar"></aside>}
    </div>
  );
};

export default Layout;
