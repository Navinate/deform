import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

type Side = 'left' | 'right';

@customElement('color-toggle')
export class colorToggle extends LitElement {
  @state()
  private activeSide: Side = 'left';

  @state()
  private leftHue = 120;
  @state()
  private rightHue = 0;

  private readonly hueAdvance = 80;
  private readonly animationDuration = 500;

  private easeInOut(t: number): number {
    return t * t * (3 - 2 * t);
  }

  private animateHue(
    from: number,
    to: number,
    setter: (v: number) => void
  ) {
    const start = performance.now();

    const frame = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / this.animationDuration, 1);
      const eased = this.easeInOut(t);

      setter(from + (to - from) * eased);

      if (t < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  private toggle() {
    if (this.activeSide === 'left') {
      this.activeSide = 'right';
      this.animateHue(this.leftHue, this.leftHue + this.hueAdvance, v => {
        this.leftHue = v;
      });
    } else {
      this.activeSide = 'left';
      this.animateHue(this.rightHue, this.rightHue + this.hueAdvance, v => {
        this.rightHue = v;
      });
    }
  }

  private get activeHue(): number {
    return this.activeSide === 'left' ? this.leftHue : this.rightHue;
  }

  override render() {
    return html`
      <div
        class="container"
        style="
          --bg: oklch(0.92 0.08 ${this.activeHue});
          --fg: oklch(0.25 0.04 ${this.activeHue});
          --left-h: ${this.leftHue};
          --right-h: ${this.rightHue};
        "
      >
        <button
          class="switch"
          @click=${this.toggle}
          aria-pressed=${this.activeSide === 'right'}
        >
          <span class="track"></span>
          <span class="thumb"></span>
        </button>

        <div class="content">
          <p>This toggle does not preserve state.</p>
          <p>It preserves only motion.</p>
          <p>Hue advances perceptually.</p>
        </div>
      </div>
    `;
  }
  static override styles = css`
  :host {
    display: block;
    font-family: system-ui, sans-serif;
  }

  .container {
    background: var(--bg);
    color: var(--fg);
    padding: 1.5rem;
    transition: background 300ms linear, color 300ms linear;
  }

  /* --- Switch --- */

  .switch {
    position: relative;
    width: 42px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    margin-bottom: 1.5rem;
  }

  .track {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: oklch(
      0.82
      0.08
      calc((var(--left-h) + var(--right-h)) / 2)
    );
    transition: background 300ms linear;
  }

  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: oklch(0.95 0.02 0);
    transform: translateX(0);
    transition: transform 200ms ease;
  }

  .switch[aria-pressed='true'] .thumb {
    transform: translateX(18px);
  }

  /* --- Content --- */

  .content p {
    max-width: 60ch;
    line-height: 1.4;
  }
`;
  
}
