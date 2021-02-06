import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="page">
      <Helmet>
        <title>Social Media {title ? `| ${title}` : ""} </title>
      </Helmet>
      <main className="page-container">{children}</main>
    </div>
  );
};

export default Layout;
