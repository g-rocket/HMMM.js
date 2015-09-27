'use strict';

var coderegex = /^(\s*)([^#].*)$/;
var labelregex = /^(\s*)([a-zA-Z][a-zA-Z0-9]*):(\s*(?:#.*)?)$/;

function preprocess(codestr) {
	var code = codestr.split('\n');
	var labels = {};
	console.log(code);
	var linenumber = 0;
	for(var i = 0; i < code.length; i++) {
		var labelresult = labelregex.exec(code[i]);
		if(labelresult !== null) {
			code[i] = "".concat(labelresult[1], "# ", labelresult[2], ": ", linenumber.toString(), labelresult[3]);
			labels[labelresult[2]] = linenumber;
		}
		var coderesult = coderegex.exec(code[i]);
		if(coderesult !== null) {
			code[i] = "".concat(linenumber.toString(), " ", coderesult[0]);
			linenumber++;
		}
	}
	console.log(labels);
	console.log(code);
	
	console.log(code);
	return code.join('\n');
}