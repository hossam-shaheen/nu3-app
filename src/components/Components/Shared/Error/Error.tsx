import { FunctionComponent } from "react";
import classes from "./Error.module.css";

export const Error: FunctionComponent<{
  errorClass: string;
  error: { icon?: string; message: string };
}> = ({ errorClass, error }): JSX.Element => {
  return (
    <div className={classes[errorClass]}>
      {error.icon && <i className={error.icon}></i>}
      {error?.message}
    </div>
  );
};
export default Error;
