import React from "react";
import { ChartsHeader } from "../../components";

const Pyramid = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="App" title="Pyramid Analysis" />
    </div>
  );
};

export default Pyramid;
