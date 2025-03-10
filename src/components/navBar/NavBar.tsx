import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { PlusIcon, HomeIcon as HomeIconOutline , Cog8ToothIcon as Cog8ToothIconOutline } from '@heroicons/react/24/outline';
import { Cog8ToothIcon, HomeIcon } from '@heroicons/react/20/solid';
import Title from '../typography/Title';
import Paragraph from '../typography/Paragraph';
import Badge from '../badges/Badge';
import Input from '../inputs/Input';
import { Link, useLocation } from 'react-router'; // Import 'useLocation' from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../utils/apiProvider';
import { POST_CREATE_PLAN, POST_PLANS, POST_REGIONS } from '../../utils/endPoints';

const NavBar = () => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<{
        value: string;
        label: string;
        price: number;
    } | null>({ value: '', label: '', price: 0 });
    const [openConfig, setOpenConfig] = useState(false);
    const [step, setStep] = useState(1);
    const [configName, setConfigName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Add loading state
    const [cookies] = useCookies(['accessToken']);
    const token = cookies.accessToken;
    const [regions, setRegions] = useState<{ value: string; label: string }[]>([]);
    const [periods, setPeriods] = useState<{ value: string; label: string; price: number }[]>([]);
    const queryClient = useQueryClient();
    const location = useLocation(); // Get the current route

    const fetchLocations = async () => {
        const regionsData = await apiRequest({
            method: 'POST',
            endpoint: POST_REGIONS,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRegions(regionsData.data);
    };

    const createConfig = async () => {
        setLoading(true); // Start loading when mutation begins
        const createConfigData = await apiRequest({
            method: 'POST',
            endpoint: POST_CREATE_PLAN,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                "userName": configName,
                "planId": Number(selectedPeriod?.value),
                "locationId": Number(selectedRegion),
            }
        });
        setLoading(false); // End loading after mutation completes
    };

    const fetchPeriods = async () => {
        const periodsData = await apiRequest({
            method: 'POST',
            endpoint: POST_PLANS,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setPeriods(periodsData.data);
    };

    const createConfigMutation = useMutation({
        mutationFn: createConfig,
        onSuccess: () => {
            setStep(1);
            setSelectedPeriod(null);
            setSelectedRegion(null);
            setConfigName('');
            setOpenConfig(false);
            setError(null);
            queryClient.invalidateQueries({ queryKey: ['configs'] })
        },
        onError: (error) => {
            setError('Failed to create config');
            setLoading(false)
        },
    });

    const locationsQuery = useQuery({
        queryKey: ['locations'],
        queryFn: fetchLocations,
    });

    const PeriodsQuery = useQuery({
        queryKey: ['periods'],
        queryFn: fetchPeriods,
    });

    // Handle validation while typing
    const handleConfigNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfigName(value);

        const isEnglish = /^[A-Za-z0-9\s]*$/.test(value); // Check for non-English characters
        if (step === 3 && value && !isEnglish) {
            setError('Please use English');
        } else {
            setError(null);
        }
    };

    const handleStep = () => {
        if (handleValidate()) {
            if (step < 3) {
                setStep(step + 1);
            } else {
                createConfigMutation.mutate();
            }
        }
    };

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

    useEffect(() => {
        if (selectedRegion) {
            WebApp.MainButton.setText('Next');
            WebApp.MainButton.show();
        } else {
            WebApp.MainButton.hide();
        }
    }, [selectedRegion]);

    // Function to check if current route is active
    const isActiveRoute = (route: string) => location.pathname === route;

    return (
        <div
            className="fixed transition-all duration-1000 right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
            <div className="flex items-stretch justify-around gap-6 !text-primary'">
            <Link to={'/'}>
    {isActiveRoute('/') ? (
        <HomeIcon className='text-primary size-7' />
    ) : (
        <HomeIconOutline className='text-secondary-600 size-7' />
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
    {isActiveRoute('/setting') ? (
        <Cog8ToothIcon className='text-primary size-7' />
    ) : (
        <Cog8ToothIconOutline className='text-secondary-600 size-7' />
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
                        ? 'Select region'
                        : step === 2
                            ? 'Select period and traffic'
                            : 'Config name and pay'}
                </Paragraph>
                {step === 1 ? (
                    <div className="grid grid-cols-2 gap-3 my-2">
                        {regions.map((region) => (
                            <Badge
                                key={region.value}
                                onClick={() => setSelectedRegion(region.value)}
                                className={`cursor-pointer !rounded-md text-center ${
                                    selectedRegion === region.value ? '!bg-primary text-white' : 'text-secondary-600'
                                }`}>
                                <span className="text-xs inline-block mx-1">{region.label.split(' ')[0]}</span>
                                {region.label.split(' ')[1]}
                            </Badge>
                        ))}
                    </div>
                ) : step === 2 ? (
                    <div className="grid grid-cols-2 gap-3 my-2">
                        {periods.map((period) => (
                            <Badge
                                key={period.value}
                                onClick={() => setSelectedPeriod(period)}
                                className={`cursor-pointer !rounded-md text-center ${
                                    selectedPeriod === period ? '!bg-primary text-white' : 'text-secondary-600'
                                }`}>
                                {period.label}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    step === 3 && (
                        <div>
                            <Input
                                maxLength={20}
                                value={configName}
                                onChange={handleConfigNameChange}
                                label="Config name"
                            />
                            <Title>Your config</Title>
                            <div className="flex justify-between items-center">
                                <Paragraph>
                                    <span className="text-xs">{selectedRegion?.split(' ')[0]}</span>
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
                    className={`w-full cursor-pointer !bg-primary !text-white !rounded-md text-center py-2 shadow-[0px_0px_4px] shadow-secondary-500/60`}
                    disabled={loading || Boolean(error)}>
                    {loading ? (
                    
                    <div className="lds-ellipsis scale-[0.5] max-h-[10px]"><div></div><div></div><div></div><div></div></div>
                    ) : step === 3 ? (
                        'Create Config'
                    ) : (
                        'Next'
                    )}
                </button>
            )}
        </div>
    );
};

export default NavBar;
