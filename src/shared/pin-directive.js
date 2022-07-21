import { escapeHtmlComment } from "@vue/shared";

function applyStyle(element, binding) {
    Object.keys(binding.value).forEach((position) => {
      element.style[position] = binding.value[position];
    });
    element.style.position = "absolute";
}

// export default {
//   beforeMount(element, binding) {
//     console.log("binding:", binding);
//     console.log("args:", binding.arg, "modifiers:", binding.modifiers);
//     // if (binding.arg !== "position") return;
//     // element.style.position = 'absolute';
//     // element.style.bottom = '5px'
//     // element.style.right = '5px'
//     // Object.keys(binding.modifiers).forEach((position) => {
//     //   element.style[position] = "5px";
//     // });

//     // Object.keys(binding.value).forEach((position) => {
//     //   element.style[position] = binding.value[position];
//     // });
//     // element.style.position = "absolute";
//     applyStyle(element, binding)
//   },

//   updated: (element, binding) => {
//     applyStyle(element, binding)
//   },
// };

export default function (element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
}
