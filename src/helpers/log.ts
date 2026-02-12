import debug from "debug";

const _log = debug("file-router");
export const log = (message: string | (() => string)) => {
	if (_log.enabled) {
		if (typeof message === "function") {
			_log(message());
		} else {
			_log(message);
		}
	}
};
