import MainFooter from "../MainFooter";
import MainHeader from "../MainHeader";
import { MainLayoutProvider } from "../../contexts/MainLayoutContext";
import IconOVO from "../../icons/IconOVO";
import Button from "../Button";
import { useBase } from "../../contexts/BaseContext";

function MainLayout() {
  const { setCurrentLayout } = useBase();

  const startOVOLeague = () => {
    setCurrentLayout("game");
  };

  return (
    <MainLayoutProvider>
      <div className="h-screen flex flex-col justify-between items-center">
        <div className="h-1/12 p-6 w-screen flex justify-between items-center">
          <MainHeader />
        </div>
        <div className="flex-1 p-6 w-full flex flex-col justify-center items-center">
          <div className="p-4 h-fit w-full gap-4 flex flex-col justify-center items-center bg-[#171717] border rounded-xl border-neutral-700">
            <div className="w-full gap-4 flex justify-between items-center">
              <IconOVO className="h-16 aspect-square text-orange-500" />
              <div className="flex-1 flex-col justify-center items-center gap-2">
                <p className="text-orange-500 font-semibold uppercase">
                  OVO Sound League
                </p>
                <p className="text-xs text-neutral-500">Some Description</p>
              </div>
            </div>
            <Button OnClick={startOVOLeague} fill={true} disabled={false}>
              Enter To This Tournament
            </Button>
          </div>
        </div>
        <div className="bg-[#171717] p-6 border-t rounded-t-3xl border-neutral-700 h-1/10 w-screen flex justify-between items-center">
          <MainFooter />
        </div>
      </div>
    </MainLayoutProvider>
  );
}

export default MainLayout;
