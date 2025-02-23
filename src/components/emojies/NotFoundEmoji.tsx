import Lottie from "lottie-react";
import emoji from "../../assets/notfound.json";
import Paragraph from "../typography/Paragraph";

const NotFoundEmoji = () => {
  return (
    <div className="flex items-center flex-col justify-center h-full w-fit py-4 m-auto ">
      <Lottie
        animationData={emoji}
        loop={true}
        className="w-[200px] z-0 block mb-3"
      />
      <Paragraph light>You don't have any config</Paragraph>
    </div>
  );
};

export default NotFoundEmoji;
