import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/global.css";

@customElement("deform-textarea")
export class DeformTextArea extends LitElement {
    static override styles = css`
    div {
      background-color: blue;
      width: fit-content;
    }
  `;

  @property({ type: String })
  label: string = "Click me";

  override render() {
    return html`
        <div>
            <textarea placeholder=${this.label}>
                 Hello World!
            </textarea>
        </div>
    `;
  }
    // @property({ type: String })
    // placeHolder: string = "Click me";
    
    // static override styles = css`
    //     div {
    //         position: relative;
    //     }
    //     textarea {
    //         transition: all 200ms linear;
    //     }
    //     textarea:focus {
    //         transform: scale(2);
    //         opacity: 0.8;
    //     }
    // `;

    // override render() {
    //     // Set CSS variable dynamically for ::before if you want to use pseudo-element
    //     return html`
    //         <div>
    //           <textarea placeholder=${this.placeHolder}>
    //             Hello World!
    //           </textarea>
    //         </div>
    //     `;
    // }
}
