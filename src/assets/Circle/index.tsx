import "./style.scss";

interface ICircle {
  time: number;
}

export const Circle = ({ time }: ICircle) => {
  return (
    <svg>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ed3b89" />
          <stop offset="100%" stopColor="#f47526" />
        </linearGradient>

        {/* <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient> */}
      </defs>

      <circle
        r="36"
        cx="40"
        cy="40"
        stroke="url(#gradient)"
        style={{
          animation: `countdown ${time}s linear infinite forwards`,
        }}
      ></circle>

      {/* <circle
        r="36"
        cx="40"
        cy="40"
        stroke="url(#gradient2)"
        style={{
          animation: `countdown ${time}s linear infinite forwards`,
        }}
      ></circle> */}
    </svg>
  );
};
