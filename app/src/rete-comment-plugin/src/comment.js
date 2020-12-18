import Draggable from './draggable';

export default class Comment {
    constructor(text, editor, data) {
        this.editor = editor;
        this.text = text;
        this.scale = 1;
        this.x = 0;
        this.y = 0;
        this.dragPosition = [0, 0];
        this.links = [];
        this.data = {
            backgroundColor: {
                r: 194,
                g: 97,
                b: 19,
                a: 0.6
            },
            color: "#ffffff"
        }
        if(data){
            this.data = {...data}
        }
        this.initView();
        this.setStyles();
        this.update();
    }

    initView() {
        this.el = document.createElement('div');
        this.el.tabIndex = 1;
        this.el.addEventListener('contextmenu', this.onContextMenu.bind(this));
        this.el.style.fontWeight = "bolder";
        this.el.addEventListener('focus', this.onFocus.bind(this));
        this.el.addEventListener('blur', this.onBlur.bind(this));
        new Draggable(this.el, () => this.onStart(), (dx, dy) => this.onTranslate(dx, dy));
        this.setStyles();
    }

    setText(text){
        this.text = text;
    }

    setStyles = () => {
        let {r, g, b, a} = this.data.backgroundColor;
        this.el.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        this.el.style.color = this.data.color;
        this.update()
    }

    linkTo(ids) {
        this.links = ids || [];
    }

    linkedTo(node) {
        return this.links.includes(node.id);
    }

    k() {
        return 1;
    }

    onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        this.editor.trigger('editcomment', this);
    }

    onFocus() {
        this.scale = Math.max(1, 1 / this.k());
        this.update();
        this.editor.trigger('commentselected', this)
    }

    focused() {
        return document.activeElement === this.el;
    }

    onBlur() {
        this.scale = 1;
        this.update()
    }

    blur() {
        this.el.blur();
    }

    onStart() {
        this.dragPosition = [this.x, this.y];
    }

    onTranslate (dx, dy) {
        const [x, y] = this.dragPosition;

        this.x = x + this.scale * dx;
        this.y = y + this.scale * dy;
        
        this.update();
    }

    update() {
        this.el.innerText = this.text;
        this.el.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }

    toJSON() {
        return {
            text: this.text,
            position: [ this.x, this.y ],
            links: this.links,
            data: this.data
        }
    }
}