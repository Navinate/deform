import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../styles/global.css";

@customElement("deform-button")
export class DeformButton extends LitElement {
    @property({ type: String })
    label: string = "Click me";

    static override styles = css`
        button {
            position: relative;
            padding: 0;
            border-radius: 4px;
            transition: box-shadow 200ms;
            background-color: hsl(0deg 0% 0% / 0.1);
            border: none;
            margin: none;
            cursor: pointer;
            user-select: none;
            isolation: isolate;

            /** used to hide text when it flies in */
            overflow: hidden;
        }
        button:hover {
            box-shadow: var(--shadow-short-dreamy-inset);
        }

        @keyframes shake {
            from {
                transform: rotate(10deg);
            }
            to {
                transform: rotate(-10deg);
            }
        }

        svg {
            display: block;
        }

        .button {
            width: fit-content;
            height: 3.5rem;
            background: var(--color-primary);
            color: var(--color-headline);
            padding: 0.2rem 4rem;
            border-radius: 4px;
            border: none;
            position: relative;
            display: grid;
            place-items: center;
            z-index: 2;
            transition: opacity 200ms;
        }

        button:hover .button,
        button:focus-visible .button {
            animation: shake infinite alternate linear 100ms;
        }

        .wrapper {
            transition: transform 200ms;
            transform-origin: 50% 20%;
            position: relative;
            display: block;
            width: fit-content;
            height: fit-content;
        }

        button:hover:not(:active) .wrapper,
        button:focus-visible:not(:active) .wrapper {
            transform: scale(0.5);
        }
        button:active .button {
            transform: scale(1.3);
        }

        /* Optional pseudo-element styling using CSS variables */
        button::before {
            transition:
                transform 200ms,
                opacity 200ms;
            font-size: 3em;
            content: var(--button-label, "Button");
            position: absolute;
            top: 1.5em;
            left: 0;
            right: 0;
            margin-inline: auto;
            z-index: -1;
            opacity: 0;
        }

        button:hover::before,
        button:focus-visible::before {
            opacity: 1;
            transform: translateY(-1.2em);
            z-index: 2;
        }
        button:active::before {
            opacity: 1;
            transform: scale(1.1) translateY(-2.4em);
        }
    `;

    override render() {
        // Set CSS variable dynamically for ::before if you want to use pseudo-element
        this.style.setProperty("--button-label", `"${this.label}"`);
        return html`
            <button>
                <div class="wrapper">
                    <div class="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-command-icon lucide-command"
                        >
                            <path
                                d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                            />
                        </svg>
                    </div>
                </div>
            </button>
        `;
    }
}
