import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("root-element")
export class RootElement extends LitElement {
  constructor() {
    super();
    this.addEventListener("click", (event) => {
      let element = event.composedPath()[0];
      if (element instanceof HTMLAnchorElement) {
        event.preventDefault();
        event.stopPropagation();
        window.history.pushState(null, "", element.href);
        this.pathname = document.location.pathname;
      }
    });
    window.addEventListener("popstate", () => {
      this.pathname = document.location.pathname;
    });
  }

  @property()
  pathname = document.location.pathname;

  render() {
    return html`<div>
        ${this.pathname !== "/"
          ? html`<a href="/">Home</a>`
          : html`<span>Home</span>`}
        ${this.pathname !== "/about"
          ? html`<a href="/about">About</a>`
          : html`<span>About</span>`}
        ${this.pathname !== "/contact"
          ? html`<a href="/contact">Contact</a>`
          : html`<span>Contact</span>`}
      </div>
      <slot name=${this.pathname}></slot> `;
  }
}
