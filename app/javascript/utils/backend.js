import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const isTouch = 'ontouchstart' in window;
const backend = isTouch ? TouchBackend : HTML5Backend;

export default DragDropContext(backend)