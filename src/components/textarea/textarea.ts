import { LitElement, html, css } from 'lit';
import { customElement, property } from "lit/decorators.js";
import "../../styles/global.css";

@customElement("deform-textarea")
export class DeformTextarea extends LitElement {
  static override properties = {
    minScale: { type: Number, attribute: 'min-scale' },
    maxScale: { type: Number, attribute: 'max-scale' },
  };
  minScale = 1;
  maxScale = 5;
  maxChar = 280;
//   @property({ type: Number })
//   minScale: number = 1;

//   @property({ type: Number })
//   maxScale: number = 1.15;
  static override styles = css`
    :host {
      display: inline-block;
      color: white;
      font-family: sans-serif;
      
    }
    .wrapper {
        width: 92vw;
        height: 92vh;
        background-color: var(--color-background);
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        display: grid;
        place-items: center;
        padding: 2rem;
        font-size: 1rem;
        margin: -1rem;
    }

    .container {
      transform-origin: center;
      transition: transform 200ms ease;
      will-change: transform;
      --scale: 1;
    }

    .container:has(textarea:focus) {
        transform: scale(var(--scale));
        backdrop-filter: blur(1px) brightness(80%);
    }

    textarea {
        display: block;
      width: 100%;
      height: 100%;
      font: inherit;
      color: inherit;
      border-radius: 2px;
      background-color: hsl(0 100% 100% / 0.2);
      border-color: hsl(0 100% 100% / 0.6);
    }
    textarea:focus {
        outline: 1px solid var(--color-primary);
        outline-offset: 4px;
    }
    p{
        text-align: center;
    }
  `;

  override firstUpdated() {
    const textarea = this.shadowRoot!.querySelector('textarea')!;
    this.updateScale(textarea);
  }

  private updateScale(textarea: HTMLTextAreaElement) {
    const max =
      textarea.maxLength > 0
        ? textarea.maxLength
        : textarea.value.length || 1;

    const scale = this.minScale + ((textarea.value.length) * (this.maxScale - this.minScale)) / (this.maxChar)
    this.shadowRoot!
      .querySelector('.container')!
      .style.setProperty('--scale', scale.toString());
  }

  private onInput(e: Event) {
    this.updateScale(e.target as HTMLTextAreaElement);
  }

  override render() {
    return html`
      <div class="wrapper">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      <div class="container">
        <textarea
          @input=${this.onInput}
        ></textarea>
      </div>
      <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    `;
  }
}


