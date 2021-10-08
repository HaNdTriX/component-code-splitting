import faker from "faker";

export default function Red(element) {
  element.style.background = "red";
  element.innerHTML =
    "red (Please note that this components includes a very large lib. This should simulate the impact on the different pages.)";
}
