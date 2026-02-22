import CameraPermissionGuide from "./components/cameraguide";
import CameraPermissionButton from "./components/camerapermission";
import QRScanner from "./components/qrscanner";

export default function Camera() {
  return (
    <>
      <CameraPermissionButton />
      <QRScanner />
    </>
  );
}
