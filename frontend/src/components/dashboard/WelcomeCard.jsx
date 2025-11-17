const WelcomeCard = ({ title, description }) => {
  return (
    <div className="card bg-gradient-to-r from-primary to-primary-light text-white">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sage-50">{description}</p>
    </div>
  );
};

export default WelcomeCard;
