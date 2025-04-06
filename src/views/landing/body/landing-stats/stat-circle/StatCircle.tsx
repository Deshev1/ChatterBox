//CSS
import "./StatCircle.css";

//Types
import { ReactNode } from "react";

type StatCircleProps = {
  size?: number;
  children: ReactNode;
};

function StatCircle({ size = 160, children }: StatCircleProps) {
  return (
    <div
      className="stat-circle"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {children}
    </div>
  );
}

export default StatCircle;
