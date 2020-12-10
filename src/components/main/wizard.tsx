import { h } from "@stencil/core";

export function intro(object) {
  const container = object.el.shadowRoot.querySelector(".container");
  const gxgModal = document.createElement("gxg-modal");
  gxgModal.id = "wizardModal";
  gxgModal.padding = "m";
  gxgModal.modalTitle = "Design Tokens Editor";
  let innerHTML =
    "Welcome to the design tokens editor. Here you can create and edit your own css tokens. Would you like to take the wizard? <br>It will only take two minutes!";
  innerHTML +=
    '<br> <gxg-button slot="footer" type="primary-text-only" onClick="wizard.initWizard">Yes, please!</gxg-button> <gxg-spacer-one slot="footer" space="xs"></gxg-spacer-one> <gxg-button slot="footer" type="secondary-text-only">I will figure it out myself</gxg-button>';
  gxgModal.innerHTML = innerHTML;
  container.appendChild(gxgModal);
}

export function initWizard() {
  alert("init wizard");
}
