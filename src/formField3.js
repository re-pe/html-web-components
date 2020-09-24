
const fieldsData = {
  name: {
    label: "Įveskite savo vardą: ",
    type: "text",
    required: true,
    error: "Šis laukas būtinas!"
  },
  email: {
    label: "Įveskite savo el.paštą: ",
    type: "email",
    required: true,
    error: "Šis laukas būtinas!"
  },
}

const setAttributes = (el, attrs, text) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  if (typeof text !== "undefined" && text !== null) {
    el.innerText = text;
  }
}

const createField = (id, props) => {
  if (typeof props !== 'object' || props === null) {
    console.log("props are not valid!");
    return;
  }
  const template = document.querySelector('#formField').content.cloneNode(true);
  const label = template.querySelector('label');
  const input = template.querySelector('input');
  const error = template.querySelector('span');
  setAttributes(label, { for: id }, props.label );
  setAttributes(input, { type: props.type, id: id, name: id, required: props.required });
  setAttributes(error, {}, props.error );
  document.querySelector(`#${id}Field`).appendChild(template);
}

for (let key in fieldsData) {
  createField(key, fieldsData[key]);
}
