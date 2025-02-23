import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import Paragraph from "../typography/Paragraph";
import { HomeIcon } from "@heroicons/react/20/solid";

const NavBar = () => {
  return (
    <div className="fixed right-0 left-0 h-fit w-full bottom-0 bg-white p-4 shadow-[0px_0px_4px] shadow-secondary-500">
      <div className="flex items-stretch justify-around gap-6">
        <HomeIcon className="size-7 text-primary" />
      <div className="bg-primary p-3 rounded-full absolute -top-6">
        <PlusIcon className="size-8 text-white"/>
        </div>
        <Cog6ToothIcon className="size-7 text-secondary-500" />
      </div>
      <Paragraph light className="text-center pt-4">
        @Testmini
      </Paragraph>
    </div>
  );
};

export default NavBar;
