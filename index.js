// import { MDCChipSet } from "@material/chips";
// const firstButton = document.querySelector(".foo-button");
// mdc.ripple.MDCRipple.attachTo(firstButton);

// const chipset = new MDCChipSet(
// 	document.querySelector(".mdc-evolution-chip-set")
// );
// console.log(chipset);
// import { MDCFormField } from "@material/form-field";
// import { MDCCheckbox } from "@material/checkbox";

// const checkbox = new MDCCheckbox(document.querySelector(".mdc-checkbox"));
// const formField = new MDCFormField(document.querySelector(".mdc-form-field"));
// formField.input = checkbox;
const checkbox = document.querySelector("#checkbox-1");
checkbox.onclick = function () {
  console.log(checkbox.checked);
};
if (checkbox.checked) {
  console.log("Checkbox is checked");
} else {
  console.log("Checkbox is not checked");
}
