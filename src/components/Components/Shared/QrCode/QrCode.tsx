import { QRCodeSVG } from "qrcode.react";
import { FunctionComponent } from "react";
import classes from "./QrCode.module.css";

export const QrCode: FunctionComponent<{ url: string }> = ({
  url,
}): JSX.Element => {
  return (
    <div className={classes["qr-code"]}>
      {url && <QRCodeSVG value={`${url}`} data-testid="QR-Code-SVG" />}
    </div>
  );
};
export default QrCode;
