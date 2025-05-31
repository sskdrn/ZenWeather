import SunIcon from '@svg/SunIcon.svg';
import MoonIcon from '@svg/MoonIcon.svg';
import SunWithCloudsIcon from '@svg/SunWithCloudIcon.svg';
import MoonWithCloudsIcon from '@svg/MoonWithCloudsIcon.svg';
import WindIcon from '@svg/WindIcon.svg';
import CloudIcon from '@svg/CloudIcon.svg';
import DrizzleIcon from '@svg/DrizzleIcon.svg';
import RainIcon from '@svg/RainIcon.svg';
import ThunderstormIcon from '@svg/ThunderstormIcon.svg';
import FogIcon from '@svg/FogIcon.svg';
import MistIcon from '@svg/MistIcon.svg';
import SnowIcon from '@svg/SnowIcon.svg';
import HailIcon from '@svg/HailIcon.svg';
import ExtremeHeatIcon from '@svg/ExtremeHeatIcon.svg';

import { WeatherType } from './colors';
import { SvgProps } from 'react-native-svg';

export const WeatherIcons: Record<WeatherType, React.FC<SvgProps>> = {
    clearDay: SunIcon,
    clearNight: MoonIcon,
    partlyCloudyDay: SunWithCloudsIcon,
    partlyCloudyNight: MoonWithCloudsIcon,
    windy: WindIcon,
    overcast: CloudIcon,
    drizzle: DrizzleIcon,
    rain: RainIcon,
    thunderstorms: ThunderstormIcon,
    fog: FogIcon,
    mist: MistIcon,
    snow: SnowIcon,
    hail: HailIcon,
    extremeHeat: ExtremeHeatIcon,
};
