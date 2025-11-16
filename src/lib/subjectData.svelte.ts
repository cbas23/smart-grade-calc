type Mode = 'start' | 'loading' | 'ready';

export interface Section {
	id: string;
	title: string;
	weight: number; // decimal weight 0 -> 1
	maxPoints: number;
	points: number;
}

export type GradeScale = [number, string][]; // Array of [weight, letter grade] pairs

export class SubjectData {
	tabName: string = $state('new Tab');
	mode: Mode = $state('start');
	sections: Section[] = $state([]);
	finalGoal: number = $state(0);
	gradeScale: GradeScale = $state([]);
}
