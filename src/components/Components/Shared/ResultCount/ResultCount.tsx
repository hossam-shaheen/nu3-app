import { FunctionComponent } from "react";
import classes from "./ResultCount.module.css";

export const ResultCount: FunctionComponent<{ count: number }> = ({
  count,
}): JSX.Element => {
  return (
    <p className={classes["result-count"]}>
      <span>
        {count} {count > 1 ? "results" : "result"}{" "}
      </span>
    </p>
  );
};
export default ResultCount;
