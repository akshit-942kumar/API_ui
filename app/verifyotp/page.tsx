import { Suspense } from "react";
import VerifyOtpClient from "../verify-otp/verifyOtp"

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}