import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import { HomeIcon } from "@heroicons/react/20/solid";
import Title from "../typography/Title";
import Badge from "../badges/Badge";
import SliderRange from "../slider/SliderRange";
import Input from "../inputs/Input";
const regions = [
  "DE Germany",
  "NL Netherlands",
  "us United States",
  "TR Turkey",
];
const periods = ["One month", "Two months", "Three months", "Six months"];
const NavBar = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<number>(0);
  const [openConfig, setOpenConfig] = useState(false);
  const [step, setStep] = useState(2);
  const [configName, setConfigName] = useState<string>("");
  useEffect(() => {
    if (selectedRegion) {
      WebApp.MainButton.setText("Next");
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }
  }, [selectedRegion]);

  useEffect(() => {
    const handleMainButtonClick = async () => {
      WebApp.MainButton.disable();
      WebApp.MainButton.setText("Next");
      WebApp.MainButton.enable();
      setStep(step + 1);
    };

    WebApp.MainButton.onClick(handleMainButtonClick);
    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
    };
  }, []);

  return (
    <div className="fixed transition-all duration-1000 right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
      <div className="flex items-stretch justify-around gap-6">
        <HomeIcon className="size-7 text-primary" />
        <div
          className="bg-primary p-3 rounded-full absolute -top-6 cursor-pointer"
          onClick={() =>
            setOpenConfig((prev) => {
              if (prev) {
                setStep(1);
                setSelectedPeriod(null);
                setSelectedRegion(null);
                setConfigName("");
                setSelectedRange(0);
              }
              return !prev;
            })
          }
        >
          <PlusIcon
            className={`size-8 text-white transition-all duration-500 ${
              openConfig ? "rotate-45" : ""
            }`}
          />
        </div>
        <Cog6ToothIcon className="size-7 text-secondary-500" />
      </div>

      <div
        className={`overflow-hidden transition-all duration-1000 ${
          openConfig ? "opacity-100 h-auto py-4 px-1" : "opacity-0 h-0 p-0"
        }`}
      >
        <Title>Create new config</Title>
        <Paragraph light>
          {step === 1
            ? "select region"
            : step === 2
            ? "Select period and traffic"
            : "Config name and pay"}
        </Paragraph>
        {step === 1 ? (
          <div className="grid grid-cols-2 gap-3 my-2">
            {regions.map((region) => (
              <Badge
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`cursor-pointer !rounded-md text-center ${
                  selectedRegion === region
                    ? "!bg-primary text-white"
                    : "text-secondary-600"
                }`}
              >
                <span className="text-xs inline-block mx-1">
                  {region.split(" ")[0]}
                </span>
                {region.split(" ")[1]}
              </Badge>
            ))}
          </div>
        ) : step === 2 ? (
          <div className="grid grid-cols-2 gap-3 my-2 spinOnce">
            {periods.map((period) => (
              <Badge
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`cursor-pointer !rounded-md text-center ${
                  selectedPeriod === period
                    ? "!bg-primary text-white"
                    : "text-secondary-600"
                }`}
              >
                {period}
              </Badge>
            ))}
            <Paragraph light>37,000,000 Toman</Paragraph>
            {selectedPeriod && (
              <SliderRange onChange={(value) => setSelectedRange(value)} />
            )}{" "}
          </div>
        ) : (
          step === 3 && (
            <div>
              <Input
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                label="Config name"
              />
              <Title>Your config</Title>
              <div className="flex justify-between items-center">
                <Paragraph>
                  <span className="text-xs">
                    {selectedRegion?.split(" ")[0]}
                  </span>
                  <span>-</span>
                  {configName}
                </Paragraph>
                <Paragraph>
                  {`( ${selectedPeriod} ) (${selectedRange} GB)`}
                </Paragraph>
              </div>
            </div>
          )
        )}
      </div>

      <Paragraph light className="text-center pt-4">
        @Testmini
      </Paragraph>
    </div>
  );
};

export default NavBar;
