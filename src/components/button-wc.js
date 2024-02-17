class ButtonWC extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({ mode: 'open' });
	}
	static get styles() {
		return /* css */ `
			:host{
				display:block;
				width:100%;
				margin: 0.5em 0;
			}
			a{
				font-size:1em;
				display:block;
				width:100%;
				height: 3.5em;
				background-color: var(--white-color);
				box-shadow: 0.5em 0.5em 0 var(--black-color);
				border-radius: 1.75em;
				border: 0.1em solid var(--black-color);
				text-align: center;
				line-height: 3.5em;
				color: var(--black-color);
				text-decoration: none;
				transition: all 0.2s ease-in;
			}
			a:hover{
				transform:translateX(0.3em) translateY(0.3em);
				box-shadow: 0.2em 0.2em 0 var(--black-color);

			}
		`;
	}
	connectedCallback(){
		this.text = this.getAttribute('data-text');
		this.link = this.getAttribute('data-link');
		this.icon = this.getAttribute('data-icon');
		this.render();
	}
	render() {
		this.shadowRoot.innerHTML = /* html */`
			<style>${ButtonWC.styles}</style>
			<a href="${this.link}" target="_blank" title="${this.text}">${this.text}</a>
		`;
	}
}
customElements.define('button-wc', ButtonWC);