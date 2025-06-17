import React from "react";

interface Props {
  name: string;
}

const Icon = ({ name }: Props) => {
  switch (name) {
    case "theme":
      return (
        <svg
          viewBox="0 0 192 192"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g clipPath="url(#a)">
              {" "}
              <path
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M96 22v30m24-30v36m-42 76v24a11.998 11.998 0 0 0 12 12h12c3.183 0 6.235-1.264 8.485-3.515A11.996 11.996 0 0 0 114 158v-24M48 96v20a11.998 11.998 0 0 0 12 12h72c3.183 0 6.235-1.264 8.485-3.515A11.996 11.996 0 0 0 144 116V96.149L48 96Zm0 0V46a24 24 0 0 1 24-24h72v74H48Z"
              ></path>{" "}
            </g>{" "}
            <defs>
              {" "}
              <clipPath id="a">
                {" "}
                <path fill="#ffffff" d="M0 0h192v192H0z"></path>{" "}
              </clipPath>{" "}
            </defs>{" "}
          </g>
        </svg>
      );
    case "dot":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M22 22L2 22"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M2 11L10.1259 4.49931C11.2216 3.62279 12.7784 3.62279 13.8741 4.49931L22 11"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              opacity="0.5"
              d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M4 22V9.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M20 22V9.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              opacity="0.5"
              d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V22"
              stroke="#1C274C"
              strokeWidth="1.5"
            ></path>{" "}
            <path
              opacity="0.5"
              d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
              stroke="#1C274C"
              strokeWidth="1.5"
            ></path>{" "}
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
