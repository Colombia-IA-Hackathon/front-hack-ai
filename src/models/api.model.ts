export interface APIError {
	message: string;
	status: number;
	statusText: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details: any;
	url: string;
	method: string;
	timestamp: string;
}

export interface ContractError {
	message: string;
	name?: string;
	reason?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	stack?: string;
	timestamp: string;
	method?: string;
}

export interface ServiceResult<T> {
	success: boolean;
	data?: T;
	error?: APIError | ContractError;
}
