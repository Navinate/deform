import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("test-element")
export class TestElement extends LitElement {
  static override styles = css`
    button {
      background: var(--primary, #6200ee);
      color: white;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }
  `;

  @property({ type: String })
  label: string = "Click me";

  override render() {
    return html`<div>${this.label}</div>`;
  }
}
