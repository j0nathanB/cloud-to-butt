chrome.storage.sync.get('userOption', (result) => {
	const option = result.userOption;
	walk(document.body, option);
});


function walk(node, option) {
	// I stole this function from here: http://is.gd/mwZp7E
	let child;
	let next;

	const isInputField = 
		node.tagName && 
		(node.tagName.toLowerCase() == 'input' || 
		node.tagName.toLowerCase() == 'textarea');
	
	if ( isInputField ) {
		return;
	}

	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;

			while ( child ) {
				next = child.nextSibling;
				walk( child, option );
				child = next;
			}

			break;

		case 3: // Text node
			handleText( node, option );
			break;
	}
}

function handleText(textNode, userOption) {
	let v = textNode.nodeValue;
	
	if (userOption === 'latino') {
		v = v.replace(/\bHispanic\b/g, "Latino");
		v = v.replace(/\bhispanic\b/g, "latino");
		v = v.replace(/\bHISPANIC\b/g, "LATINOS");

		v = v.replace(/\bLatinx\b/g, "Latino");
		v = v.replace(/\blatinx\b/g, "latino");
		v = v.replace(/\bLatinxs\b/g, "Latinos");
		v = v.replace(/\blatinxs\b/g, "latinos");
		v = v.replace(/\bLATINXS\b/g, "LATINOS");
	}

	if (userOption === 'latinx') {
		v = v.replace(/\bHispanic\b/g, "Latinx");
		v = v.replace(/\bhispanic\b/g, "latinx");
		v = v.replace(/\bHISPANIC\b/g, "LATINX");

		v = v.replace(/\bLatino\b/g, "Latinx");
		v = v.replace(/\blatino\b/g, "latinx");
		v = v.replace(/\bLatinos\b/g, "Latinxs");
		v = v.replace(/\blatinos\b/g, "latinxs");
		v = v.replace(/\bLATINOS\b/g, "LATINXS");

		v = v.replace(/\bLatina\b/g, "Latinx");
		v = v.replace(/\blatina\b/g, "latinx");
		v = v.replace(/\bLatinas\b/g, "Latinxs");
		v = v.replace(/\blatinas\b/g, "latinxs");
		v = v.replace(/\bLATINAS\b/g, "LATINXS");
	}

	if (userOption === 'none') {
		v = v;
	}
	
	textNode.nodeValue = v;
}


