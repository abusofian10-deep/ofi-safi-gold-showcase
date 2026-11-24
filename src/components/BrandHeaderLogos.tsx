import React, { useState } from 'react';

export const BrandHeaderLogos: React.FC = () => {
  const [omniImgError, setOmniImgError] = useState(false);
  const [ofiImgError, setOfiImgError] = useState(false);

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {/* Omni Turnkey Branding */}
      <div className="flex items-center gap-2.5">
        {!omniImgError ? (
          <img
            src="./assets/omni_logo.png"
            alt="Omni Turnkey"
            onError={() => setOmniImgError(true)}
            className="h-8 md:h-10 w-auto object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
          />
        ) : null}
        <div className="flex flex-col">
          <span className="font-extrabold tracking-wider text-xs md:text-sm gold-gradient-text uppercase">
            OMNI TURNKEY
          </span>
          <span className="text-[9px] md:text-[10px] text-slate-400 font-tajawal hidden sm:inline">
            الاستشارات الإدارية والحوكمة
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

      {/* OFI Branding */}
      <div className="flex items-center gap-2.5">
        {!ofiImgError ? (
          <img
            src="./assets/ofi_logo.png"
            alt="OFI"
            onError={() => setOfiImgError(true)}
            className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
          />
        ) : (
          <span className="font-bold text-xs md:text-sm text-white">OFI</span>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs md:text-sm text-slate-200">
              عبر البحار
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#D4AF37]/15 text-[#F3D578] font-bold border border-[#D4AF37]/30">
              صافي الذهبي
            </span>
          </div>
          <span className="text-[9px] md:text-[10px] text-slate-400 font-tajawal hidden md:inline">
            للصناعات الغذائية (OFI)
          </span>
        </div>
      </div>
    </div>
  );
};
