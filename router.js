function route(handle, pathname) {
	console.log("About to route a request for " + pathname);

	// check for existence of handler for given pathname
	if (typeof handle[pathname] === 'function') {
		handle[pathname]();
	} else {
		console.log("No request handler found for " + pathname);
	}
}

exports.route = route;