'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LegalConsentContextType {
  hasConsented: boolean;
  mandatoryConsent: boolean;
  marketingConsent: boolean;
  photoConsent: boolean;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  acceptConsents: (mandatory: boolean, marketing: boolean, photo: boolean) => void;
}

const LegalConsentContext = createContext<LegalConsentContextType>({
  hasConsented: false,
  mandatoryConsent: false,
  marketingConsent: false,
  photoConsent: false,
  showModal: false,
  setShowModal: () => {},
  acceptConsents: () => {},
});

export const LegalConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [mandatoryConsent, setMandatoryConsent] = useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [photoConsent, setPhotoConsent] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('kon_kvkk_consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setHasConsented(parsed.mandatory);
        setMandatoryConsent(parsed.mandatory);
        setMarketingConsent(parsed.marketing);
        setPhotoConsent(parsed.photo);
      } catch (e) {
        console.error('Failed to parse KVKK consent', e);
      }
    } else {
      // Prompt modal after brief delay if not consented
      const timer = setTimeout(() => setShowModal(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptConsents = (mandatory: boolean, marketing: boolean, photo: boolean) => {
    if (!mandatory) return;
    setMandatoryConsent(mandatory);
    setMarketingConsent(marketing);
    setPhotoConsent(photo);
    setHasConsented(true);
    setShowModal(false);

    localStorage.setItem(
      'kon_kvkk_consent',
      JSON.stringify({
        mandatory,
        marketing,
        photo,
        timestamp: new Date().toISOString(),
      })
    );
  };

  return (
    <LegalConsentContext.Provider
      value={{
        hasConsented,
        mandatoryConsent,
        marketingConsent,
        photoConsent,
        showModal,
        setShowModal,
        acceptConsents,
      }}
    >
      {children}
    </LegalConsentContext.Provider>
  );
};

export const useLegalConsent = () => useContext(LegalConsentContext);
