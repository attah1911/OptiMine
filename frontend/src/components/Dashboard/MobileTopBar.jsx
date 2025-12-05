import { HiOutlineMenu } from "react-icons/hi";

const MobileTopBar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-sage-200 lg:hidden">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onMenuClick}
          className="text-sage-600 hover:text-sage-800"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-sage-800">Mining DS</h1>
        <div className="w-6"></div>
      </div>
    </header>
  );
};

export default MobileTopBar;
