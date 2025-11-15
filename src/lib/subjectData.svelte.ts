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

	// Demo constructor
	// constructor() {
	// 	this.tabName = 'Demo Tab';
	// 	this.mode = 'ready';
	// 	this.sections = [
	// 		{
	// 			id: 'section1',
	// 			title: 'Section 1',
	// 			weight: 0.5,
	// 			maxPoints: 100,
	// 			points: 0
	// 		},
	// 		{
	// 			id: 'section2',
	// 			title: 'Section 2',
	// 			weight: 0.5,
	// 			maxPoints: 100,
	// 			points: 0
	// 		}
	// 	];
	// 	this.finalGoal = 100;
	// 	this.gradeScale = [
	// 		[0.9, 'A'],
	// 		[0.8, 'B'],
	// 		[0.7, 'C'],
	// 		[0.6, 'D'],
	// 		[0, 'F']
	// 	];
	// }
}
