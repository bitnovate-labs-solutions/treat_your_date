import Logo from "@/assets/images/tyd_logo.png";

const Loader = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <img
          src={Logo}
          alt="TreatYourDate Logo"
          className="w-32 h-32 mb-6 animate-pulse"
        />

        {/* Loading indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
        </div>

        {/* Loading text */}
        <p className="text-lightgray mt-4 text-sm">
          Setting up your experience...
        </p>
      </div>
    </>
  );
};

export default Loader;
