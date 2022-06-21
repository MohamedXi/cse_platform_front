import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { verticalNavClosedWidth, verticalNavOpenWidth } from '../../styles/theme'
import clsx from 'clsx'

interface LogoClasses {
  root?: string
  small?: string
  large?: string
}

type LogoClassKey = keyof LogoClasses

const useStyles = makeStyles<Theme, {}, LogoClassKey>((theme: Theme) => ({
  root: {
    height: '3.25rem',
  },
  large: {
    width: verticalNavOpenWidth,
    transition: theme.transitions.create(['width', 'padding', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: '0 3.25rem 0 3.25rem',
  },
  small: {
    width: verticalNavClosedWidth,
    transition: theme.transitions.create(['width', 'padding', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: '0 .5rem 0 .5rem',
  },
}))

interface LogoProps {
  large: boolean
}

const Logo = ({ large = false }: LogoProps) => {
  const classes = useStyles()

  return (
    <div
      className={`${clsx(classes.root, {
        [classes.large]: large,
        [classes.small]: !large,
      })} flex flex-row self-center items-center box-border`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.464 63.8">
        <defs>
          <style>
            {`.a{fill:currentColor;}.b{filter:url(#w);}.c{filter:url(#u);}.d{filter:url(#s);}.e{filter:url(#q);}.f{filter:url(#o);}.g{filter:url(#m);}.h{filter:url(#k);}.i{filter:url(#i);}.j{filter:url(#g);}.k{filter:url(#e);}.l{filter:url(#c);}.m{filter:url(#a);}`}
          </style>
          <filter id="a" x="32.591" y="37.439" width="24.545" height="26.361" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="b" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="b" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="c" x="40.154" y="34.935" width="20.223" height="26.655" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="d" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="d" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="e" x="43.187" y="37.439" width="23.45" height="24.248" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="f" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="f" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="g" x="49.559" y="35.794" width="22.358" height="25.882" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="h" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="h" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="i" x="54.335" y="37.439" width="23.622" height="24.248" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="j" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="j" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="k" x="60.571" y="34.885" width="22.812" height="26.705" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="l" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="l" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="m" x="65.151" y="37.439" width="24.139" height="24.248" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="n" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="n" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="o" x="72.307" y="37.428" width="22.347" height="24.162" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="p" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="p" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="q" x="77.009" y="37.439" width="27.455" height="24.151" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="r" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="r" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="s" x="0" y="0.214" width="42.521" height="49.014" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="t" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="t" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="u" x="31.227" y="0" width="43.12" height="49.357" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="v" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="v" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="w" x="64.804" y="0.855" width="39.66" height="47.732" filterUnits="userSpaceOnUse">
            <feOffset dy="3" in="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="x" />
            <feFlood floodOpacity="0.051" />
            <feComposite operator="in" in2="x" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g transform="translate(9 6)">
          <g transform="translate(32.591 34.885)">
            <g className="m" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M237.141,266.812a2.321,2.321,0,0,1,.9,1.008,3.485,3.485,0,0,1,.32,1.541,4.074,4.074,0,0,1-.357,1.743A2.768,2.768,0,0,1,237,272.287a2.643,2.643,0,0,1-1.485.424,2.376,2.376,0,0,1-1.142-.264,1.936,1.936,0,0,1-.773-.754l-.245,3.131h-1.536l.652-8.214h1.509l-.061.8a1.941,1.941,0,0,1,.786-.693,2.437,2.437,0,0,1,1.105-.252A2.545,2.545,0,0,1,237.141,266.812Zm-.737,4.15a2.476,2.476,0,0,0,.424-1.529,2.007,2.007,0,0,0-.393-1.325,1.379,1.379,0,0,0-1.117-.467,1.359,1.359,0,0,0-1.149.565,2.478,2.478,0,0,0-.424,1.523,2.018,2.018,0,0,0,.387,1.338,1.531,1.531,0,0,0,2.272-.1Z"
                transform="translate(-190.23 -223.02)"
              />
            </g>
            <g className="l" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path className="a" d="M237.7,264.743h1.536l-.689,8.655h-1.535Z" transform="translate(-187.86 -223.81)" />
            </g>
            <g className="k" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M243.968,267.009a2.166,2.166,0,0,1,.577,1.651c0,.163,0,.291-.012.38l-.282,3.573h-1.46l.074-.859a1.782,1.782,0,0,1-.7.712,2.017,2.017,0,0,1-.995.245,2.456,2.456,0,0,1-1.075-.226,1.784,1.784,0,0,1-.737-.628,1.593,1.593,0,0,1-.264-.9,1.64,1.64,0,0,1,.349-1.1,2.088,2.088,0,0,1,1.124-.6,8.958,8.958,0,0,1,2.062-.191h.443l.012-.233a1.173,1.173,0,0,0-.22-.909,1.189,1.189,0,0,0-.909-.294,3.277,3.277,0,0,0-.977.165,4.864,4.864,0,0,0-1.013.462l-.342-1.056a4,4,0,0,1,1.19-.534,5.089,5.089,0,0,1,1.4-.2A2.473,2.473,0,0,1,243.968,267.009Zm-1.43,4.192a1.623,1.623,0,0,0,.448-1.056l.025-.269h-.345a6.654,6.654,0,0,0-1.258.092,1.19,1.19,0,0,0-.632.288.762.762,0,0,0-.183.54.728.728,0,0,0,.264.59,1.065,1.065,0,0,0,.706.221A1.316,1.316,0,0,0,242.538,271.2Z"
                transform="translate(-186.91 -223.02)"
              />
            </g>
            <g className="j" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M245.95,270.846a1.283,1.283,0,0,0-.012.208.911.911,0,0,0,1.043,1.019,2.874,2.874,0,0,0,.552-.049l-.159,1.142a4.518,4.518,0,0,1-.651.049,2.559,2.559,0,0,1-1.731-.516,1.915,1.915,0,0,1-.59-1.523,2.925,2.925,0,0,1,.013-.319l.2-2.579H243.47l.086-1.153h1.153l.135-1.792h1.535l-.135,1.792h1.584l-.1,1.153h-1.584Z"
                transform="translate(-184.91 -223.54)"
              />
            </g>
            <g className="i" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M251.673,267.181a2.885,2.885,0,0,1,.7,2.094,5.507,5.507,0,0,1-.036.613h-4.1a1.786,1.786,0,0,0,.454,1.227,1.622,1.622,0,0,0,1.2.418,2.949,2.949,0,0,0,1.83-.626l.355,1.044a2.811,2.811,0,0,1-1.008.552,3.981,3.981,0,0,1-1.276.208,3.42,3.42,0,0,1-1.609-.361,2.565,2.565,0,0,1-1.061-1.025,3.088,3.088,0,0,1-.374-1.548,3.725,3.725,0,0,1,.386-1.724,2.851,2.851,0,0,1,1.075-1.172,2.948,2.948,0,0,1,1.559-.418A2.535,2.535,0,0,1,251.673,267.181Zm-2.873.743a1.984,1.984,0,0,0-.515,1.142h2.8a1.639,1.639,0,0,0-.326-1.142,1.173,1.173,0,0,0-.926-.38A1.419,1.419,0,0,0,248.8,267.923Z"
                transform="translate(-183.42 -223.02)"
              />
            </g>
            <g className="h" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M253.807,267.41h1.584l-.1,1.153h-1.584l-.38,4.85h-1.535l.38-4.85h-1.142l.086-1.153h1.155l.012-.21a2.445,2.445,0,0,1,.8-1.779,3.517,3.517,0,0,1,2.107-.676l.613-.036.036,1.142-.748.038a1.4,1.4,0,0,0-.914.3,1.3,1.3,0,0,0-.349.89Z"
                transform="translate(-181.46 -223.82)"
              />
            </g>
            <g className="g" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M255.6,272.35a2.527,2.527,0,0,1-1.05-1.032,3.157,3.157,0,0,1-.368-1.552,3.78,3.78,0,0,1,.386-1.756,2.729,2.729,0,0,1,1.094-1.147,3.266,3.266,0,0,1,1.638-.4,3.382,3.382,0,0,1,1.6.361,2.526,2.526,0,0,1,1.05,1.032,3.177,3.177,0,0,1,.368,1.552,3.78,3.78,0,0,1-.387,1.756,2.7,2.7,0,0,1-1.094,1.147,3.267,3.267,0,0,1-1.638.4A3.381,3.381,0,0,1,255.6,272.35Zm2.786-1.424a2.763,2.763,0,0,0,.4-1.565,1.922,1.922,0,0,0-.374-1.283,1.369,1.369,0,0,0-1.1-.437,1.349,1.349,0,0,0-1.191.6,2.741,2.741,0,0,0-.4,1.565q0,1.719,1.485,1.72A1.332,1.332,0,0,0,258.382,270.926Z"
                transform="translate(-180.03 -223.02)"
              />
            </g>
            <g className="f" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M263.439,266.455v1.289l-.97.1a1.844,1.844,0,0,0-1.161.437,1.71,1.71,0,0,0-.424,1.1l-.258,3.241h-1.535l.467-5.992h1.474l-.074.872a2.635,2.635,0,0,1,2.088-1.019Z"
                transform="translate(-177.79 -223.03)"
              />
            </g>
            <g className="e" transform="matrix(1, 0, 0, 1, -41.59, -40.89)">
              <path
                className="a"
                d="M271.29,267a2.31,2.31,0,0,1,.486,1.6c0,.156,0,.278-.013.368l-.282,3.646h-1.533l.281-3.6a1.762,1.762,0,0,0,.013-.246q0-1.092-.946-1.094a1.2,1.2,0,0,0-.962.406,1.988,1.988,0,0,0-.4,1.2l-.271,3.327h-1.535l.3-3.585a1.618,1.618,0,0,0-.179-1.019.852.852,0,0,0-.754-.332q-1.254,0-1.376,1.609l-.258,3.327h-1.535l.467-5.992h1.5l-.061.737a2.163,2.163,0,0,1,1.842-.9,2.074,2.074,0,0,1,1.093.269,1.59,1.59,0,0,1,.649.786,2.3,2.3,0,0,1,.872-.786,2.561,2.561,0,0,1,1.179-.269A1.815,1.815,0,0,1,271.29,267Z"
                transform="translate(-176.31 -223.02)"
              />
            </g>
          </g>
          <g className="d" transform="matrix(1, 0, 0, 1, -9, -6)">
            <path
              className="a"
              d="M233.956,260.037q.042,5.6-3.2,8.735t-8.929,3.139a12.852,12.852,0,0,1-6.216-1.538,11.537,11.537,0,0,1-4.507-4.357,12.519,12.519,0,0,1-1.666-6.494v-6.236a12.836,12.836,0,0,1,1.6-6.451,11.315,11.315,0,0,1,4.4-4.379A12.635,12.635,0,0,1,221.7,240.9q5.681,0,8.907,3.1t3.269,8.735h-7.69a4.866,4.866,0,0,0-1.175-3.374,4.349,4.349,0,0,0-3.311-1.2,4.483,4.483,0,0,0-3.247,1.239,4.652,4.652,0,0,0-1.281,3.5v6.963a4.589,4.589,0,0,0,1.345,3.524,4.664,4.664,0,0,0,3.311,1.261q4.486,0,4.486-4.613Z"
              transform="translate(-200.43 -234.68)"
            />
          </g>
          <g className="c" transform="matrix(1, 0, 0, 1, -9, -6)">
            <path
              className="a"
              d="M234.192,269.181q-3.355-2.927-3.311-8.779h6.963a4.515,4.515,0,0,0,1.453,3.716,6.233,6.233,0,0,0,4.186,1.281,7.129,7.129,0,0,0,3.5-.725,2.389,2.389,0,0,0,1.283-2.222,1.868,1.868,0,0,0-1.3-1.794,12.267,12.267,0,0,0-2.585-.791q-1.282-.234-1.581-.278a34.256,34.256,0,0,1-5.68-1.558,9.9,9.9,0,0,1-4.016-2.8,7.311,7.311,0,0,1-1.624-4.957,8.444,8.444,0,0,1,1.624-5.232,9.772,9.772,0,0,1,4.335-3.227,16.045,16.045,0,0,1,5.918-1.067,14.6,14.6,0,0,1,6.727,1.453,10.465,10.465,0,0,1,4.464,4.4,7.381,7.381,0,0,1,.983,2.711,19.63,19.63,0,0,1,.172,2.542h-6.963a4.288,4.288,0,0,0-1.241-3.4,5.708,5.708,0,0,0-3.844-1.091,6.107,6.107,0,0,0-3.247.727,2.23,2.23,0,0,0-1.153,1.966,2.125,2.125,0,0,0,1.538,2.008,23.219,23.219,0,0,0,3.888,1.153,55.041,55.041,0,0,1,6,1.474,8.4,8.4,0,0,1,3.738,2.5A7.376,7.376,0,0,1,256,262.239a8.434,8.434,0,0,1-1.71,5.3,10.846,10.846,0,0,1-4.507,3.4,15.478,15.478,0,0,1-6.044,1.175Q237.544,272.108,234.192,269.181Z"
              transform="translate(-190.65 -234.75)"
            />
          </g>
          <g className="b" transform="matrix(1, 0, 0, 1, -9, -6)">
            <path
              className="a"
              d="M253.94,241.338H275.6v7.518H261.716v3.76h11.535v7.135H261.716v3.8H275.6v7.518H253.94Z"
              transform="translate(-180.14 -234.48)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Logo
