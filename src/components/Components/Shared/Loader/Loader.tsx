import { FunctionComponent } from "react";
import classes from "./Loader.module.css";

export const Loader: FunctionComponent = (): JSX.Element => {
  return (
    <div className={classes["loader"]} data-testid="loader">
      Loading...
    </div>
  );
};
export default Loader;
