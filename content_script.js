var extensionOption = null;
chrome.storage.sync.get('userOption', function(result) {
	extensionOption = result.userOption
	walk(document.body);
});

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	
	if (node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea')) 
	{
		return;
	}

	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node, extensionOption);
			break;
	}
}

function handleText(textNode, userOption) {
	var v = textNode.nodeValue;
	console.log('userOption: ', userOption);
	
	if (userOption === 'toLatino') {
		v = v.replace(/\bLatinx\b/g, "Latino");
		v = v.replace(/\blatinx\b/g, "latino");
		v = v.replace(/\bLatinxs\b/g, "Latinos");
		v = v.replace(/\blatinxs\b/g, "latinos");
	}

	if (userOption === 'toLatinx') {
		v = v.replace(/\bLatino\b/g, "Latinx");
		v = v.replace(/\blatino\b/g, "latinx");
		v = v.replace(/\bLatinos\b/g, "Latinxs");
		v = v.replace(/\blatinos\b/g, "latinxs");

		v = v.replace(/\bLatina\b/g, "Latinx");
		v = v.replace(/\blatina\b/g, "latinx");
		v = v.replace(/\bLatinas\b/g, "Latinxs");
		v = v.replace(/\blatinas\b/g, "latinxs");
	}
	
	textNode.nodeValue = v;
}


