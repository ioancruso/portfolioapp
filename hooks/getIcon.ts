import { SupabaseIcon } from "@/svgs/supabase";
import {
	FiMessageCircle,
	FiZap,
	FiClock,
	FiHeart,
	FiUsers,
	FiRefreshCw,
	FiArrowRight,
	FiSearch,
	FiUser,
	FiExternalLink,
	FiGithub,
	FiEdit3,
	FiVolume2,
} from "react-icons/fi";

import {
	SiReact,
	SiTypescript,
	SiJavascript,
	SiNextdotjs,
	SiCss3,
	SiSass,
	SiHtml5,
	SiBootstrap,
	SiTailwindcss,
	SiPostgresql,
	SiMysql,
	SiMongodb,
	SiGit,
	SiPostman,
	SiGraphql,
	SiC,
	SiCplusplus,
	SiWordpress,
} from "react-icons/si";

import {
	FaFutbol,
	FaTableTennis,
	FaBook,
	FaGamepad,
	FaLandmark,
} from "react-icons/fa";

import { IconType } from "react-icons/lib";

export const ICON_MAP: Record<string, IconType> = {
	SiReact,
	SiTypescript,
	SiJavascript,
	SiNextdotjs,
	SiCss3,
	SiSass,
	SiHtml5,
	SiBootstrap,
	SiTailwindcss,
	SiPostgresql,
	SiMysql,
	SiMongodb,
	SiGit,
	SiPostman,
	SiGraphql,
	SiC,
	SiCplusplus,
	SiWordpress,
	SupabaseIcon,
	FiMessageCircle,
	FiZap,
	FiClock,
	FiHeart,
	FiUsers,
	FiRefreshCw,
	FiArrowRight,
	FiSearch,
	FiUser,
	FiExternalLink,
	FiGithub,
	FiEdit3,
	FiVolume2,
	FaFutbol,
	FaTableTennis,
	FaBook,
	FaGamepad,
	FaLandmark,
};

export const getIcon = (iconName: string): IconType | null => {
	const icon = ICON_MAP[iconName] || null;
	if (!icon) {
		console.warn(`Icon "${iconName}" not found in ICON_MAP.`);
	}
	return icon;
};
