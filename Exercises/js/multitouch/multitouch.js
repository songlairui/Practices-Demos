function set_handlers(name) {
 // Install event handlers for the given element
 var el=document.getElementById(name);
 el.ontouchstart = start_handler;
 el.ontouchmove = move_handler;
 // Use same handler for touchcancel and touchend
 el.ontouchcancel = end_handler;
 el.ontouchend = end_handler;
}

function init() {
 set_handlers("target1");
 set_handlers("target2");
 set_handlers("target3");
 set_handlers("target4");
}
