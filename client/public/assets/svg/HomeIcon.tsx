import React from "react";
import styles from "../../../src/components/headerAccount/HeaderAccount.module.scss";
import basicHeaderStyles from "../../../src/components/basic/basicHeader/BasicHeader.module.scss"
export default function HomeIcon() {
  return (
    <svg
      className={`${styles.icon} ${basicHeaderStyles.icon}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="defaultGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0575E6" />
          <stop offset="100%" stopColor="#031C7A" />
        </linearGradient>
        <linearGradient id="hoverGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7F50" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      <path
        d="M19.0009 10.5974C18.9218 10.5979 18.8434 10.5828 18.7701 10.5529C18.6969 10.523 18.6303 10.479 18.5741 10.4234L9.983 1.84091L1.39191 10.4234C1.2769 10.5217 1.12896 10.5731 0.977651 10.5673C0.826344 10.5614 0.682815 10.4988 0.575745 10.3919C0.468675 10.285 0.405951 10.1417 0.400107 9.99069C0.394262 9.83965 0.445728 9.69196 0.54422 9.57714L9.56217 0.57455C9.67481 0.462768 9.82718 0.400024 9.98601 0.400024C10.1448 0.400024 10.2972 0.462768 10.4099 0.57455L19.4278 9.57714C19.5105 9.6614 19.5665 9.76813 19.5889 9.88399C19.6112 9.99985 19.5988 10.1197 19.5532 10.2286C19.5077 10.3374 19.431 10.4305 19.3328 10.4961C19.2345 10.5617 19.1191 10.5969 19.0009 10.5974Z"
      />
      <path
        d="M9.98352 3.86951L2.76917 11.0956V18.3997C2.76917 18.718 2.89585 19.0234 3.12134 19.2485C3.34683 19.4736 3.65266 19.6 3.97156 19.6H8.17993V13.5983H11.7871V19.6H15.9955C16.3144 19.6 16.6202 19.4736 16.8457 19.2485C17.0712 19.0234 17.1979 18.718 17.1979 18.3997V11.0536L9.98352 3.86951Z"
      />
    </svg>
  );
}
