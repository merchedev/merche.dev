class HeaderSeparator extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({ mode: 'open' });
	}
	static get styles() {
		return /* css */ `
			h3{
				text-align:center;
				font-weight:600;
				font-size:1em;
				margin-top: 2em;
				margin-bottom:1em;
				letter-spacing: 0.05em;
			}
		`;
	}
	connectedCallback(){
		this.title = this.getAttribute('data-text');
		this.render();
	}
	render() {
		this.shadowRoot.innerHTML = /* html */`
			<style>${HeaderSeparator.styles}</style>
			<h3>${this.title}</h3>
		`;
	}
}
customElements.define('header-separator', HeaderSeparator);