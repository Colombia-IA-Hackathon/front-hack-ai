import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa6";

interface RiskSelectorProps {
	value?: number;
	onChange?: (level: number) => void;
	className?: string;
}

const riskLevels = [
	{ id: 1, label: "Bajo", color: "bg-green-500 hover:bg-green-600", textColor: "text-white" },
	{ id: 2, label: "Medio", color: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-white" },
	{ id: 3, label: "Alto", color: "bg-red-500 hover:bg-red-600", textColor: "text-white" },
];

export default function RiskSelector({ value, onChange, className = "" }: RiskSelectorProps) {
	const [selectedLevel, setSelectedLevel] = useState(value || 1);

	useEffect(() => {
		if (value !== undefined && value !== selectedLevel) {
			setSelectedLevel(value);
		}
	}, [value]);

	const isControlled = value !== undefined;

	const handleLevelChange = (level: number) => {
		if (isControlled) return; // Block click if controlled
		setSelectedLevel(level);
		onChange?.(level);
	};

	return (
		<div className={`relative w-full max-w-md mx-auto ${className}`}>
			{/* Risk Level Buttons */}
			<div className='flex rounded-lg overflow-hidden shadow-lg border border-gray-200'>
				{riskLevels.map((risk) => (
					<button
						key={risk.id}
						onClick={() => handleLevelChange(risk.id)}
						className={`
								flex-1 py-3 px-4 font-medium transition-all duration-200
								${risk.color} ${risk.textColor}
								${selectedLevel === risk.id ? "ring-4 ring-blue-500 scale-105 shadow-lg z-10" : "opacity-70"}
								${isControlled ? "cursor-not-allowed opacity-60" : ""}
								focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
								active:scale-95
							`}
						style={selectedLevel === risk.id ? { fontWeight: 700, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" } : {}}
						aria-pressed={selectedLevel === risk.id}
						aria-label={`Seleccionar nivel de riesgo ${risk.label.toLowerCase()}`}
						disabled={isControlled}>
						{risk.label}
					</button>
				))}
			</div>

			{/* Active Indicator */}
			{isControlled && (
				<div className='flex justify-between mt-2 px-2'>
					{riskLevels.map((risk) => (
						<div
							key={risk.id}
							className={`
								flex-1 flex justify-center transition-all duration-300
								${selectedLevel === risk.id ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"}
							`}>
							<FaChevronUp className='w-6 h-6 text-gray-600 animate-bounce' aria-hidden='true' />
						</div>
					))}
				</div>
			)}

			{/* Selected Level Info */}
			<div className='mt-4 text-center'>
				<p className='text-sm text-gray-600'>
					Nivel de riesgo:
					<span
						className={`ml-1 font-semibold ${
							selectedLevel === 1 ? "text-green-600" : selectedLevel === 2 ? "text-yellow-600" : "text-red-600"
						}`}>
						{riskLevels.find((r) => r.id === selectedLevel)?.label}
					</span>
				</p>
			</div>
		</div>
	);
}
