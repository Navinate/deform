import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("light-range-slider")
export class LightRangeSlider extends LitElement {
  @state()
  private active = false;

  @state()
  private value = 0;

  private video?: HTMLVideoElement;
  private stream?: MediaStream;
  private canvas = document.createElement("canvas");
  private ctx = this.canvas.getContext("2d");
  private rafId?: number;

  static override styles = css`
    button {
      border: none;
      color: white;
      border-radius: 100vmin;
      padding: 0.5em 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 150ms ease-in-out;
      gap: 1em;
    }
    button[data-active="false"] {
      background-color: hsl(200 100% 20%);
      box-shadow: inset 2px 5px 15px hsl(200 50% 10% / 0.5);
    }
    button[data-active="true"] {
      background-color: hsl(200 100% 60%);
      box-shadow: inset -2px -5px 15px hsl(200 50% 10% / 0.5);
    }

    /* Base slider reset */
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      background: transparent;
      cursor: pointer;
      pointer-events: none;
    }

    /* ---------- TRACK ---------- */

    /* WebKit (Chrome, Safari, Edge) */
    input[type="range"]::-webkit-slider-runnable-track {
      height: 0.75em;
      border-radius: 100vmin;

      background: hsl(0 100% 100% / 0.25);
      backdrop-filter: blur(10px) saturate(150%);

      border: 1px solid hsl(0 100% 100% / 0.4);
    }

    /* Firefox */
    input[type="range"]::-moz-range-track {
      height: 0.75em;
      border-radius: 100vmin;

      background: hsl(0 100% 100% / 0.25);
      backdrop-filter: blur(10px) saturate(150%);

      border: 1px solid hsl(0 100% 100% / 0.4);
    }

    /* ---------- THUMB ---------- */

    /* WebKit */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;

      width: 1.25em;
      height: 1.25em;
      transform: translateY(-25%);
      border-radius: 100vmin;
      background: hsl(0 100% 100% / 0.9);
      backdrop-filter: blur(12px) saturate(180%);

      border: 1px solid hsl(0 100% 100% / 0.6);
      box-shadow: inset 0 1px 2px hsl(0 100% 100% / 0.6);
    }

    /* Firefox */
    input[type="range"]::-moz-range-thumb {
      width: 22px;
      height: 22px;

      border-radius: 50%;
      background: rgba(255, 255, 255, 0.45);
      backdrop-filter: blur(12px) saturate(180%);

      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.8),
        0 6px 16px rgba(0, 0, 0, 0.25);
    }

    /* ---------- DISABLED STATE ---------- */

    button[data-active="false"] input[type="range"] {
      opacity: 0.3;
    }
    span {
        font-size: 1.5em;
        user-select: none;
    }
  `;

  override render() {
    return html`
      <button @click=${this.toggleActive} data-active=${this.active}>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(this.value)}
          disabled
        />
        <!-- <span>${this.value}</span> -->
      </button>
    `;
  }

  private async toggleActive() {
    this.active = !this.active;

    if (this.active) {
      await this.startCamera();
      this.readBrightnessLoop();
    } else {
      this.stopCamera();
    }
  }

  private async startCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    this.video = document.createElement("video");
    this.video.srcObject = this.stream;
    this.video.playsInline = true;
    await this.video.play();
  }

  private stopCamera() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }

    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    this.video = undefined;
  }

  private readBrightnessLoop = () => {
    if (!this.video || !this.ctx) return;

    const width = this.video.videoWidth;
    const height = this.video.videoHeight;

    if (width === 0 || height === 0) {
      this.rafId = requestAnimationFrame(this.readBrightnessLoop);
      return;
    }

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.drawImage(this.video, 0, 0, width, height);
    const imageData = this.ctx.getImageData(0, 0, width, height).data;

    let total = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      total += (r + g + b) / 3;
    }

    const avgBrightness = total / (imageData.length / 4);
    this.value = Math.round((avgBrightness / 255) * 100);

    this.rafId = requestAnimationFrame(this.readBrightnessLoop);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "light-range-slider": LightRangeSlider;
  }
}
