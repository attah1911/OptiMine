import { formatNumber } from "../../utils/helpers";

const StatCard = ({ title, value, description, icon }) => {
  const displayValue = typeof value === "number" ? formatNumber(value) : value;

  return (
    <article className="card hover:shadow-lg transition-shadow duration-200">
      <header className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sage-800">{title}</h3>
        <div
          className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon}
            />
          </svg>
        </div>
      </header>
      <p className="text-sage-600 text-sm mb-2">{description}</p>
      <p className="text-3xl font-bold text-primary">{displayValue}</p>
    </article>
  );
};

export default StatCard;
