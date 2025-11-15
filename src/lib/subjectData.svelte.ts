type Mode = 'start' | 'loading' | 'ready';

export class SubjectData {
	tabName = $state('new Tab');
	mode: Mode = $state('start');
}
