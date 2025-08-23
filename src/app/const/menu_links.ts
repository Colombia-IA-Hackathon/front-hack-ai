import { AiFillHome } from "react-icons/ai";
import { FaMap, FaToolbox, FaUsers } from "react-icons/fa6";

export const MENU_LINKS = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: AiFillHome,
	},
	{
		label: "Map",
		href: "/dashboard/map",
		icon: FaMap,
	},
	{
		label: "Clientes",
		href: "/clients",
		icon: FaUsers,
	},
	{
		label: "Configuración",
		href: "/settings",
		icon: FaToolbox,
	},
];
