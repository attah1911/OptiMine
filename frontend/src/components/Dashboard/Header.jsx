import { HiOutlineClock } from "react-icons/hi";
import { formatLastUpdate } from "../../utils/dateFormatters";

const Header = ({ title, lastUpdate }) => {
  return (
    <header className="bg-white border-b border-sage-200 shadow-sm">
      <div className="px-6 lg:px-8 py-4 lg:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl lg:text-2xl font-bold text-sage-800">{title}</h2>
        {lastUpdate && (
          <div className="flex items-center gap-2 text-sage-600 text-sm">
            <HiOutlineClock className="w-5 h-5" />
            <span>Last Update: {formatLastUpdate(lastUpdate)}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
