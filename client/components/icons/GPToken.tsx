import { Image } from "@chakra-ui/next-js";

export default function GPToken({ width = 20, height = 20, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "inline-block",
        verticalAlign: "text-bottom",
        ...props.style
      }}
      {...props}
    >
      <title>Gold Piece token</title>
      <g filter="url(#filter0_di_70_121)">
        <path
          d="M15.3823 4.40281L30.9052 8.28097L35.308 23.6633L24.188 35.1674L8.66512 31.2892L4.26226 15.9069L15.3823 4.40281Z"
          fill="url(#paint0_linear_70_121)"
        />
        <path
          d="M5.38253 16.1868L15.7 5.51293L30.1027 9.11121L34.1878 23.3834L23.8702 34.0573L9.46764 30.459L5.38253 16.1868Z"
          stroke="#D0AB4C"
          stroke-width="2"
        />
      </g>
      <g filter="url(#filter1_d_70_121)">
        <path
          d="M12.7739 18.5521L12.3791 16.8472L17.4939 15.663L17.8886 17.3679L12.7739 18.5521ZM12.2532 24.0616L11.069 18.9468L12.7739 18.5521L13.9581 23.6668L12.2532 24.0616ZM17.3679 22.8774L16.9731 21.1725L15.2682 21.5672L14.8735 19.8623L18.2833 19.0728L19.0728 22.4826L17.3679 22.8774ZM14.3528 25.3717L13.9581 23.6668L17.3679 22.8774L17.7626 24.5823L14.3528 25.3717ZM22.8773 23.3981L20.9037 14.8736L26.0184 13.6894L26.4131 15.3943L28.118 14.9995L28.5127 16.7044L26.8078 17.0992L27.2026 18.8041L23.7927 19.5935L24.5822 23.0033L22.8773 23.3981ZM23.398 17.8886L26.7396 17.115L26.3449 15.4101L23.0033 16.1837L23.398 17.8886Z"
          fill="#E2B050"
        />
      </g>
      <defs>
        <filter
          id="filter0_di_70_121"
          x="3.26227"
          y="4.40283"
          width="32.0457"
          height="30.7645"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.986667 0 0 0 0 0.666667 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_70_121"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_70_121"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.645 0 0 0 0 0.486244 0 0 0 0 0.3397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_70_121"
          />
        </filter>
        <filter
          id="filter1_d_70_121"
          x="9.67426"
          y="13.2947"
          width="20.0226"
          height="12.4718"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_70_121"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_70_121"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_70_121"
          x1="15.02"
          y1="12.8278"
          x2="28.8027"
          y2="33.8465"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFFDC1" />
          <stop offset="0.179403" stop-color="#FFEE95" />
          <stop offset="0.271361" stop-color="#F6F0BA" />
          <stop offset="0.415854" stop-color="#EEC355" />
          <stop offset="1" stop-color="#F6DB7B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
