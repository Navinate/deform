import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("test-element")
export class TestElement extends LitElement {
  static override styles = css`
    div {
      background-color: blue;
      width: fit-content;
    }
  `;

  @property({ type: String })
  label: string = "Click me";

  override render() {
    return html`<div>${this.label}</div>`;
  }
}
