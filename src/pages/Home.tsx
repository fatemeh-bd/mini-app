import TopBar from "../components/topBar/TopBar";
import useEmojiStore from "../store/emojiStore";

const Home = () => {
  const { splash } = useEmojiStore();
  return (
    <div>
      <TopBar />
      <img src={splash} />
    </div>
  );
};

export default Home;
