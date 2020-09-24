const template = document.querySelector('#formField');

class FormField extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(document.importNode(template.content, true));
    this.$label = this.shadowRoot.querySelector("label");
    this.$input = this.shadowRoot.querySelector("input");
    this.$error = this.shadowRoot.querySelector(".error");
  }

  static get observedAttributes() {
    return ["value", "label", "name", "type", "error-message", "invalid"];
  }

  connectedCallback() {
    if (this.$input.isConnected) {
      this.$input.addEventListener("blur", event => {
        if (!event.target.value && this.hasAttribute("required")) {
          this.invalid = true;
          // this.$error.innerText = "This field is required.";
        } else {
          this.invalid = false;
          this.value = event.target.value;
        }
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.$label.innerText = `${newValue}:`;
        break;
      case "type":
        this.$input.type = newValue;
        break;
      case "name":
        this.$input.name = newValue;
        break;
      case "error-message":
        this.$error.innerText = newValue;
        break;
      case "invalid":
        this._handleInvalidState(newValue);
        break;
      default:
        break;
    }
  }

  get invalid() {
    return this.hasAttribute("invalid");
  }

  set invalid(value) {
    if (!!value) {
      this.setAttribute("invalid", "");
    } else {
      this.removeAttribute("invalid");
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  _handleInvalidState(value) {
    if (value !== null) {
      this.$error.classList.remove("hidden");
      this.$input.classList.add("invalid-field");
    } else {
      this.$error.classList.add("hidden");
      this.$input.classList.remove("invalid-field");
    }
  }
}

window.customElements.define("db-form-field", FormField);

const fields = document.querySelectorAll('db-form-field');
document.querySelector('form').addEventListener('formdata', ({
  formData
}) => {
  for (item in fields) {
    let input = fields[item].$input;
    formData.append(input.name, input.value);
  }
});
