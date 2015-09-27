'use strict';

var coderegex = /^(\s*)([0-9]+\s+)?([^#].*)$/;
var labelregex = /^(\s*)([a-zA-Z][a-zA-Z0-9]*):(\s*(?:#.*)?)$/;

function preprocess(codestr) {
	var code = codestr.split('\n');
	var labels = {};
	console.log(code);
	var linenumber = 0;
	for(var i = 0; i < code.length; i++) {
		var labelresult = labelregex.exec(code[i]);
		if(labelresult !== null) {
			code[i] = "".concat(labelresult[1], "# label ", labelresult[2], ": line ", linenumber.toString(), labelresult[3]);
			labels[labelresult[2]] = linenumber;
		}
		var coderesult = coderegex.exec(code[i]);
		if(coderesult !== null) {
			code[i] = "".concat(linenumber.toString(), " ", coderesult[1], coderesult[3]);
			linenumber++;
		}
	}
	console.log(code);
	console.log(labels);
	codestr = code.join('\n');
	for(var label in labels) {
		codestr = codestr.replace(new RegExp('@'.concat(label), 'g'), labels[label].toString());
	}
	codestr = codestr.replace(new RegExp('%stack', 'g'), linenumber.toString());
	console.log(codestr);
	return codestr;
}