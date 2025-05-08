import { LogOut, ArrowLeft, LucideProps } from "lucide-react";

export const Icons = {
    arrowLeft: ArrowLeft,
    logOut: LogOut,
    logo: ({...props}: LucideProps) => (
      <svg
      width={props.width || "140"}
      height={props.height || "140"}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="chat-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#50E3C2" />
        </linearGradient>
        <linearGradient id="text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7B68EE" />
          <stop offset="100%" stopColor="#50E3C2" />
        </linearGradient>
        <filter
          id="shadow"
          x="-10%"
          y="-10%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#000"
            floodOpacity="0.25"
          />
        </filter>
        <filter
          id="text-shadow"
          x="-20%"
          y="-20%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1"
            floodColor="#000"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* Chat bubble */}
      <path
        d="M48 8H16C10.477 8 6 12.477 6 18v20c0 5.523 4.477 10 10 10h22l10 8V18c0-5.523-4.477-10-10-10z"
        fill="url(#chat-gradient)"
        filter="url(#shadow)"
      />

      {/* Tail of chat bubble */}
      <path
        d="M48 38l10 8V18"
        stroke="#3CAFA9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Three chat dots */}
      <circle cx="22" cy="28" r="4" fill="white" />
      <circle cx="32" cy="28" r="4" fill="white" />
      <circle cx="42" cy="28" r="4" fill="white" />

      {/* Text "Efoy Chat" with enhanced style */}
      <text
        x="32"
        y="58"
        textAnchor="middle"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="url(#text-gradient)"
        letterSpacing="0.1em"
        transform="uppercase"
        filter="url(#text-shadow)"
      >
        Efoy Chat
      </text>
    </svg>
    ),
    google: ({...props}: LucideProps) =>(
        <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 533.5 544.3"
      {...props}
    >
      <path fill="#4285F4" d="M533.5 278.4c0-18.9-1.6-37-4.6-54.6H272v103.3h146.9c-6.3 34-25.8 62.8-55.2 82v68h89.2c52.4-48.3 82.6-119.6 82.6-198.7z" />
      <path fill="#34A853" d="M272 544.3c74 0 136-24.6 181.2-66.8l-89.2-68c-24.9 16.8-56.7 26.7-92 26.7-70.7 0-130.7-47.7-152.3-111.5h-90.4v69.6C73.1 488.7 165 544.3 272 544.3z" />
      <path fill="#FBBC05" d="M119.7 323.9c-5.6-16.9-8.8-34.9-8.8-53.4 0-18.5 3.2-36.5 8.8-53.4v-69.6h-90.4C12.8 211.4 0 239.2 0 268.5s12.8 57.1 29.3 80.6l90.4-69.6z" />
      <path fill="#EA4335" d="M272 107.7c38.8 0 73.7 13.3 101.3 39.3l75.9-75.9C405.5 24.6 343.9 0 272 0 165 0 73.1 55.6 29.3 139.6l90.4 69.6c21.6-63.7 81.6-111.5 152.3-111.5z" />
    </svg>

    ),
    github: ({...props}: LucideProps) => (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.207 11.387c.6.11.82-.26.82-.577v-2.165c-3.337.726-4.042-1.608-4.042-1.608-.546-1.385-1.333-1.754-1.333-1.754-1.086-.743.082-.728.082-.728 1.2.085 1.832 1.233 1.832 1.233 1.07 1.832 2.807 1.304 3.492.996.108-.776.418-1.304.76-1.604-2.665-.304-5.467-1.333-5.467-5.933 0-1.31.47-2.382 1.235-3.222-.124-.303-.535-1.527.117-3.176 0 0 1.005-.322 3.3 1.23a11.468 11.468 0 013.005-.404c1.02 0 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.65.244 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.923.43.37.823 1.096.823 2.21v3.283c0 .323.218.697.825.577A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),

};
   
