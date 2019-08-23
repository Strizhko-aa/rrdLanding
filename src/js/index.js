'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import common controller */
import Common from './components/Common';

/** Import popup controller */
import Popup from './components/Popup';

/** Import form controller */
import Form from './components/Form';

/** Import page controllers */
import Home from './pages/Home';

/** Import rrd controller */
// import Rrd from './components/Rrd'

import {
	currentPage
} from './modules/dev/_helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
	/** Home page */
	case 'home':
		new Home;
		break;

		/** No page found */
	default:
		console.warn('Undefined page');
}