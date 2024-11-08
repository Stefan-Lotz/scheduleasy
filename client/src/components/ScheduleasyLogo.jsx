const Logo = ({ color, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 155 155"
      stroke={color}
      width={size}
      height={size}
    >
      <g
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="6"
      >
        <path d="M32.731513 35.052083c-3.325384 34.021223-6.071558 51.698039-8.441356 65.228669-1.889405 10.78777 2.300909 23.17903 9.46455 31.46324 8.43342 9.75261 22.197317 15.28114 35.044419 16.37111 9.955295.84462 24.071435-7.38286 28.703975-11.28618 11.29786-9.51944 38.58535-29.20541 30.33096-39.29567-3.9181-4.78953-7.56355-2.8569-9.18038-5.39904-1.61683-2.54214 1.38598-6.13887-2.35781-10.22663-3.74379-4.08775-6.90482-.82532-9.03167-3.59669-2.12684-2.77138 1.58628-6.168489-3.31251-11.607812-4.89879-5.439328-14.06558-.709682-11.51094-3.45328 5.99337-6.43667.034.01217 34.68045-38.173866 3.15237-3.474429 6.75956-9.888815 1.15376-15.606378-5.6058-5.717563-12.31507-1.144358-15.99008 2.560647-58.559026 59.036963-60.624267 60.62428-60.624267 60.62428l.511599-38.113996s-1.141253-9.632919-9.720351-9.97615c-8.579097-.343231-9.720349 10.487746-9.720349 10.487746zM57.803769 14.991851l2.78181 15.859516M74.044749 5.046394l-5.132378 28.205503M84.758531 22.426l-6.76268 11.111253" />
      </g>
    </svg>
  );
};

export default Logo;