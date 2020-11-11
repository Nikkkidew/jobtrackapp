export interface Job {
	id: number;
	title: string;
	salary: number;
	rating: number;
	location: string;
	description: string;
	companyName: string;
	companySize: number;
	industry: string;
	status: string;
}

export interface User {
	_id: string;
	email: string;
	jobs: Job[];
}
