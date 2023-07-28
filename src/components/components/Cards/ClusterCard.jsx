import { FilledBtn } from "../Button/Button";

const ClusterCard = ({ title, pinned = false }) => {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-lg shadow-enterprise-card p-3  mb-2">
      <div className="flex justify-between items-center">
        <h2 className="text-black font-bold text-base">{title}</h2>
        <div className="flex gap-3">
        <div className={`rounded-full font-[500] text-[10px] text-navy border-navy border py-1 px-3`}>
          SBUX <span style={{ color: "#DF484C" }}> 0.52% </span>
        </div>
        <div className={`rounded-full font-[500] text-[10px] text-navy border-navy border py-1 px-3`}>
          TMUS <span style={{ color: "#04CA00" }}> 8.39% </span>
        </div>
        <div className={`rounded-full border-navy border py-1 px-3 text-xs`}>
          +7
        </div>
        </div>
 

        <button className="flex items-center justify-center rounded shadow-bulletin px-2 pt-2 pb-1 justify-self-end">
          <img
            src={pinned ? "/pin.svg" : "/pin-outline.svg"}
            alt="pinned-button"
            className="object-cover object-center"
          />
        </button>
      </div>
      <p className="cluster-card text-sm">
        The current economic environment is indeed hurting Amazon. But this is a
        temporary situation. And Amazon has the strength to weather this storm.
        The company is even improving its cost structure, which could help it
        excel in the future.
      </p>

      <div className="flex justify-between items-center">
        <FilledBtn text="See more" />
        <span className="text-[11px] text-gray-400">
          Dec. 26, 2022 at 5:52 am
        </span>
      </div>
    </div>
  );
};

export default ClusterCard;
