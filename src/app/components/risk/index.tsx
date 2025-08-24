"use client";

import { useState } from "react";

interface RiskSelectorProps {
	value?: number;
	onChange?: (level: number) => void;
	className?: string;
}

const riskLevels = [
	{ id: 3, label: "Alto", color: "bg-red-500", fillColor: "bg-red-400" },
	{ id: 2, label: "Medio", color: "bg-yellow-500", fillColor: "bg-yellow-400" },
	{ id: 1, label: "Bajo", color: "bg-green-500", fillColor: "bg-green-400" },
];

export default function RiskSelector({ value, onChange, className = "" }: RiskSelectorProps) {
	const [selectedLevel, setSelectedLevel] = useState(value || 1);

	return (
		<div className={`flex items-center justify-center gap-8 ${className}`}>
			<div className='relative'>
				<div className='w-8 h-48 bg-gray-200 rounded-full relative overflow-hidden shadow-inner'>
					<div
						className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out rounded-full ${
							selectedLevel === 1 ? "h-1/3 bg-green-400" : selectedLevel === 2 ? "h-2/3 bg-yellow-400" : "h-full bg-red-400"
						}`}
					/>
					<div className='absolute inset-0 flex flex-col justify-between py-2'>
						<div className='w-full h-px bg-white/30' />
						<div className='w-full h-px bg-white/30' />
						<div className='w-full h-px bg-white/30' />
					</div>
				</div>
				<div
					className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full shadow-lg transition-colors duration-500 ${
						selectedLevel === 1 ? "bg-green-500" : selectedLevel === 2 ? "bg-yellow-500" : "bg-red-500"
					}`}>
					<div className='absolute inset-2 bg-white/20 rounded-full' />
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				{riskLevels.map((risk) => (
					<button
						key={risk.id}
						disabled
						className={`
			  px-6 py-3 rounded-lg font-medium transition-all duration-200 min-w-[100px]
			  ${selectedLevel === risk.id ? `${risk.color} text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-gray-300` : "bg-gray-100 text-gray-700"}
			  opacity-70 cursor-not-allowed
			`}
						aria-pressed={selectedLevel === risk.id}
						aria-label={`Seleccionar nivel de riesgo ${risk.label.toLowerCase()}`}>
						{risk.label}
					</button>
				))}
			</div>
		</div>
	);
}
