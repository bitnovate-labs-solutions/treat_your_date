import TreaterImage from "@/assets/images/treater.png";
import TreateeImage from "@/assets/images/treatee.png";

const RenderDescription = ({ currentStep, onboardingSteps }) => {
  if (currentStep === 2) {
    return (
      <>
        <div className="flex mt-8">
          <div className="w-1/2">
            <div className="flex justify-center items-center mb-4">
              <img
                src={TreaterImage}
                alt="Welcome"
                className="w-20 h-20 object-cover"
              />
            </div>
            <strong className="text-lg font-black text-primary">
              Be a Treator
            </strong>
            <p className="text-lightgray mt-2">
              <strong className="text-primary">Treat</strong> someone <br /> to
              a meal and enjoy great company
            </p>
          </div>

          {/* DIVIDER */}
          <div className="flex flex-col items-center">
            <div className="flex-1 border-l border-lightgray mb-4" />
            <span className="px-3 text-xs">OR</span>
            <div className="flex-1 border-l border-lightgray mt-4" />
          </div>

          <div className="w-1/2">
            <div className="flex justify-center items-center mb-4">
              <img
                src={TreateeImage}
                alt="Welcome"
                className="w-20 h-20 object-cover"
              />
            </div>
            <strong className="text-lg font-black text-primary">
              Be a Treatee
            </strong>
            <p className="text-lightgray mt-2">
              <strong className="text-primary">Request</strong> a meal <br />{" "}
              and get invited by a Treator
            </p>
          </div>
        </div>
        <p className="mt-6 text-darkgray">
          Whichever <strong className="text-primary font-black">role</strong>{" "}
          you choose, <br /> good food and good company are just a tap away!
        </p>
      </>
    );
  }

  return (
    <p className="text-lightgray">{onboardingSteps[currentStep].description}</p>
  );
};

export default RenderDescription;
