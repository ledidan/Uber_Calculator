window.onload = () => {
  document.querySelector("#tinhtien").onclick = calculateBill;
  document.querySelector("#inhoadon").onclick = printBill;
  document.querySelector(".close").onclick = closeBtn;
};
// ===========> Setting Up Element First <=============

// ==> Car checking <==
function carCheck() {
  let uberX = document.getElementById("uberX");
  let uberSUV = document.getElementById("uberSUV");
  let uberBlack = document.getElementById("uberBlack");
  if (uberX.checked) {
    return "uberX";
  } else if (uberSUV.checked) {
    return "uberSUV";
  } else if (uberBlack.checked) {
    return "uberBlack";
  }
}
// Estimate Price by Kilometers
const arrUberX = [8000, 12000, 10000];
const arrUberSUV = [9000, 14000, 12000];
const arrUberBlack = [10000, 16000, 14000];

// Estimate Await Price
const waitUberX = 2000;
const waitUberSUV = 3000;
const waitUberBlack = 4000;

// Tinh tien cho

function priceAwait(awaitTime, awaitFee) {
  let startWait = 0;
  if (awaitTime >= 1) {
    startWait = Math.round(awaitTime / 1) * awaitFee;
  }
  return startWait;
}

//  Tinh Tong Bill

function priceBill(distance, awaitTime, awaitFee, arrUber) {
  var awaitBill = priceAwait(awaitTime, awaitFee);
  if (distance <= 1) {
    return arrUber[0] + awaitBill;
  } else if (distance > 1 && distance <= 20) {
    return arrUber[0] + distance * arrUber[1] + awaitBill;
  } else if (distance > 20) {
    return (
      arrUber[0] + 20 * arrUber[1] + (distance - 21) * arrUber[2] + awaitBill
    );
  }
}

// Render priceBill

function totalBillUber() {
  var soKM = document.getElementById("soKM").value;
  var thoiGianCho = document.getElementById("thoiGianCho").value;
  var thisBill = 0;

  soKM = parseFloat(soKM);
  thoiGianCho = parseFloat(thoiGianCho);

  var carPick = carCheck();

  switch (carPick) {
    case "uberX":
      thisBill = priceBill(soKM, thoiGianCho, waitUberX, arrUberX);
      break;
    case "uberSUV":
      thisBill = priceBill(soKM, thoiGianCho, waitUberSUV, arrUberSUV);
      break;
    case "uberBlack":
      thisBill = priceBill(soKM, thoiGianCho, waitUberBlack, arrUberBlack);
      break;
    default:
      alert("Vui long chon loai xe muon di chuyen");
  }
  return thisBill;
}

// Calculate Result

function calculateBill() {
  var errorKM = document.getElementById("soKM").value;
  var errorTime = document.getElementById("thoiGianCho").value;

  if (
    errorKM.match(/^[0-9.,\b]+$/) == null ||
    errorTime.match(/^[0-9.,\b]+$/) == null
  ) {
    alert("Vui long nhap dung so KM va thoi gian cho");
  }
  var totalBill = totalBillUber();
  totalBill = totalBill.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.querySelector("#xuatTien").innerHTML = totalBill;
}

// Render Popup

function renderRowKmDetail(carType, arrayKm, arrUber, tblBody) {
  for (var i = 0; i < arrayKm.length; i++) {
    var trKmDetail = document.createElement("tr");

    tdCarType = document.createElement("td");
    tdTraveled = document.createElement("td");
    tdPrice = document.createElement("td");
    tdBill = document.createElement("td");

    tdCarType.innerHTML = carType;
    tdTraveled.innerHTML = arrayKm[i] + " km";
    tdPrice.innerHTML = arrUber[i];
    tdBill.innerHTML = arrUber[i] * arrayKm[i];

    trKmDetail.appendChild(tdCarType);
    trKmDetail.appendChild(tdTraveled);
    trKmDetail.appendChild(tdPrice);
    trKmDetail.appendChild(tdBill);

    tblBody.appendChild(trKmDetail);
  }
}

function renderRowWaitDetail(awaitTime, awaitFee, tblBody) {
  var awaitPrice = priceAwait(awaitTime, awaitFee);
  var trWaitTime = document.createElement("tr");

  var tdMinTitle = document.createElement("td");
  var tdMin = document.createElement("td");
  var tdWaitFee = document.createElement("td");
  var tdBill = document.createElement("td");

  tdMinTitle.innerHTML = " Thời gian chờ ";
  tdMin.innerHTML = awaitTime + " phút";
  tdWaitFee.innerHTML = awaitFee;
  tdBill.innerHTML = awaitPrice;

  trWaitTime.appendChild(tdMinTitle);
  trWaitTime.appendChild(tdMin);
  trWaitTime.appendChild(tdPrice);
  trWaitTime.appendChild(tdBill);

  tblBody.appendChild(trWaitTime);
}

function renderRowTotal(total, tblBody) {
  var trTotal = document.createElement("tr");
  trTotal.className = "alert alert-success";

  var tdTotalTitle = document.createElement("td");
  tdTotalTitle.setAttribute("colspan", 3);
  var tdTotal = document.createElement("td");

  tdTotalTitle.innerHTML = " Tổng thanh toán: ";
  tdTotal.innerHTML = total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  trTotal.appendChild(tdTotalTitle);
  trTotal.appendChild(tdTotal);

  tblBody.appendChild(trTotal);
}

function receiptPrint(
  carType,
  distance,
  awaitTime,
  awaitFee,
  arrUber,
  totalBill
) {
  var tblBody = document.getElementById("tblBody");
  tblBody.innerHTML = "";

  if (distance <= 1) {
    renderRowKmDetail(carType, [1], arrUber, tblBody);
  } else if (distance > 1 && distance <= 20) {
    renderRowKmDetail(carType, [1, distance - 1], arrUber, tblBody);
  } else if (distance > 20) {
    renderRowKmDetail(carType, [1, 19, distance - 20], arrUber, tblBody);
  }

  if (awaitTime >= 2) {
    renderRowWaitDetail(awaitTime, awaitFee, tblBody);
  }
  renderRowTotal(totalBill, tblBody);
}

function printBill() {
  // Update Price
  var totalBill = totalBillUber();
  totalBill = totalBill.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  document.querySelector("#xuatTien").innerHTML = totalBill;
  // Check Error
  var errorKM = document.getElementById("soKM").value;
  var errorTime = document.getElementById("thoiGianCho").value;
  if (
    errorKM.match(/^[0-9.,\b]+$/) == null ||
    errorTime.match(/^[0-9.,\b]+$/) == null
  ) {
    alert("Vui long nhap dung so KM va thoi gian cho");
    $(".modal").removeClass("toggled");
  }

  // Open Popup
  $(".modal").toggleClass("toggled");
  $("#overlay").toggleClass("showOverLay");

  //  End Popup

  var result = getData();
  var totalBill = totalBillUber();
  var carPick = carCheck();

  switch (carPick) {
    case "uberX":
      receiptPrint(
        carPick,
        result[0],
        result[1],
        waitUberX,
        arrUberX,
        totalBill
      );
      break;
    case "uberSUV":
      receiptPrint(
        carPick,
        result[0],
        result[1],
        waitUberSUV,
        arrUberSUV,
        totalBill
      );
      break;
    case "uberBlack":
      receiptPrint(
        carPick,
        result[0],
        result[1],
        waitUberBlack,
        arrUberBlack,
        totalBill
      );
      break;
    default:
      alert("Vui long chon loai xe muon di chuyen");
  }
}

function getData() {
  var result = [];
  var soKM = document.getElementById("soKM").value;
  soKM = parseFloat(soKM);
  result.push(soKM);
  var awaitTime = document.getElementById("thoiGianCho").value;
  awaitTime = parseFloat(awaitTime);
  result.push(awaitTime);
  return result;
}

function closeBtn() {
  $("#overlay").removeClass("showOverLay");
  $(".modal").removeClass("toggled");
}
