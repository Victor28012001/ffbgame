import { useProgress } from "@react-three/drei";

interface CharacterModelProps {
  started: boolean;
  onStarted: React.MouseEventHandler<HTMLButtonElement>;
}
export const LoadingScreen: React.FC<CharacterModelProps> = ({ started, onStarted }) => {
  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>

      <div className="loadingScreen__board">
        <div className="borderColour borderTopLeft"></div>
        <div className="borderColour borderTopRight"></div>
        <div className="borderColour borderRightTop"></div>
        <div className="borderColour borderRightBottom"></div>
        <div className="borderColour borderLeftTop"></div>
        <div className="borderColour borderLeftBottom"></div>
        <div className="borderColour borderBottom"></div>
        <div className="flex flex-col items-center mb-4">
          {progress < 100 ? (
            <>
              <h3 className="text-white text-lg font-black">{Math.round(progress)}%</h3>
              <div className="loadingScreen__progress">
                <div
                  className="loadingScreen__progress__value"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <h1 className="loadingScreen__title">Welcome, To FFBGame</h1>
          )}
        </div>
        <button
          className="loadingScreen__button"
          disabled={progress < 100}
          onClick={onStarted}
        >
          <span className="noselect">Open & Enter</span>
        </button>
      </div>
    </div>
  );
};
