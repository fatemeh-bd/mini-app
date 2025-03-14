import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import {
  PlusIcon,
  HomeIcon as HomeIconOutline,
  Cog8ToothIcon as Cog8ToothIconOutline,
} from "@heroicons/react/24/outline";
import { Cog8ToothIcon, HomeIcon } from "@heroicons/react/20/solid";
import Title from "../typography/Title";
import Paragraph from "../typography/Paragraph";
import Badge from "../badges/Badge";
import Input from "../inputs/Input";
import { Link, useLocation } from "react-router"; // Import 'useLocation' from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/apiProvider";
import {
  POST_CREATE_PLAN,
  POST_PLANS,
  POST_REGIONS,
} from "../../utils/endPoints";
import { createRoot } from "react-dom/client";
import ConfettiExplosion from "react-confetti-explosion";
import useUserStore from "../../store/userStore";
import {
  HapticLight,
  HapticMedium,
  HapticNotificationOccurredError,
  HapticNotificationOccurredSuccess,
  HapticSelectionChanged,
} from "../../utils/Utilitis";

const NavBar = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<{
    value: string;
    label: string;
    price: number;
  } | null>({ value: "", label: "", price: 0 });
  const { userInfo } = useUserStore();
  const [openConfig, setOpenConfig] = useState(false);
  const [step, setStep] = useState(1);
  const [configName, setConfigName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const [regions, setRegions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [periods, setPeriods] = useState<
    { value: string; label: string; price: number }[]
  >([]);
  const queryClient = useQueryClient();
  const location = useLocation(); // Get the current route

  const fetchLocations = async () => {
    const regionsData = await apiRequest({
      method: "POST",
      endpoint: POST_REGIONS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // @ts-ignore
    setRegions(regionsData.data);
  };

  const showConfettiExplosion = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
      <ConfettiExplosion
        particleCount={150}
        className="fixed top-0 z-[99] left-[50%] translate-x-[-50%]"
      />
    );
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(container);
    }, 3000);
  };

  const createConfig = async () => {
    setLoading(true); // Start loading when mutation begins
    const createConfigData = await apiRequest({
      method: "POST",
      endpoint: POST_CREATE_PLAN,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        userName: configName,
        planId: Number(selectedPeriod?.value),
        locationId: Number(selectedRegion),
      },
    });
    setLoading(false); // End loading after mutation completes
  };

  const fetchPeriods = async () => {
    const periodsData = await apiRequest({
      method: "POST",
      endpoint: POST_PLANS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // @ts-ignore
    setPeriods(periodsData.data);
  };

  const createConfigMutation = useMutation({
    mutationFn: createConfig,
    onSuccess: () => {
      setStep(1);
      setSelectedPeriod(null);
      setSelectedRegion(null);
      setConfigName("");
      setOpenConfig(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      showConfettiExplosion();
      HapticNotificationOccurredSuccess();
    },
    onError: (_error) => {
      setError("Failed to create config");
      HapticNotificationOccurredError();
      setLoading(false);
    },
  });

  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  const PeriodsQuery = useQuery({
    queryKey: ["periods"],
    queryFn: fetchPeriods,
  });

  // Handle validation while typing
  const handleConfigNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfigName(value);

    const isEnglish = /^[A-Za-z0-9\s]*$/.test(value); // Check for non-English characters
    if (step === 3 && value && !isEnglish) {
      HapticNotificationOccurredError();
      setError("نام کانفیگ باید به انگلیسی باشد");
    } else {
      setError(null);
    }
  };

  const handleValidate = () => {
    if (step === 1 && !selectedRegion) {
      setError("لطفا یک کشور انتخاب کنید");
      return false;
    } else if (step === 2 && selectedPeriod?.value === "") {
      setError("لطفا یک بازه زمانی انتخاب کنید");
      return false;
    } else if (step === 3 && !configName) {
      setError("لطفا نام کانفیگ را وارد کنید");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleStep = async () => {
    // Reset the error state before validation
    setError(null);
    HapticMedium();
    // Validate the current step
    const isValid = handleValidate();

    if (isValid) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Check if user has enough balance
        if (
          userInfo &&
          selectedPeriod &&
          userInfo.balance &&
          Number(userInfo.balance) >= selectedPeriod.price
        ) {
          createConfigMutation.mutate();
        } else {
          setError("Not enough balance");
          HapticNotificationOccurredError();
        }
      }
    } else {
      HapticNotificationOccurredError();
    }
  };

  useEffect(() => {
    handleValidate();
  }, [selectedRegion, selectedPeriod, configName]);

  // useEffect(() => {
  //   if (selectedRegion) {
  //     WebApp.MainButton.setText("Next");
  //     WebApp.MainButton.show();
  //   } else {
  //     WebApp.MainButton.hide();
  //   }
  // }, [selectedRegion]);

  // Function to check if current route is active
  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <div dir="rtl" className="fixed transition-all duration-1000 right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
      <div className="flex items-stretch justify-around gap-6 !text-primary'">
        <Link to={"/"}>
          {isActiveRoute("/") ? (
            <HomeIcon className="text-primary size-7" />
          ) : (
            <HomeIconOutline className="text-secondary-600 size-7" />
          )}
        </Link>

        <div
          className="bg-primary p-3 rounded-full absolute -top-6 cursor-pointer"
          onClick={() => {
            setOpenConfig((prev) => {
              if (prev) {
                setStep(1);
                setSelectedPeriod(null);
                setSelectedRegion(null);
                setConfigName("");
              }
              HapticSelectionChanged();
              return !prev;
            });
            setError(null);
          }}
        >
          <PlusIcon
            className={`size-8 text-white transition-all duration-500 ${
              openConfig ? "rotate-45" : ""
            }`}
          />
        </div>
        <Link to={"/setting"}>
          {isActiveRoute("/setting") ? (
            <Cog8ToothIcon className="text-primary size-7" />
          ) : (
            <Cog8ToothIconOutline className="text-secondary-600 size-7" />
          )}
        </Link>
      </div>

      <div
        className={`overflow-hidden transition-all duration-1000 ${
          openConfig ? "opacity-100 h-auto pt-4 px-1" : "opacity-0 h-0 p-0"
        }`}
      >
        <Title>ساخت کانفیگ جدید</Title>
        <Paragraph light>
          {step === 1
            ? "کشور مورد نظر خود را انتخاب کنید"
            : step === 2
            ? "بازه زمانی و مقدار ترافیک را انتخاب کنید"
            : ""}
        </Paragraph>
        {step === 1 ? (
          <div className="grid grid-cols-2 gap-3 my-2">
            {regions.map((region) => (
              <Badge
                key={region.value}
                onClick={() => {
                  setSelectedRegion(region.value);
                  HapticLight();
                }}
                className={`cursor-pointer !rounded-md text-center ${
                  selectedRegion === region.value
                    ? "!bg-primary text-white"
                    : "text-secondary-600"
                }`}
              >
                <span className="text-xs inline-block mx-1">
                  {region.label.split(" ")[0]}
                </span>
                {region.label.split(" ")[1]}
              </Badge>
            ))}
          </div>
        ) : step === 2 ? (
          <div className="grid grid-cols-2 gap-3 my-2">
            {periods.map((period) => (
              <Badge
                key={period.value}
                onClick={() => {
                  setSelectedPeriod(period);
                  HapticLight();
                }}
                className={`cursor-pointer !rounded-md text-center ${
                  selectedPeriod === period
                    ? "!bg-primary text-white"
                    : "text-secondary-600"
                }`}
              >
                {period.label}
              </Badge>
            ))}
          </div>
        ) : (
          step === 3 && (
            <div>
              <Input
              dir="ltr"
                maxLength={15}
                value={configName}
                onChange={handleConfigNameChange}
                label="نام کانفیگ"
              />
              <Title>کانفیگ شما</Title>
              <div dir="ltr" className="flex justify-between items-center">
                <Paragraph>
                  <span className="text-xs">
                    {selectedRegion?.split(" ")[0]}
                  </span>
                  <span className="mx-1">-</span>
                  {configName}
                </Paragraph>
                <Paragraph>{selectedPeriod?.label}</Paragraph>
              </div>
            </div>
          )
        )}
      </div>
      {openConfig && (
        <div className="mb-2">
          {error && <span className="text-red-500">{error}</span>}
        </div>
      )}
      {openConfig && (
        <button
          onClick={() => {
            handleStep();
            console.log(userInfo);
          }}
          className={`w-full cursor-pointer !bg-primary !text-white !rounded-md text-center py-3 `}
          disabled={loading || Boolean(error)}
        >
          {loading ? (
            <div className="lds-ellipsis scale-[0.5] max-h-[10px]">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : step === 3 ? (
            "ساخت کانفیگ"
          ) : (
            "بعدی"
          )}
        </button>
      )}
    </div>
  );
};

export default NavBar;
