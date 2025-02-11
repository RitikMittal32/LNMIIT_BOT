// components/QRCode.jsx
import QRCode from 'qrcode.react';

export default function AppQRCode() {
  return (
    <div className="p-4 bg-white rounded-lg shadow text-center">
      <h3 className="mb-2 font-semibold">Scan to Download App</h3>
      <QRCode 
        value="https://play.google.com/store/apps/details?id=com.lnmiit.chatbot"
        size={128}
      />
    </div>
  );
}