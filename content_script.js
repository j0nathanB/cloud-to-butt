walk(document.body);

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
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

	v = v.replace(/\bLatinx\b/g, "Latino");
	v = v.replace(/\blatinx\b/g, "latino");
	v = v.replace(/\bLatinxs\b/g, "Latinos");
	v = v.replace(/\blatinxs\b/g, "latinos");
	
	textNode.nodeValue = v;
}


