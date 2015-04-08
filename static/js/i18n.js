/**
 * Author: Janek Milota
 * Date: 12.01.2015
 */
(function($) {

	var locale = {
		cs: 'cs',
		en: 'en'
	};

	var currentLocale = '';

	var keys = {
		MENU_PLAY: {
			cs: 'Hrát',
			en: 'Play'
		},
		MENU_OPTIONS: {
			cs: 'Nastavení',
			en: 'Options'
		},
		MENU_LEADER_BOARDS: {
			cs: 'Žebříčky',
			en: 'Leaderboards'
		},
		OPTIONS_MODE: {
			cs: 'Mód',
			en: 'Mode'
		},
		OPTIONS_GAME_LANGUAGE: {
			cs: 'Jazyk',
			en: 'Language'
		},
		OPTIONS_MODE_TIMED: {
			cs: 'Na čas',
			en: 'Timed'
		},
		OPTIONS_MODE_STATIC: {
			cs: 'Statický',
			en: 'Static'
		},
		OPTIONS_LANGUAGE_CS_EN: {
			cs: 'Čeština -> Angličtina',
			en: 'Czech -> English'
		},
		OPTIONS_LANGUAGE_EN_CS: {
			cs: 'Angličtina -> Čeština',
			en: 'English -> Czech'
		},
		GAME_BUTTON_RECORD: {
			cs: 'Nahrát',
			en: 'Record'
		},
		GAME_BUTTON_EXIT: {
			cs: 'Konec',
			en: 'Exit'
		}
	};

	for(var keyName in keys) {
		var key = keys[keyName];
		key.getText = $.proxy(function(loc) {
			return this[loc || currentLocale];
		}, key);
	}

	var initComponent = function() {
		setLocale($.app.readCookie('locale') || locale.en);
	};

	var getText = function(key, locale) {
		return key ? (keys[key] || {})[locale || currentLocale] : undefined;
	};

	var getLocale = function() {
		return currentLocale;
	};

	var localeCache = {};

	var setLocale = function(loc) {

		if(!loc || typeof(loc) != 'string' || !locale[loc]) {
			throw 'A valid locale has to be provided!';
		}

		$.app.createCookie('locale', loc, 7);
		currentLocale = loc;

		var localeVal = localeCache[loc];
		if(!localeVal) {
			localeVal = {};
			for(var keyName in keys) {
				localeVal[keyName] = keys[keyName].getText(loc);
			}
			localeCache[loc] = localeVal;
		}

		me.t = localeVal
	};

	var me = {
		initComponent: initComponent,
		reset: function() {
		},
		getCurrentLocale: getLocale,
		setCurrentLocale: setLocale,
		locale: locale,
		keys: keys,
		t: {},
		getText: getText
	};

	$.app.i18n = $.app.registerComponent(me);

})(jQuery);