import Badge from "../components/badges/Badge";
import NotFoundEmoji from "../components/emojies/NotFoundEmoji";
import NavBar from "../components/navBar/NavBar";
import TopBar from "../components/topBar/TopBar";
import Title from "../components/typography/Title";
import { useCookies } from "react-cookie";
import { apiRequest } from "../utils/apiProvider";
import { POST_GET_MY_CONFIGS } from "../utils/endPoints";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../components/Skeleton/Skeleton";
import ConfigCard from "../components/configCard/ConfigCard";
import { formatBytes } from "../utils/Utilitis";
import ConfigMap from "../components/configCard/ConfigMap";

const Home = () => {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const fetchConfigs = async () => {
    const configsData = await apiRequest({
      method: "POST",
      endpoint: POST_GET_MY_CONFIGS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        draw: 1,
        start: 0,
        length: 200,
        search: {
          value: "",
          regex: true,
        },
        order: [
          {
            column: 0,
            dir: "asc",
          },
        ],
        columns: [
          {
            data: "id",
            name: "id",
            searchable: true,
            orderable: true,
            search: {
              value: "",
              regex: true,
            },
          },
        ],
      },
    });
    // @ts-ignore
    return configsData.data;
  };

  const { data: configs, isLoading } = useQuery({
    queryKey: ["configs"],
    queryFn: fetchConfigs,
  });
  const totalVolume =
    configs?.reduce(
      (sum: number, config: any) => sum + config.consumptionVolume,
      0
    ) || 0;
  return (
    <div>
      <div className="sticky top-0 z-30 pb-2 bg-white" dir="rtl">
        <TopBar />
        <Badge className="my-4 text-left !rounded-lg !p-4 text-secondary-300">
          <bdo dir="ltr" className="text-right flex flex-row-reverse gap-1 justify-between">
            <span dir="rtl" className="">
            مصرف من 
            </span>
             <span className="rtl">{formatBytes(totalVolume)}</span>
          </bdo>
        </Badge>
        <div className="flex items-center justify-between py-2 relative">
          <Title>اشتراک های من</Title>
          <span>{configs ? configs.length : "0"}</span>
          <div className="bg-white w-full -z-10 h-[20px] top-0 fixed"></div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-1 px-2 pt-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : configs?.length > 0 ? (
        <div className="flex flex-col gap-3 px-2 pt-2 pb-[56px]">
          <ConfigMap data={configs}/>
        </div>
      ) : (
        <div className="h-[100%] flex justify-center items-center overflow-auto">
          <NotFoundEmoji />
        </div>
      )}

      <NavBar />
    </div>
  );
};

export default Home;
