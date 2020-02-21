const { createServer } = require('http');
const { requestListener: frameListener } = require('./iframePage');
const { requestListener: executionContextListener } = require('./executionContext');

const port = +process.env.PORT || 9999;

const requestListener = (req, res) => {
	const url = req.url.toLowerCase();
	if (url.startsWith('/frame'))
		return frameListener(req, res);
	if (url.startsWith('/executioncontext'))
		return executionContextListener(req, res);

	res.statusCode = 404;
	res.write('Not found');
	return res.end();
};

createServer(requestListener)
	.listen(port, null, () => console.log(`Server listening on port: ${port}`));
