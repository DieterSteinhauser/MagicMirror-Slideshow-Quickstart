/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial", // "metric",

	modules: [

		{
			module: "clock",
			position: "bottom_left"
		},
		{
			module: "calendar",
			header: "Upcoming IMG Events",
			position: "bottom_center",
			config: {
				maximumEntries: 6,
				//showLocation: true,
				maxTitleLength: 50,
				// fontawesome icons https://fontawesome.com/search
				customEvents: [{keyword: 'Florida Gators', symbol: 'basketball', color: 'Green', transform: { search: 'Florida Gators' , replace: ''}}],
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						// symbol: "calendar-check",
						// url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics" // US Holidays
						//url: "https://www.img.ufl.edu/calendar/ical/img-calendar.ics"  // IMG Calendar
						url: "webcal://calendar.ufl.edu/live/ical/events/exclude_group/Admin/exclude_tag/closed%20event/category/Athletics/header/Athletics%20Events" // UF Athletics
					}
				]
			}
		},

		{
			module: "weather",
			position: "bottom_right",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				lat: 29.643389,
				lon: -82.347583
			}
		},
		{
		module: 'MMM-BackgroundSlideshow',
		position: 'fullscreen_below', // Keeps it behind all other modules
		config: {
			imagePaths: ['/home/pi/MirrorPhotos/'], // Use the full path to your folder
			transitionImages: true,
			slideshowSpeed: 30000, // Change image every 30 seconds
			randomizeImageOrder: true,
			backgroundSize: 'cover', // Or 'contain' if you don't want cropping
		}
		},
		// {
		// 	module: 'MMM-BackgroundSlideshow',
		// 	position: 'fullscreen_below',
		// 	config: {
		// 		imagePaths: ['`modules/MMM-BackgroundSlideshow/exampleImages/`'],
		// 		transitionImages: true,
		// 		randomizeImageOrder: true
		// 		}
		// },
		// {
		// 	module: "alert",
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		// {
		// 	module: "compliments",
		// 	position: "bottom_bar"
		// },
		// {
		// 	module: "weather",
		// 	position: "top_right",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		weatherProvider: "openmeteo",
		// 		type: "forecast",
		// 		lat: 40.776676,
		// 		lon: -73.971321
		// 	}
		// },
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
		// },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
