import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

type Message = {
    text: string;
    type: "incoming" | "outgoing";
};

@customElement("deform-dialog")
export class DeformDialog extends LitElement {
    static override styles = css`
        :host {
            position: fixed;
            bottom: 2rem;
            right: 21rem;
            z-index: 1000;
            font-family: system-ui, sans-serif;
        }

        dialog {
            position: absolute;
            bottom: 0;
            right: 0;
            border: none;
            border-radius: 12px;
            padding: 0;
            width: 320px;
            filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.25));
            background: transparent;
        }

        .messages {
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-height: 240px;
            overflow-y: auto;
        }

        .bubble {
            max-width: 80%;
            padding: 8px 10px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.3;
        }

        .incoming {
            background: #e5e7eb;
            align-self: flex-start;
        }

        .outgoing {
            background: #4f46e5;
            color: white;
            align-self: flex-end;
        }

        .hint {
            font-size: 12px;
            color: #6b7280;
            padding-left: 12px;
        }

        .input-row {
            display: flex;
            gap: 8px;
            padding: 10px;
        }

        input {
            flex: 1;
            padding: 8px;
            font-size: 14px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
        }

        input:focus {
            outline: none;
            border-color: #4f46e5;
        }
    `;

    @state() private messages: Message[] = [];
    @state() private value = "";

    private isOpen = false;
    private resolver?: (value: boolean) => void;

    constructor() {
        super();
        this.reset();
    }

    private reset() {
        this.messages = [
            {
                text: "Has Trey already begun running out of ideas for this project?",
                type: "incoming",
            },
        ];
        this.value = "";
    }

    public open() {
        if (this.isOpen) return;
        this.isOpen = true;
        this.reset();
        this.updateComplete.then(() => {
            const dialog = this.shadowRoot?.querySelector("dialog");
            if (dialog && !dialog.open) {
                // dialog.style.display = "block";
                dialog.show();
            }
        });
    }

    public ask(): Promise<boolean> {
        this.open();
        return new Promise((resolve) => {
            this.resolver = (value) => {
                this.isOpen = false;
                resolve(value);
            };
        });
    }

    private submit() {
        const text = this.value.trim();
        if (!text) return;

        this.messages = [...this.messages, { text, type: "outgoing" }];
        this.value = "";

        const normalized = text.toLowerCase();

        if (normalized === "yes" || normalized === "no") {
            this.resolver?.(normalized === "yes");
            this.close();
            return;
        }

        this.messages = [
            ...this.messages,
            {
                text: "type exactly yes or no idiot..",
                type: "incoming",
            },
        ];
    }

    private close() {
        const dialog = this.shadowRoot?.querySelector("dialog");
        if (!dialog || !dialog.open) return;

        dialog.close();
        dialog.removeAttribute("open");
        dialog.style.display = "none";
    }

    override render() {
        return html`
            <dialog>
                <div class="messages">
                    ${this.messages.map(
                        (m) =>
                            html`<div class="bubble ${m.type}">${m.text}</div>`,
                    )}
                </div>
                <div class="hint">
                    Type <strong>yes</strong> or <strong>no</strong> to answer
                </div>

                <div class="input-row">
                    <input
                        .value=${this.value}
                        placeholder="..."
                        autocomplete="off"
                        @input=${(e: Event) =>
                            (this.value = (e.target as HTMLInputElement).value)}
                        @keydown=${(e: KeyboardEvent) =>
                            e.key === "Enter" && this.submit()}
                    />
                </div>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "deform-dialog": DeformDialog;
    }
}
