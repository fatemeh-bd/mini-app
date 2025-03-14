import React, { useState } from "react";
import ConfigCard from "./ConfigCard";

interface Config {
  subLink: string;
  userName: string;
  consumptionVolume: number;
  totalVolume: number;
  planeEnName: string;
  isRenewal: boolean;
  connections: string[];
}

interface ConfigMapProps {
  data: Config[];
}

const ConfigMap: React.FC<ConfigMapProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {data.map((config, index) => (
        <ConfigCard
          key={config.subLink}
          config={config}
          isOpen={index === openIndex}
          toggleOpen={() => toggleOpen(index)}
        />
      ))}
    </>
  );
};

export default ConfigMap;
