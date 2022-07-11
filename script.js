(function () {
  "use strict";
  var state = document.getElementById("s-state");
  // cause when page loaded completely, this event available -> script ready to process
  document.addEventListener("DOMContentLoaded", function () {
    // form
    document.getElementById("cart-hplus").addEventListener("submit", calTotal);
    var btn = document.getElementById("btn-estimate");
    // disable in normal status
    btn.disabled = true;
    state.addEventListener("change", function () {
      // cause when come back to selected, disabled button
      //   if (state.value === "") {
      //     btn.disabled = true;
      //   } else {
      //     btn.disabled = false;
      //   }
      // condition if
      btn.disabled = (state.value === "");
    });
  });

  function calTotal(event) {
    // disable difualt function
    event.preventDefault();
    var state = document.getElementById('s-state');
    if (state.value === '') {
      alert("please choose your shipping state.");
      state.focus();
    }
    var itemBball = parseInt(document.getElementById("txt-q-bball").value, 10) || 0,
      itemJersey = parseInt(document.getElementById("txt-q-jersey").value, 10) || 0,
      itemPower = parseInt(document.getElementById("txt-q-power").value, 10) || 0,
      shippingState = state.value,
      shippingMethod = document.querySelector('[name=r_method]:checked').value || '';
    // console.log(itemBball, itemJersey, itemPower, shippingState, shippingMethod);
    var totaQTY = itemBball + itemJersey + itemPower,
      shippingCostPer,
      shippingCost,
      taxFactor = 1,
      estimate,
      totalItemPrice = (90 * itemBball) + (25 * itemJersey) + (30 * itemPower);

    if (shippingState === 'CA') {
      taxFactor = 1.075;
    }

    switch (shippingMethod) {
      case 'usps':
        shippingCostPer = 2;
        break;
      case 'ups':
        shippingCostPer = 3;
        break;
      default:
        shippingCostPer = 0;
        break;
    }

    shippingCost = shippingCostPer * totaQTY;
    estimate = '$' + ((totalItemPrice * taxFactor) + shippingCost).toFixed(2);
    document.getElementById('txt-estimate').value = estimate;
    var results = document.getElementById('results');
    results.innerHTML = 'Total items : ' + totaQTY + '<br>' +
                        'Total shipping : $' + shippingCost.toFixed(2) +
                        '<br>' + 'Tax : ' + ((taxFactor - 1) * 100).toFixed(2) + '% (' +
                        shippingState + ')';
  }
})();
