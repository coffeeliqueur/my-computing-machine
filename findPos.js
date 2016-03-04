//===========================================================
// Find an object position
//===========================================================
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

//===========================================================
// Hide an element. Especially popup element
//===========================================================
function hide_popup(named) {
          //get the named <strong class="highlight">menu</strong>
          var popup_element = document.getElementById(named);
         //hide it with a style attribute
          popup_element.style.display = "none";
}
