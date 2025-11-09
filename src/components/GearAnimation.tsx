const GearAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-transparent">
      <div className="relative w-64 h-64">
        {/* Large Gear */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 10 L70 30 L90 30 L75 45 L85 65 L60 55 L35 65 L45 45 L30 30 L50 30 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="60" r="20" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="60" cy="60" r="8" fill="#ffffff" />
        </svg>

        {/* Small Gear - Counter-rotating */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-20 -translate-y-10 animate-spin-reverse"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 5 L47 20 L62 20 L50 32 L57 47 L40 37 L23 47 L30 32 L18 20 L33 20 Z"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="5" fill="#e5e7eb" />
        </svg>

        {/* Medium Gear */}
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-20 translate-y-10 animate-spin-slow"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 8 L58 25 L75 25 L62 38 L70 55 L50 47 L30 55 L38 38 L25 25 L42 25 Z"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#f3f4f6" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="6" fill="#f3f4f6" />
        </svg>
      </div>
    </div>
  );
};

export default GearAnimation;

