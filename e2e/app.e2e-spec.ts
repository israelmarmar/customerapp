import { AppPage } from './app.po';
import { AlertService} from '../_services/index';

describe('my-app App', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();

		TestBed.configureTestingModule({
			declarations: [
			AlertComponent
			],
			schemas: [NO_ERRORS_SCHEMA]}).compileComponents();
	});

	it('should display welcome message', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('Login');
	});
});
