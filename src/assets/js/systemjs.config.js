/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	System.config({
		paths : {
			// paths serve as alias
			'npm:' : 'node_modules/'
		},
		// map tells the System loader where to look for things
		map : {
			// our app is within the app folder
			app : 'dist',
			// angular bundles
			'@angular/core' : 'npm:@angular/core/bundles/core.umd.js',
			'@angular/common' : 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler' : 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/platform-browser' : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic' : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/router' : 'npm:@angular/router/bundles/router.umd.js',
			'@angular/forms' : 'npm:@angular/forms/bundles/forms.umd.js',
			'@ng-bootstrap/ng-bootstrap' : 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
			// other libraries
			'rxjs' : 'npm:rxjs',
			'angular2-cookie' : 'npm:angular2-cookie',
			'ng2-cookies' : 'npm:ng2-cookies',
			'angular2-in-memory-web-api' : 'npm:angular2-in-memory-web-api',
			'angular2-infinite-scroll' : 'npm:angular2-infinite-scroll',
			'angular-calendar' : 'npm:angular-calendar/dist/umd/angular-calendar.js',
			'calendar-utils' : 'npm:calendar-utils/dist/umd/calendarUtils.js',
			'angular-resizable-element' : 'npm:angular-resizable-element/dist/umd/angular-resizable-element.js',
			'angular-draggable-droppable' : 'npm:angular-draggable-droppable/dist/umd/angular-draggable-droppable.js',
			'date-fns' : 'npm:date-fns',
			'moment': 'npm:moment',
			'ng2-tag-input':'npm:ng2-tag-input',
			'ng2-charts':'npm:ng2-charts'
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages : {
			app : {
				main : './app/main.js',
				defaultExtension : 'js'
			},
			rxjs : {
				main : './Rx.js',
				defaultExtension : 'js'
			},
			'angular2-in-memory-web-api' : {
				main : './index.js',
				defaultExtension : 'js'
			},
			'angular2-cookie' : {
				main : './core.js',
				defaultExtension : 'js'
			},
			'ng2-cookies' : {
				main : './ng2-cookies.js',
				defaultExtension : 'js'
			},
			'angular2-infinite-scroll' : {
				main : './angular2-infinite-scroll.js',
				defaultExtension : 'js'
			},
			'date-fns' : {
				main : './index.js',
				defaultExtension : 'js'
			},
			'ng2-tag-input' : {
				main : 'dist/ng2-tag-input.bundle.js',
				format : 'cjs',
			},
			'ng2-material-dropdown' : {
				defaultExtension : 'js',
				main : 'dist/ng2-dropdown.bundle.js',
				format : 'cjs',
			},
			moment: { main: './moment.js', defaultExtension: 'js' },
			'ng2-tag-input/modules/components/tag-input.template.html' : {
				defaultJSExtension : false
			},
			'ng2-charts' : {
				main : './ng2-charts.js',
				defaultExtension : 'js'
			},
		}
	});
})(this);
