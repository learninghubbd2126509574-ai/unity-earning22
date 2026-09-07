import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = "w-5 h-5", size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="waGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#29E36F" />
          <stop offset="50%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#128C7E" />
        </linearGradient>
        <filter id="waShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#075E54" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main Circle Background with WhatsApp gradient */}
      <circle cx="24" cy="24" r="22" fill="url(#waGreen)" filter="url(#waShadow)" />

      {/* Gloss highlight */}
      <path
        d="M 6 20 A 20 20 0 0 1 42 20 A 22 14 0 0 0 6 20"
        fill="white"
        opacity="0.15"
      />

      {/* Speech bubble & Tail */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 10C16.268 10 10 16.268 10 24C10 26.697 10.764 29.219 12.094 31.353L10.5 37.5L16.837 35.882C18.91 37.155 21.368 37.893 24 37.893C31.732 37.893 38 31.625 38 23.893C38 16.161 31.732 10 24 10ZM24 35.215C21.722 35.215 19.593 34.542 17.801 33.385L17.378 33.111L13.161 34.187L14.288 30.076L13.987 29.624C12.721 27.728 12.053 25.875 12.053 23.893C12.053 17.304 17.411 11.947 24 11.947C30.589 11.947 35.947 17.304 35.947 23.893C35.947 30.482 30.589 35.215 24 35.215Z"
        fill="white"
      />

      {/* WhatsApp Phone Receiver Handle */}
      <path
        d="M19.167 16.486C18.825 15.727 18.468 15.711 18.143 15.698C17.876 15.687 17.57 15.687 17.265 15.687C16.959 15.687 16.463 15.801 16.044 16.258C15.624 16.716 14.441 17.822 14.441 20.072C14.441 22.322 16.082 24.496 16.311 24.801C16.54 25.106 19.477 29.835 24.092 31.666C27.928 33.187 28.71 32.882 29.549 32.806C30.388 32.73 32.257 31.701 32.639 30.633C33.02 29.566 33.02 28.65 32.906 28.46C32.791 28.269 32.486 28.155 32.028 27.926C31.57 27.697 29.32 26.591 28.9 26.438C28.48 26.286 28.175 26.21 27.87 26.668C27.565 27.125 26.688 28.155 26.42 28.46C26.153 28.765 25.886 28.803 25.428 28.575C24.97 28.346 23.494 27.861 21.745 26.302C20.383 25.089 19.464 23.59 19.197 23.133C18.93 22.675 19.168 22.428 19.398 22.199C19.605 21.993 19.858 21.661 20.087 21.394C20.316 21.127 20.392 20.937 20.545 20.631C20.697 20.327 20.621 20.059 20.507 19.831C20.392 19.602 19.553 17.352 19.167 16.486Z"
        fill="white"
      />
    </svg>
  );
};
