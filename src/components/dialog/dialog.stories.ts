import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./dialog";

const meta: Meta = {
    component: "deform-dialog",
    title: "Components/DeformDialog",
};

export default meta;

type Story = StoryObj;

export const WithTrigger: Story = {
    render: () => html`
        <button
            @click=${() => {
                const chat = document.getElementById("chat") as any;
                if (!chat) return;

                chat.ask().then((answer: boolean) => {
                    console.log("User answered:", answer);
                });
            }}
            style="margin: 25rem 0rem 0rem 25rem"
        >
            Open Dialog?
        </button>

        <deform-dialog id="chat"></deform-dialog>
    `,
};
