// components/AutoDownloadLink.tsx
"use client";

import { useRef } from "react";

interface AutoDownloadLinkProps {
  fileId: string;
  children: React.ReactNode;
  className?: string;
}

export default function AutoDownloadLink({ 
  fileId, 
  children, 
  className = "" 
}: AutoDownloadLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Open a new tab with the download URL
    const downloadUrl = `/api/download/${fileId}`;
    const newTab = window.open(downloadUrl, "_blank");
    
    // Check if the new tab was successfully opened
    if (newTab) {
      // Add a small delay before attempting to close the tab
      // This gives the browser time to initiate the download
      setTimeout(() => {
        try {
          newTab.close();
        } catch {
          console.log("Could not automatically close tab due to browser security restrictions");
        }
      }, 1000);
    }
  };

  return (
    <a
      ref={linkRef}
      href={`/api/download/${fileId}`}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}