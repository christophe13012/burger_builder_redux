import React, { useEffect } from "react";

const Deconnection = () => {
  useEffect(() => {
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(
        "https://christophe13012.github.io/burger_builder_redux"
      );
    }, 1500);
  });
  return (
    <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
      Deconnection en cours ...
    </h1>
  );
};

export default Deconnection;
