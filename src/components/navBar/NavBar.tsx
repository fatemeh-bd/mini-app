import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import {
  Cog6ToothIcon,
  PlusIcon,
  HomeIcon as HomeIconOutline,
} from '@heroicons/react/24/outline';
import Paragraph from '../typography/Paragraph';
import { Cog8ToothIcon, HomeIcon } from '@heroicons/react/20/solid';
import Title from '../typography/Title';
import Badge from '../badges/Badge';
// import SliderRange from "../slider/SliderRange";
import Input from '../inputs/Input';
import { Link, useLocation } from 'react-router';
import { apiRequest } from '../../utils/apiProvider';
import { POST_PLANS, POST_REGIONS } from '../../utils/endPoints';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';

// const periods = ["One month", "Two months", "Three months", "Six months"];
const NavBar = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<{
    value: string;
    label: string;
    price: number;
  } | null>({ value: '', label: '', price: 0 });
  // const [selectedRange, setSelectedRange] = useState<number>(0);
  const [openConfig, setOpenConfig] = useState(false);
  const [step, setStep] = useState(1);
  const [configName, setConfigName] = useState<string>('');
  const { pathname } = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['accessToken']);
  const token = cookies.accessToken;
  const [regions, setRegions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [periods, setPeriods] = useState<
    { value: string; label: string; price: number }[]
  >([]);
  useEffect(() => {
    if (selectedRegion) {
      WebApp.MainButton.setText('Next');
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }
  }, [selectedRegion]);

  const fetchLocations = async () => {
    const regionsData = await apiRequest({
      method: 'POST',
      endpoint: POST_REGIONS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // @ts-ignore
    setRegions(regionsData.data);
  };
  const fetchPeriods = async () => {
    const periodsData = await apiRequest({
      method: 'POST',
      endpoint: POST_PLANS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // @ts-ignore
    setPeriods(periodsData.data);
  };
  const locationsQuery = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });
  const PeriodsQuery = useQuery({
    queryKey: ['periods'],
    queryFn: fetchPeriods,
  });

  const handleValidate = () => {
    if (step === 1 && !selectedRegion) {
      setError('Please select a region');
      return false;
    } else if (step === 2 && !selectedPeriod) {
      setError('Please select a period');
      return false;
    } else if (step === 3 && !configName) {
      setError('Please enter a name for your configuration');
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleStep = () => {
    if (handleValidate()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setStep(1);
      }
    }
  };

  useEffect(() => {
    setOpenConfig((prev) => {
      if (prev) {
        setStep(1);
        setSelectedPeriod(null);
        setSelectedRegion(null);
        setConfigName('');
      }
      return !prev;
    });
    if (locationsQuery && PeriodsQuery) {
    }
  }, []);

  // useEffect(() => {
  //   const handleMainButtonClick = async () => {
  //     WebApp.MainButton.disable();
  //     WebApp.MainButton.setText('Next');
  //     WebApp.MainButton.enable();
  //     setStep(step + 1);
  //   };

  //   WebApp.MainButton.onClick(handleMainButtonClick);
  //   return () => {
  //     WebApp.MainButton.offClick(handleMainButtonClick);
  //   };
  // }, [selectedRegion, selectedPeriod]);

  return (
    <div className="fixed transition-all duration-1000 right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
      <div className="flex items-stretch justify-around gap-6">
        <Link to={'/'}>
          {pathname === '/setting' ? (
            <HomeIconOutline className="size-7 text-primary" />
          ) : (
            <HomeIcon className="size-7 text-primary" />
          )}
        </Link>
        <div
          className="bg-primary p-3 rounded-full absolute -top-6 cursor-pointer"
          onClick={() =>
            setOpenConfig((prev) => {
              if (prev) {
                setStep(1);
                setSelectedPeriod(null);
                setSelectedRegion(null);
                setConfigName('');
                // setSelectedRange(0);
              }
              return !prev;
            })
          }>
          <PlusIcon
            className={`size-8 text-white transition-all duration-500 ${
              openConfig ? 'rotate-45' : ''
            }`}
          />
        </div>
        <Link to={'/setting'}>
          {pathname === '/setting' ? (
            <Cog8ToothIcon className="size-7 text-primary" />
          ) : (
            <Cog6ToothIcon className="size-7 text-secondary-500" />
          )}
        </Link>
      </div>

      <div
        className={`overflow-hidden transition-all duration-1000 ${
          openConfig ? 'opacity-100 h-auto pt-4 px-1' : 'opacity-0 h-0 p-0'
        }`}>
        <Title>Create new config</Title>
        <Paragraph light>
          {step === 1
            ? 'select region'
            : step === 2
            ? 'Select period and traffic'
            : 'Config name and pay'}
        </Paragraph>
        {step === 1 ? (
          <div className="grid grid-cols-2 gap-3 my-2">
            {regions &&
              regions.map((region: { value: string; label: string }) => (
                <Badge
                  key={region.value}
                  onClick={() => setSelectedRegion(region.value)}
                  className={`cursor-pointer !rounded-md text-center ${
                    selectedRegion === region.value
                      ? '!bg-primary text-white'
                      : 'text-secondary-600'
                  }`}>
                  <span className="text-xs inline-block mx-1">
                    {region.label.split(' ')[0]}
                  </span>
                  {region.label.split(' ')[1]}
                </Badge>
              ))}
          </div>
        ) : step === 2 ? (
          <div className="grid grid-cols-2 gap-3 my-2 spinOnce">
            {periods.map(
              (period: { value: string; label: string; price: number }) => (
                <Badge
                  key={period.value}
                  onClick={() => setSelectedPeriod(period)}
                  className={`cursor-pointer !rounded-md text-center ${
                    selectedPeriod === period
                      ? '!bg-primary text-white'
                      : 'text-secondary-600'
                  }`}>
                  {period.label}
                </Badge>
              )
            )}
            {selectedPeriod && Number(selectedPeriod?.value) > 0 && (
              <div className="flex text-center items-center overflow-hidden whitespace-nowrap w-full relative">
                <div className="">
                  <Paragraph>
                    {selectedPeriod?.price
                      ? new Intl.NumberFormat('en-US').format(
                          Number(selectedPeriod?.price)
                        )
                      : '0'}
                  </Paragraph>
                </div>
                <Paragraph className="ml-[-2px] px-2 relative z-10">
                  Toman
                </Paragraph>
              </div>
            )}
            {/* {selectedPeriod && (
              <SliderRange onChange={(value) => setSelectedRange(value)} />
            )}{" "} */}
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
                    {selectedRegion?.split(' ')[0]}
                  </span>
                  <span>-</span>
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
          }}
          className={`w-full cursor-pointer !bg-primary !text-white !rounded-md text-center py-2 shadow-[0px_0px_4px] shadow-secondary-500/60 `}>
          Next
        </button>
      )}
    </div>
  );
};

export default NavBar;
