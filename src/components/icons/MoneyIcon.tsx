interface MoneyIconProps {
    width?: number;
    height?: number;
}

export const MoneyIcon = ({width = 38, height = 41}: MoneyIconProps) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 38 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M27.0091 3.93554L21.355 2.82086L21.0281 4.41051C15.7575 6.26332 11.2342 11.7832 9.77221 18.927C8.3102 26.0708 10.3191 32.8702 14.448 36.5843L14.1234 38.1761L19.7884 39.2908C27.3097 40.7756 35.0272 34.0619 37.0252 24.2993C39.0232 14.5368 34.5304 5.41822 27.0091 3.93554Z"
                    fill="#E86124"/>
                <path
                    d="M20.8451 34.0768L15.191 32.9515L15.5156 31.3618C11.8988 28.1076 9.91165 22.4893 10.4542 16.3447C10.1773 17.1921 9.94959 18.0543 9.77221 18.927C8.3102 26.073 10.3191 32.8702 14.448 36.5843L14.1234 38.1761L19.7884 39.2908C27.3097 40.7756 35.0272 34.0619 37.0252 24.2993C37.1987 23.4294 37.3238 22.5509 37.4 21.6677C34.683 29.9904 27.6845 35.4162 20.8451 34.0768Z"
                    fill="#DC4A26"/>
                <path
                    d="M31.3574 23.187C33.3551 13.4235 28.8765 4.30553 21.3543 2.82154C13.8321 1.33756 6.11473 8.04946 4.11708 17.813C2.11942 27.5765 6.59795 36.6945 14.1202 38.1785C21.6424 39.6624 29.3597 32.9505 31.3574 23.187Z"
                    fill="#F0E92D"/>
                <path
                    d="M27.5937 22.4444C29.0393 15.379 25.7984 8.78071 20.355 7.70682C14.9115 6.63293 9.32683 11.4901 7.8812 18.5555C6.43558 25.621 9.67646 32.2193 15.1199 33.2932C20.5634 34.3671 26.1481 29.5099 27.5937 22.4444Z"
                    fill="#EF8521"/>
                <path
                    d="M17.5983 29.8749C12.1076 28.7923 8.30552 23.8072 8.01137 17.9707C7.96489 18.1632 7.92131 18.3579 7.88064 18.5548C6.43607 25.6151 9.67819 32.2176 15.1209 33.2916C18.6245 33.9827 22.1848 32.2219 24.6643 28.9848C22.4692 30.0247 19.9896 30.337 17.5983 29.8749Z"
                    fill="#E86124"/>
            </svg>
        </>
    )
}