import Badge from "../components/badges/Badge";
import NotFoundEmoji from "../components/emojies/NotFoundEmoji";
import NavBar from "../components/navBar/NavBar";
import TopBar from "../components/topBar/TopBar";
import Title from "../components/typography/Title";

const Home = () => {
  return (
    <div>
      <TopBar />
      <Badge className="my-4 text-left !rounded-lg !p-4 text-secondary-600">
        My usage - 0.00 GB
      </Badge>
      <div className="flex items-center justify-between border-b border-secondary-200 py-2">
        <Title>My configs</Title>
        <span>0</span>
      </div>
      <div className="h-[100%] flex justify-center items-center overflow-auto">
        <NotFoundEmoji />
      </div>
      <NavBar />
    </div>
  );
};

export default Home;
