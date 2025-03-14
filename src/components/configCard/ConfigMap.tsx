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
  id: string | number; // Ensure id can be used as a unique key
}

interface ConfigMapProps {
  data: Config[];
}

const ConfigMap: React.FC<ConfigMapProps> = ({ data }) => {
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleOpen = (id: string | number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {data.map((config) => (
        <ConfigCard
          key={config.id} // Use id as the key
          config={config}
          isOpen={config.id === openId} // Compare with openId
          toggleOpen={() => toggleOpen(config.id)} // Use config.id
        />
      ))}
    </>
  );
};

export default ConfigMap;
